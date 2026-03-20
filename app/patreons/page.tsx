import { apiClient } from "@/apiclient";
import { PATREON_COLLECTION_ID, BASE_URL } from "@/constant";
import PatreonsGrid, {
  type PatreonCardData,
} from "@/components/patreons/patreonsGrid";

export const revalidate = 60; // Revalidate every 20 minutes to ensure we have up-to-date patreon information without excessive API calls

interface PatreonImageField {
  url?: string;
  fileId?: string;
  alt?: string;
}

interface PatreonItem {
  id: string;
  fieldData?: {
    name?: string;
    about?: string;
    slug?: string;
    email?: string;
    phone?: string;
    "e-mail"?: string;
    "phone-number"?: string;
    "patreon-image"?: PatreonImageField | PatreonImageField[];
    [key: string]: unknown;
  };
}

interface PatreonResponse {
  items?: PatreonItem[];
  data?: PatreonItem[];
}

function getStringField(
  fieldData: PatreonItem["fieldData"],
  keys: string[],
): string | undefined {
  if (!fieldData) {
    return undefined;
  }

  for (const key of keys) {
    const value = fieldData[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

async function fetchPatreons(): Promise<PatreonCardData[]> {
  try {
    if (!PATREON_COLLECTION_ID) {
      console.warn("PATREON_COLLECTION_ID is not set");
      return [];
    }

    if (!BASE_URL) {
      console.warn("BASE_URL is not set");
      return [];
    }

    const endpoint = `/collections/${PATREON_COLLECTION_ID}/items`;
    const response = await apiClient.get<PatreonResponse | PatreonItem[]>(
      endpoint,
    );

    const allPatreons: PatreonCardData[] = [];

    const itemsArray = Array.isArray(response)
      ? response
      : response?.items || response?.data || [];

    if (Array.isArray(itemsArray)) {
      itemsArray.forEach((item) => {
        if (!item.fieldData) {
          return;
        }

        const imageField = item.fieldData["patreon-image"];
        const image = Array.isArray(imageField) ? imageField[0] : imageField;

        if (!image?.url || !image?.fileId) {
          return;
        }

        allPatreons.push({
          name: item.fieldData.name || "",
          about: item.fieldData.about || "",
          slug: item.fieldData.slug || item.id,
          email: getStringField(item.fieldData, ["patreon-mail", "e-mail"]),
          phone: getStringField(item.fieldData, [
            "patreon-phone",
            "phone-number",
          ]),
          patreonImage: {
            url: image.url,
            fileId: image.fileId,
            alt: image.alt,
          },
        });
      });
    }

    return allPatreons;
  } catch (error) {
    console.error("Error fetching patreons:", error);
    return [];
  }
}

export default async function Patreons() {
  const patreons = await fetchPatreons();
  return (
    <section className="flex flex-col py-40 max-md:py-30 max-md:px-5 bg-[#fbfbfb]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Patreons
          </h1>
          <p className="text-base max-md:text-sm text-black font-mono max-w-2xl">
            We are grateful for the support of our patreons who make our work
            possible. Their contributions help us continue to create and
            innovate.
          </p>
        </div>
        <PatreonsGrid patreons={patreons} />
      </div>
    </section>
  );
}
