import { neon } from "@neondatabase/serverless";

/**
 * Neon SQL client. Server-only: DATABASE_URL has no NEXT_PUBLIC_ prefix,
 * so it is never shipped to the browser.
 */
export function getSql() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error("DATABASE_URL is not set");
	}
	return neon(url);
}
