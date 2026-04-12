"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface TeamImage {
  fileId?: string;
  url?: string;
  alt?: string | null;
}

interface TeamsImageGridProps {
  images: TeamImage[];
}

export default function TeamsImageGrid({ images }: TeamsImageGridProps) {
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    Array(images.length).fill(false),
  );

  useEffect(() => {
    setLoaded(Array(images.length).fill(false));
  }, [images]);

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      if (prev[index]) {
        return prev;
      }

      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => {
        const isLoaded = loaded[index];

        return (
          <div
            key={`${image.fileId || image.url}-${index}`}
            className={`relative w-full h-120 max-md:h-80 rounded-lg overflow-hidden ${
              isLoaded ? "" : "animate-pulse bg-gray-200"
            }`}
          >
            <Image
              src={image.url as string}
              alt={image.alt || "Team image"}
              width={600}
              height={800}
              onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
