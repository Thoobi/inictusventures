import Image from "next/image";
import { sanityFetch } from "@/lib/sanity/client";
import { GALLERY_IMAGES_QUERY } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60; // Fallback; the Sanity webhook revalidates on publish

interface GalleryImage {
  id: string;
  url: string;
  fileId: string;
  alt?: string;
  title?: string;
}

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  return (await sanityFetch<GalleryImage[]>(GALLERY_IMAGES_QUERY)) ?? [];
}

export const metadata: Metadata = pageMetadata({
	title: "Gallery",
	description: "Explore the Inistic Ventures gallery — photography and artwork from our productions, events and talented artists.",
	path: "/gallery",
});

export default async function Gallery() {
  const images = await fetchGalleryImages();

  return (
    <section className="min-h-screen bg-white py-40 max-md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Gallery
          </h1>
          <p className="text-base max-md:text-sm text-gray-700 font-mono">
            Explore the collection of artworks and creations from our talented
            artists.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {images &&
            images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className="group relative h-100 overflow-hidden bg-gray-200 rounded-lg"
                >
                  <Image
                    src={image.url}
                    alt={
                      image.alt ||
                      image.title ||
                      `Inistic Ventures gallery photo ${index + 1}`
                    }
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
