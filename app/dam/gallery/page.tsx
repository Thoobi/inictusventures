/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { apiClient } from "@/apiclient";
import { DAM_COLLECTION_ID, BASE_URL } from "@/constant";

interface GalleryImage {
  id: string;
  url: string;
  fileId?: string;
  alt?: string | null;
  title?: string;
  [key: string]: any;
}

interface DamImage {
  fileId?: string;
  url?: string;
  alt?: string | null;
}

interface DamItem {
  id: string;
  fieldData?: {
    name?: string;
    slug?: string;
    year?: DamImage[];
    [key: string]: any;
  };
}

interface DamResponse {
  items?: DamItem[];
  data?: DamItem[];
}

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    if (!DAM_COLLECTION_ID) {
      console.warn("DAM_COLLECTION_ID is not set");
      return [];
    }

    if (!BASE_URL) {
      console.warn("BASE_URL is not set");
      return [];
    }

    const endpoint = `/collections/${DAM_COLLECTION_ID}/items`;
    const response = await apiClient.get<DamResponse | DamItem[]>(endpoint);

    const itemsArray = Array.isArray(response)
      ? response
      : response?.items || response?.data || [];

    if (!Array.isArray(itemsArray)) {
      return [];
    }

    // Flatten `fieldData.year` image arrays from each item into one gallery list.
    return itemsArray.flatMap((item) => {
      const yearImages = item.fieldData?.year;

      if (!Array.isArray(yearImages)) {
        return [];
      }

      return yearImages
        .filter((img): img is DamImage => Boolean(img?.url))
        .map((img, index) => ({
          id: `${item.id}-${img.fileId || index}`,
          fileId: img.fileId,
          url: img.url as string,
          alt: img.alt,
          title: item.fieldData?.name || item.fieldData?.slug,
        }));
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
}

export default async function Gallery() {
  const images = await fetchGalleryImages();

  return (
    <section className="min-h-screen bg-white py-40  px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl font-bold font-mono">Gallery</h1>
          <p className="text-base text-gray-700 font-mono">
            This is the curation of DAM winners
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
                        ? "col-span-1 row-span-3"
                        : index % 3 === 0
                          ? "col-span-1 row-span-2"
                          : "col-span-1 row-span-2"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || image.title || "DAM Gallery Image"}
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
