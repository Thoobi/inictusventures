import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: "About DAM",
	description: "About DAM — the Dance, Art and Music ecosystem by Inistic Ventures.",
	path: "/dam/about",
	// Placeholder page — keep it out of search results until it has real content.
	noIndex: true,
});

export default function Page() {
  return <div>This is the about page for D-A-M</div>;
}
