// Checks the Sanity dataset against the Webflow snapshot after an import:
// document counts, missing image assets, and leftover Webflow CDN URLs.
//
//   pnpm migrate:validate
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const ROOT = path.resolve(import.meta.dirname, "..");
const client = getCliClient({ apiVersion: "2026-10-01" });

async function itemCount(key: string, field?: string) {
  const { items } = JSON.parse(await readFile(path.join(ROOT, "extracted", `${key}.json`), "utf8"));
  return field
    ? items.reduce((sum: number, item: any) => sum + (item.fieldData[field]?.length ?? 0), 0)
    : items.length;
}

const expected: Record<string, number> = {
  galleryAlbum: await itemCount("gallery"),
  damEdition: await itemCount("damGallery"),
  judge: await itemCount("judges"),
  teamMember: await itemCount("teams"),
  sponsor: await itemCount("sponsors", "logo-2"),
  patron: await itemCount("patrons"),
};

const actual = await client.fetch<Record<string, number>>(`{
  "galleryAlbum": count(*[_type == "galleryAlbum" && defined(webflowId)]),
  "damEdition": count(*[_type == "damEdition" && defined(webflowId)]),
  "judge": count(*[_type == "judge" && defined(webflowId)]),
  "teamMember": count(*[_type == "teamMember" && defined(webflowId)]),
  "sponsor": count(*[_type == "sponsor" && defined(webflowId)]),
  "patron": count(*[_type == "patron" && defined(webflowId)])
}`);

let failed = false;
const rows = Object.keys(expected).map((type) => {
  const ok = expected[type] === actual[type];
  failed ||= !ok;
  return { type, webflow: expected[type], sanity: actual[type], ok };
});
console.table(rows);

const missingImages = await client.fetch<{ _id: string; _type: string }[]>(`*[
  (_type in ["judge", "teamMember", "patron"] && !defined(photo.asset._ref)) ||
  (_type == "sponsor" && !defined(logo.asset._ref)) ||
  (_type == "galleryAlbum" && count(images[!defined(asset._ref)]) > 0) ||
  (_type == "damEdition" && count(winnerPhotos[!defined(asset._ref)]) > 0)
]{_id, _type}`);
if (missingImages.length) {
  failed = true;
  console.error("Documents with missing image assets:", missingImages);
}

const webflowUrls = await client.fetch<string[]>(
  `*[_type in ["galleryAlbum", "damEdition", "judge", "teamMember", "sponsor", "patron"]
    && pt::text(about) match "website-files.com"]._id`,
);
if (webflowUrls.length) {
  failed = true;
  console.error("Rich text still linking to Webflow CDN:", webflowUrls);
}

console.log(failed ? "Validation FAILED" : "Validation passed");
process.exitCode = failed ? 1 : 0;
