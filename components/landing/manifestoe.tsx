import Image from "next/image";
import Button from "../custom/button";
import { apiClient } from "@/apiclient";
import { SPONSOR_LOGO_COLLECTION_ID, BASE_URL } from "@/constant";

interface SponsorImage {
  fileId: string;
  url: string;
  alt: string;
}

interface SponsorItem {
  fieldData?: {
    "logo-2"?: SponsorImage[];
    [key: string]: unknown;
  };
}

interface SponsorResponse {
  items?: SponsorItem[];
  data?: SponsorItem[];
}

export default async function Manifesteos() {
  async function fetchSponsorImages(): Promise<SponsorImage[]> {
    try {
      if (!SPONSOR_LOGO_COLLECTION_ID) {
        console.warn("SPONSOR_LOGO_COLLECTION_ID is not set");
        return [];
      }

      if (!BASE_URL) {
        console.warn("BASE_URL is not set");
        return [];
      }

      const endpoint = `/collections/${SPONSOR_LOGO_COLLECTION_ID}/items`;
      const response = await apiClient.get<SponsorResponse | SponsorItem[]>(
        endpoint,
      );

      // Extract fieldData from each item and get sponsor-images array
      const allSponsorImages: SponsorImage[] = [];

      // Handle if response is an object with an items/data property
      const itemsArray = Array.isArray(response)
        ? response
        : response?.items || response?.data || [];

      if (Array.isArray(itemsArray)) {
        itemsArray.forEach((item) => {
          if (item.fieldData && Array.isArray(item.fieldData["logo-2"])) {
            allSponsorImages.push(...item.fieldData["logo-2"]);
          }
        });
      }

      return allSponsorImages;
    } catch (error) {
      console.error("Error fetching sponsor images:", error);
      return [];
    }
  }

  const images = await fetchSponsorImages();

  return (
    <div className="flex flex-col items-end py-20 max-md:py-10 max-md:w-full font-mono bg-linear">
      <span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] text-gray-400 mb-3 uppercase px-12 max-md:px-5">
        [ Collaborations ]
      </span>
      <div className="w-2/5 max-md:w-[80%] flex flex-col justify-start items-start px-12 max-md:px-5">
        <h1 className="text-8xl max-md:text-6xl text-right tracking-[-0.05em] font-bold text-red-700 mb-4">
          WORK WITH US
        </h1>
      </div>
      <div className="flex flex-col gap-10 max-md:gap-8 pb-20 pt-10 max-md:pt-5 max-md:pb-5 px-5">
        <div className="flex flex-row justify-start lg:gap-5 gap-x-14 max-md:justify-start w-full flex-wrap">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img.url}
              alt={img.alt}
              width={250}
              height={150}
              className="h-auto w-28 max-md:w-20 object-contain"
            />
          ))}
        </div>
        <div className="text-2xl max-md:text-xl text-gray-500 font-medium px-5 max-md:px-0 tracking-[-0.01em]">
          We don&apos;t collaborate with everyone. We partner with the
          relentless. Whether you&apos;re a brand looking for cultural
          relevance, an artist ready for the global stage, or an investor
          backing the next multimedia titan—Inistic is the engine. We provide
          the infrastructure; you provide the fire.
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button
            title="Partner with us"
            className="bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 max-md:py-3 max-md:px-5 px-8 rounded-lg hover:from-black hover:to-red-700 hover:scale-105 transition-all duration-300 ease-out max-md:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
