import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: "About Us",
	description: "Learn about Inistic Ventures, the multimedia company behind DAM and a new generation of creative talent.",
	path: "/about",
	// Placeholder page — keep it out of search results until it has real content.
	noIndex: true,
});

export default function About() {
  return (
    <section className="flex flex-col pt-10">
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-mono">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore the collection of artworks and creations from our talented
          artists.
        </p>
      </div>
    </section>
  );
}
