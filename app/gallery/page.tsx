import Image from "next/image";
import { apiClient } from "@/apiclient";
import { GALLERY_ENDPOINT } from "@/constant";
import { TextArmorizer, UrlGuardian } from "@/security/guards";

interface GalleryImage {
  id: string;
  title?: string;
  url: string;
  alt?: string;
}

interface ApiResponse {
  items?: Array<{
    fieldData?: {
      "gallery-images"?: GalleryImage[];
    };
  }>;
}

const textProtector = new TextArmorizer();
const linkChecker = new UrlGuardian();

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await apiClient.get<ApiResponse>(GALLERY_ENDPOINT);

    const collectedImages: GalleryImage[] = [];

    const itemsList = response?.items || [];

    itemsList.forEach((item) => {
      const galleryData = item?.fieldData?.["gallery-images"];
      
      if (Array.isArray(galleryData)) {
        const verifiedImages = galleryData.filter((img) => 
          img?.url && linkChecker.inspectImageLink(img.url)
        );
        collectedImages.push(...verifiedImages);
      }
    });

    return collectedImages;
  } catch (error) {
    console.error("Failed to load gallery");
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
                    alt={textProtector.fortify(image.alt || image.title) || "Gallery Image"}
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
