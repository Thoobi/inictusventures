import DamGallerySlider, {
  type DamGalleryImage,
  type DamGalleryYearGroup,
} from "../../../components/dam/gallerySlider";
import { apiClient } from "@/apiclient";
import { DAM_COLLECTION_ID, BASE_URL } from "@/constant";

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
    [key: string]: unknown;
  };
}

interface DamResponse {
  items?: DamItem[];
  data?: DamItem[];
}

interface DamGalleryResponse {
  groups: DamGalleryYearGroup[];
}

async function fetchGalleryImages(): Promise<DamGalleryResponse> {
  try {
    if (!DAM_COLLECTION_ID) {
      console.warn("DAM_COLLECTION_ID is not set");
      return { groups: [] };
    }

    if (!BASE_URL) {
      console.warn("BASE_URL is not set");
      return { groups: [] };
    }

    const endpoint = `/collections/${DAM_COLLECTION_ID}/items`;
    const response = await apiClient.get<DamResponse | DamItem[]>(endpoint);
    console.log("DAM API response:", response);

    const itemsArray = Array.isArray(response)
      ? response
      : response?.items || response?.data || [];

    if (!Array.isArray(itemsArray)) {
      return { groups: [] };
    }

    const groups = itemsArray
      .map((item): DamGalleryYearGroup | null => {
        const yearImages = item.fieldData?.year;
        const yearLabel =
          item.fieldData?.name || item.fieldData?.slug || "Unknown Year";

        if (!Array.isArray(yearImages) || yearImages.length === 0) {
          return null;
        }

        const images: DamGalleryImage[] = yearImages
          .filter((img): img is DamImage => Boolean(img?.url))
          .map((img, index) => ({
            id: `${item.id}-${img.fileId || index}`,
            fileId: img.fileId,
            url: img.url as string,
            alt: img.alt,
            title: yearLabel,
            year: yearLabel,
          }));

        if (images.length === 0) {
          return null;
        }

        return {
          year: yearLabel,
          slug: item.fieldData?.slug,
          images,
        };
      })
      .filter((group): group is DamGalleryYearGroup => Boolean(group));

    return { groups };
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return { groups: [] };
  }
}

export default async function Gallery() {
  const { groups } = await fetchGalleryImages();

  return (
    <section className="min-h-screen bg-white py-40  px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Gallery
          </h1>
          <p className="text-base max-md:text-sm text-gray-700 font-mono">
            This is the curation of DAM winners
          </p>
        </div>
        <DamGallerySlider groups={groups} />
      </div>
    </section>
  );
}
