// Applies db/schema.sql to the database in DATABASE_URL.
// Usage: node --env-file=.env scripts/db-migrate.mjs
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
	console.error("DATABASE_URL is not set");
	process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

for (const statement of schema
	.replace(/--.*$/gm, "")
	.split(";")
	.map((s) => s.trim())
	.filter(Boolean)) {
	await sql.query(statement);
}

console.log("Schema applied.");
