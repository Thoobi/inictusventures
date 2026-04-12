import Image from "next/image";
import { apiClient } from "@/apiclient";
import { BASE_URL, TEAMS_COLLECTION_ID } from "@/constant";

export const revalidate = 60;

interface TeamImage {
  fileId?: string;
  url?: string;
  alt?: string | null;
}

interface Team {
  id: string;
  fieldData?: Record<string, unknown>;
}

interface TeamsResponse {
  items?: Team[];
  data?: Team[];
  pagination?: {
    limit: number;
    offset: number;
    total: number;
  };
}

function extractImage(fieldData?: Record<string, unknown>): TeamImage | null {
  if (!fieldData) {
    return null;
  }

  for (const value of Object.values(fieldData)) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      continue;
    }

    const maybeImage = value as TeamImage;
    if (typeof maybeImage.url === "string" && maybeImage.url.length > 0) {
      return maybeImage;
    }
  }

  return null;
}

async function fetchTeams(): Promise<TeamImage[]> {
  try {
    if (!TEAMS_COLLECTION_ID) {
      console.warn("TEAMS_COLLECTION_ID is not set");
      return [];
    }

    if (!BASE_URL) {
      console.warn("BASE_URL is not set");
      return [];
    }

    const endpoint = `/collections/${TEAMS_COLLECTION_ID}/items`;
    const response = await apiClient.get<TeamsResponse>(endpoint);

    const itemsArray = Array.isArray(response)
      ? response
      : response?.items || response?.data || [];

    if (!Array.isArray(itemsArray)) {
      return [];
    }

    return itemsArray
      .map((team) => extractImage(team.fieldData))
      .filter((image): image is TeamImage => Boolean(image?.url));
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

export default async function Teams() {
  const images = await fetchTeams();

  return (
    <section className="min-h-screen bg-white py-40 max-md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Teams
          </h1>
          <p className="text-base max-md:text-sm text-gray-700 font-mono">
            Meet the talented teams that made DAM possible
          </p>
        </div>

        {images.length === 0 ? (
          <p className="text-gray-500">No team images found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={`${image.fileId || image.url}-${index}`}
                className="w-full h-120 max-md:h-80 rounded-lg overflow-hidden"
              >
                <Image
                  src={image.url as string}
                  alt={image.alt || "Team image"}
                  width={600}
                  height={800}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
