// Snapshots every Webflow CMS collection the site uses to migration/extracted/.
// Reads the Webflow credentials from the Next.js app's .env (see package.json).
// Uses the staged /items endpoint, so Webflow drafts are included — that's
// what the live site renders today.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.NEXT_PUBLIC_WEBFLOW_URL;
const TOKEN = process.env.NEXT_PUBLIC_WEBFLOW_WORKSPACE_TOKEN;

const COLLECTIONS = {
  gallery: process.env.NEXT_PUBLIC_WEBFLOW_COLLECTION_ID,
  damGallery: process.env.NEXT_PUBLIC_DAM_COLLECTION_ID,
  judges: process.env.NEXT_PUBLIC_JUDGES_COLLECTION_ID,
  teams: process.env.NEXT_PUBLIC_TEAMS_COLLECTION_ID,
  sponsors: process.env.NEXT_PUBLIC_SPONSOR_LOGO_COLLECTION_ID,
  patrons: process.env.NEXT_PUBLIC_PATREON_COLLECTION_ID,
};

const OUT_DIR = path.resolve(import.meta.dirname, "../extracted");

if (!BASE_URL || !TOKEN) {
  throw new Error("Webflow URL or token missing from ../.env");
}

async function get(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${endpoint} -> ${response.status} ${await response.text()}`);
  }
  return response.json();
}

async function getAllItems(collectionId) {
  const items = [];
  for (let offset = 0; ; offset += 100) {
    const page = await get(`/collections/${collectionId}/items?limit=100&offset=${offset}`);
    items.push(...(page.items ?? []));
    if (items.length >= (page.pagination?.total ?? 0)) return items;
  }
}

await mkdir(OUT_DIR, { recursive: true });

for (const [key, collectionId] of Object.entries(COLLECTIONS)) {
  if (!collectionId) throw new Error(`Collection ID for "${key}" is not set`);

  const collection = await get(`/collections/${collectionId}`);
  const items = await getAllItems(collectionId);

  await writeFile(
    path.join(OUT_DIR, `${key}.json`),
    JSON.stringify({ extractedAt: new Date().toISOString(), collection, items }, null, 2),
  );
  console.log(`${key}: ${items.length} items`);
}
