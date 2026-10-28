import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
  projectId: projectId || "missing-project-id",
  dataset,
  apiVersion: "2026-10-01",
  useCdn: true,
  perspective: "published",
});

export async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!projectId) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
    return null;
  }

  try {
    return await client.fetch<T>(query);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
