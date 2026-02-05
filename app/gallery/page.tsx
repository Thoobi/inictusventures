/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { apiClient } from "@/apiclient";
import { COLLECTION_ID, BASE_URL } from "@/constant";

interface GalleryImage {
  id: string;
  title?: string;
  image?: {
    url: string;
    fileId: string;
    alt?: string;
  }[];
  [key: string]: any;
}

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    if (!COLLECTION_ID) {
      console.warn("COLLECTION_ID is not set");
      return [];
    }

    if (!BASE_URL) {
      console.warn("BASE_URL is not set");
      return [];
    }

    const endpoint = `/collections/${COLLECTION_ID}/items`;
    const response = await apiClient.get<any>(endpoint);

    // Extract fieldData from each item and get gallery-images array
    const allGalleryImages: GalleryImage[] = [];

    // Handle if response is an object with an items/data property
    const itemsArray = Array.isArray(response)
      ? response
      : response?.items || response?.data || [];

    if (Array.isArray(itemsArray)) {
      itemsArray.forEach((item) => {
        if (item.fieldData && Array.isArray(item.fieldData["gallery-images"])) {
          allGalleryImages.push(...item.fieldData["gallery-images"]);
        }
      });
    }

    return allGalleryImages;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

export default async function Gallery() {
  const images = await fetchGalleryImages();

  return (
    <section className="min-h-screen bg-white pt-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl font-bold font-mono">Gallery</h1>
          <p className="text-base text-gray-700 font-mono">
            Explore the collection of artworks and creations from our talented
            artists.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4 mb-16">
          {images &&
            images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className={`relative overflow-hidden bg-gray-200 ${
                    index % 7 === 0
                      ? "col-span-1 row-span-2"
                      : index % 5 === 0
                        ? "col-span-1 row-span-2"
                        : index % 3 === 0
                          ? "col-span-1 row-span-2"
                          : "col-span-1 row-span-2"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || image.title || "Gallery Image"}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
