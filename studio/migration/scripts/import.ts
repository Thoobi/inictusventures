// Imports the Webflow snapshot in migration/extracted/ into Sanity.
//
//   pnpm migrate:import             # dry run: transforms and reports, writes nothing
//   pnpm migrate:import:write       # uploads images and upserts documents
//
// Safe to re-run: documents are matched on `webflowId` and replaced in place,
// and uploaded images are cached by Webflow fileId (Sanity also dedupes by hash).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { setDefaultResultOrder } from "node:dns";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { Schema } from "@sanity/schema";
import { htmlToBlocks } from "@portabletext/block-tools";
import { JSDOM } from "jsdom";
import { patron as patronType } from "../../schemaTypes/documents/patron";

type WebflowImage = { fileId: string; url: string; alt?: string | null };
type WebflowItem = { id: string; isDraft?: boolean; fieldData: Record<string, any> };
type Snapshot = { collection: { fields: any[] }; items: WebflowItem[] };

const WRITE = process.argv.includes("--write");
const ROOT = path.resolve(import.meta.dirname, "..");
const REPORT_DIR = path.join(ROOT, "reports");
const ASSET_MAP_PATH = path.join(REPORT_DIR, "asset-map.json");

// The Webflow CDN is unreachable over IPv6 on some networks, which surfaces as connect timeouts.
setDefaultResultOrder("ipv4first");

const client = getCliClient({ apiVersion: "2026-10-01" });
const issues: { type: string; webflowId: string; message: string }[] = [];

async function loadSnapshot(key: string): Promise<Snapshot> {
  return JSON.parse(await readFile(path.join(ROOT, "extracted", `${key}.json`), "utf8"));
}

// --- Assets ---------------------------------------------------------------

let assetMap: Record<string, string> = {};

async function fetchWithRetry(url: string, attempts = 4): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    let response: Response | undefined;
    try {
      response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
    } catch (error) {
      if (attempt === attempts) throw error;
    }
    if (response?.ok) return response;
    // 4xx won't fix itself on retry; network errors and 5xx might.
    if (response && (response.status < 500 || attempt === attempts)) {
      throw new Error(`Download failed (${response.status}): ${url}`);
    }
    console.warn(`\nRetrying ${url} (attempt ${attempt + 1}/${attempts})`);
    await new Promise((resolve) => setTimeout(resolve, 2_000 * attempt));
  }
}

async function uploadImage(image: WebflowImage): Promise<string> {
  if (assetMap[image.fileId]) return assetMap[image.fileId];
  if (!WRITE) return `dry-run-${image.fileId}`;

  const response = await fetchWithRetry(image.url);
  const filename = decodeURIComponent(new URL(image.url).pathname.split("/").pop() ?? image.fileId);

  const asset = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {
    filename,
    source: { name: "webflow", id: image.fileId, url: image.url },
  });
  assetMap[image.fileId] = asset._id;
  return asset._id;
}

async function toAltImage(image: WebflowImage, fallbackAlt?: string, withKey = false) {
  const alt = image.alt?.trim() || fallbackAlt;
  return {
    _type: "altImage",
    ...(withKey && { _key: image.fileId }),
    asset: { _type: "reference", _ref: await uploadImage(image) },
    ...(alt && { alt }),
  };
}

async function toAltImages(images: WebflowImage[] | undefined, fallbackAlt?: string) {
  return Promise.all((images ?? []).filter((img) => img?.url).map((img) => toAltImage(img, fallbackAlt, true)));
}

// --- Rich text ------------------------------------------------------------

const aboutBlockType = Schema.compile({ name: "default", types: [patronType] })
  .get("patron")
  .fields.find((field: { name: string }) => field.name === "about").type;

function htmlToPortableText(html: string | undefined) {
  if (!html?.trim()) return undefined;
  const blocks = htmlToBlocks(html, aboutBlockType, {
    parseHtml: (value) => new JSDOM(value).window.document,
  });
  // Webflow pads rich text with empty paragraphs and zero-width joiners.
  return blocks.filter(
    (block: any) =>
      block._type !== "block" ||
      block.children?.some((child: any) => child.text?.replace(/[\s‍]/g, "")),
  );
}

// --- Documents ------------------------------------------------------------

type SanityDoc = { _type: string; webflowId: string; [key: string]: unknown };

const slug = (current: string | undefined) => (current ? { _type: "slug", current } : undefined);

async function buildDocuments(): Promise<SanityDoc[]> {
  const docs: SanityDoc[] = [];

  for (const item of (await loadSnapshot("gallery")).items) {
    docs.push({
      _type: "galleryAlbum",
      webflowId: item.id,
      title: item.fieldData.name,
      slug: slug(item.fieldData.slug),
      images: await toAltImages(item.fieldData["gallery-images"], "Inistic Ventures gallery photo"),
    });
  }

  for (const item of (await loadSnapshot("damGallery")).items) {
    docs.push({
      _type: "damEdition",
      webflowId: item.id,
      year: item.fieldData.name,
      slug: slug(item.fieldData.slug),
      winnerPhotos: await toAltImages(item.fieldData.year, `DAM ${item.fieldData.name} winner`),
    });
  }

  const judges = await loadSnapshot("judges");
  const categoryOptions: { id: string; name: string }[] =
    judges.collection.fields.find((field) => field.slug === "category")?.validations?.options ?? [];
  for (const item of judges.items) {
    const category = categoryOptions.find((option) => option.id === item.fieldData.category)?.name;
    if (!category) issues.push({ type: "judge", webflowId: item.id, message: "Unknown category" });
    const name = item.fieldData["judge-name"];
    docs.push({
      _type: "judge",
      webflowId: item.id,
      name,
      year: item.fieldData.name,
      category: category?.toLowerCase(),
      photo: item.fieldData["judge-image"] && (await toAltImage(item.fieldData["judge-image"], name)),
    });
  }

  const teams = await loadSnapshot("teams");
  for (const [index, item] of teams.items.entries()) {
    const fullName = item.fieldData.fullname || item.fieldData.name;
    if (!item.fieldData.img) issues.push({ type: "teamMember", webflowId: item.id, message: "No photo" });
    docs.push({
      _type: "teamMember",
      webflowId: item.id,
      fullName,
      orderRank: index + 1,
      photo: item.fieldData.img && (await toAltImage(item.fieldData.img, fullName)),
    });
  }

  // One Webflow item holds every logo; split into one sponsor per logo.
  let sponsorRank = 0;
  for (const item of (await loadSnapshot("sponsors")).items) {
    for (const logo of item.fieldData["logo-2"] ?? []) {
      sponsorRank += 1;
      const webflowId = `${item.id}:${logo.fileId}`;
      const name = logo.alt?.trim() || `Sponsor ${sponsorRank}`;
      if (!logo.alt?.trim()) {
        issues.push({ type: "sponsor", webflowId, message: `No alt text; named "${name}" — rename in Studio` });
      }
      docs.push({
        _type: "sponsor",
        webflowId,
        name,
        orderRank: sponsorRank,
        logo: await toAltImage(logo, `${name} logo`),
      });
    }
  }

  for (const item of (await loadSnapshot("patrons")).items) {
    const image = Array.isArray(item.fieldData["patreon-image"])
      ? item.fieldData["patreon-image"][0]
      : item.fieldData["patreon-image"];
    if (!image) issues.push({ type: "patron", webflowId: item.id, message: "No photo" });
    docs.push({
      _type: "patron",
      webflowId: item.id,
      name: item.fieldData.name,
      slug: slug(item.fieldData.slug),
      photo: image && (await toAltImage(image, item.fieldData.name)),
      about: htmlToPortableText(item.fieldData.about),
      email: item.fieldData["patreon-mail"],
      phone: item.fieldData["patreon-phone"],
    });
  }

  // Leave empty fields unset rather than storing null/undefined.
  return docs.map(
    (doc) => Object.fromEntries(Object.entries(doc).filter(([, value]) => value !== undefined)) as SanityDoc,
  );
}

async function upsert(doc: SanityDoc) {
  const existingId = await client.fetch<string | null>(
    `*[_type == $type && webflowId == $webflowId][0]._id`,
    { type: doc._type, webflowId: doc.webflowId },
  );
  return existingId ? client.createOrReplace({ ...doc, _id: existingId }) : client.create(doc);
}

// --- Run ------------------------------------------------------------------

await mkdir(REPORT_DIR, { recursive: true });
try {
  assetMap = JSON.parse(await readFile(ASSET_MAP_PATH, "utf8"));
} catch {
  assetMap = {};
}

try {
  const docs = await buildDocuments();

  const counts: Record<string, number> = {};
  for (const doc of docs) counts[doc._type] = (counts[doc._type] ?? 0) + 1;
  console.table(counts);

  if (WRITE) {
    for (const doc of docs) {
      await upsert(doc);
      process.stdout.write(".");
    }
    console.log(`\nUpserted ${docs.length} documents.`);
  } else {
    await writeFile(path.join(REPORT_DIR, "dry-run.json"), JSON.stringify(docs, null, 2));
    console.log("Dry run only. Review migration/reports/dry-run.json, then re-run with --write.");
  }
} finally {
  if (WRITE) await writeFile(ASSET_MAP_PATH, JSON.stringify(assetMap, null, 2));
  await writeFile(path.join(REPORT_DIR, "issues.json"), JSON.stringify(issues, null, 2));
  if (issues.length) console.warn(`${issues.length} issue(s) logged to migration/reports/issues.json`);
}
