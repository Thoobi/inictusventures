"use client";

import Image from "next/image";
import { useState } from "react";

interface JudgeImage {
  fileId?: string;
  url?: string;
  alt?: string | null;
}

interface JudgeFieldData {
  name?: string;
  slug?: string;
  "judge-name"?: string;
  "judge-image"?: JudgeImage;
  category?: string;
  [key: string]: unknown;
}

interface JudgeWithCategoryName {
  id: string;
  fieldData?: JudgeFieldData;
  categoryName?: string;
}

interface JudgesByYearGridProps {
  years: string[];
  judgesByYear: Record<string, JudgeWithCategoryName[]>;
}

export default function JudgesByYearGrid({
  years,
  judgesByYear,
}: JudgesByYearGridProps) {
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  const handleImageLoad = (key: string) => {
    setLoadedMap((prev) => {
      if (prev[key]) {
        return prev;
      }

      return {
        ...prev,
        [key]: true,
      };
    });
  };

  return (
    <>
      {years.map((year) => (
        <div key={year} className="mb-16">
          <h2 className="text-3xl font-bold font-mono mb-8">{year}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(judgesByYear[year] || []).map((judge) => {
              const judgeImage = judge.fieldData?.["judge-image"] as
                | JudgeImage
                | undefined;
              const judgeName = judge.fieldData?.["judge-name"] as
                | string
                | undefined;
              const category = judge.categoryName;
              const imageKey = `${year}-${judge.id}`;
              const isLoaded = loadedMap[imageKey] ?? false;

              return (
                <div
                  key={judge.id}
                  className="flex flex-col items-center text-center"
                >
                  {judgeImage?.url && (
                    <div
                      className={`w-full h-120 max-md:h-80 max-md:w-full rounded-lg mb-4 flex items-center justify-center overflow-hidden ${
                        isLoaded ? "bg-gray-100" : "animate-pulse bg-gray-200"
                      }`}
                    >
                      <Image
                        src={judgeImage.url}
                        alt={judgeName || "Judge"}
                        width={600}
                        height={800}
                        onLoad={() => handleImageLoad(imageKey)}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold font-mono">
                    {judgeName || "Unknown"}
                  </h3>
                  {category && (
                    <p className="text-sm text-gray-600 font-mono mt-1">
                      {category} Judge
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
