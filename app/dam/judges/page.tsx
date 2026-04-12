import { apiClient } from "@/apiclient";
import { JUDGES_COLLECTION_ID, BASE_URL } from "@/constant";
import JudgesByYearGrid from "@/components/dam/judgesByYearGrid";

export const revalidate = 60;

interface JudgeImage {
  fileId?: string;
  url?: string;
  alt?: string | null;
}

interface Judge {
  id: string;
  fieldData?: {
    name?: string;
    slug?: string;
    "judge-name"?: string;
    "judge-image"?: JudgeImage;
    category?: string;
    [key: string]: unknown;
  };
}

interface JudgesResponse {
  items?: Judge[];
  data?: Judge[];
  pagination?: {
    limit: number;
    offset: number;
    total: number;
  };
}

interface CollectionOption {
  id: string;
  name: string;
}

interface CollectionField {
  type?: string;
  slug?: string;
  validations?: {
    options?: CollectionOption[];
  };
}

interface JudgesCollectionResponse {
  fields?: CollectionField[];
}

interface JudgeWithCategoryName extends Judge {
  categoryName?: string;
}

interface JudgesByYear {
  [year: string]: JudgeWithCategoryName[];
}

async function fetchJudges(): Promise<JudgesByYear> {
  try {
    if (!JUDGES_COLLECTION_ID) {
      console.warn("JUDGES_COLLECTION_ID is not set");
      return {};
    }

    if (!BASE_URL) {
      console.warn("BASE_URL is not set");
      return {};
    }

    const collectionEndpoint = `/collections/${JUDGES_COLLECTION_ID}`;
    const collectionResponse =
      await apiClient.get<JudgesCollectionResponse>(collectionEndpoint);
    const categoryOptions =
      collectionResponse?.fields?.find(
        (field) => field.slug === "category" && field.type === "Option",
      )?.validations?.options || [];
    const categoryMap = new Map(
      categoryOptions.map((option) => [option.id, option.name]),
    );

    const endpoint = `/collections/${JUDGES_COLLECTION_ID}/items`;
    const response = await apiClient.get<JudgesResponse>(endpoint);
    // console.log("Judges API response:", response);

    const itemsArray = Array.isArray(response)
      ? response
      : response?.items || response?.data || [];

    if (!Array.isArray(itemsArray)) {
      return {};
    }

    // Group judges by year
    const judgesByYear: JudgesByYear = {};
    itemsArray.forEach((judge) => {
      const year = judge.fieldData?.name || "Unknown";
      const categoryId = judge.fieldData?.category;
      const categoryName = categoryId
        ? categoryMap.get(categoryId) || categoryId
        : undefined;

      if (!judgesByYear[year]) {
        judgesByYear[year] = [];
      }
      judgesByYear[year].push({
        ...judge,
        categoryName,
      });
    });

    return judgesByYear;
  } catch (error) {
    console.error("Error fetching judges:", error);
    return {};
  }
}

export default async function Judges() {
  const judgesByYear = await fetchJudges();
  const years = Object.keys(judgesByYear).sort().reverse();

  return (
    <section className="min-h-screen bg-white py-40 max-md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Judges
          </h1>
          <p className="text-base max-md:text-sm text-gray-700 font-mono">
            Meet the distinguished panel of judges
          </p>
        </div>

        {years.length === 0 ? (
          <p className="text-gray-500">No judges found</p>
        ) : (
          <JudgesByYearGrid years={years} judgesByYear={judgesByYear} />
        )}
      </div>
    </section>
  );
}
