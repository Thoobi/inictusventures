"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick?: () => void;
  currentSlide?: number;
  slideCount?: number;
  slidesToShow?: number;
}

function PreviousArrow({ onClick, currentSlide = 0 }: ArrowProps) {
  const isDisabled = currentSlide <= 0;

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label="Previous slide"
      className={`absolute bottom-4 right-16 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-black shadow-sm ring-1 ring-gray-300 transition-colors ${
        isDisabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer hover:bg-gray-100"
      }`}
    >
      ←
    </button>
  );
}

function NextArrow({
  onClick,
  currentSlide = 0,
  slideCount = 0,
  slidesToShow = 1,
}: ArrowProps) {
  const lastVisibleStart = Math.max(slideCount - slidesToShow, 0);
  const isDisabled = currentSlide >= lastVisibleStart;

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label="Next slide"
      className={`absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-black shadow-sm ring-1 ring-gray-300 transition-colors ${
        isDisabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer hover:bg-gray-100"
      }`}
    >
      →
    </button>
  );
}

export interface DamGalleryImage {
  id: string;
  url: string;
  fileId?: string;
  alt?: string | null;
  title?: string;
  year?: string;
}

export interface DamGalleryYearGroup {
  year: string;
  slug?: string;
  images: DamGalleryImage[];
}

interface DamGallerySliderProps {
  groups: DamGalleryYearGroup[];
}

const baseSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
} satisfies Omit<Settings, "slidesToShow">;

export default function DamGallerySlider({ groups }: DamGallerySliderProps) {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlides = () => {
      setSlidesToShow(window.innerWidth >= 1024 ? 4 : 1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);

    return () => {
      window.removeEventListener("resize", updateSlides);
    };
  }, []);

  if (!groups.length) {
    return (
      <p className="text-gray-700 font-mono">No gallery images available.</p>
    );
  }

  return (
    <div className="space-y-12 mb-16">
      {groups.map((group) => (
        <div key={group.slug || group.year}>
          <h2 className="text-2xl font-bold font-mono mb-4">{group.year}</h2>
          <div className="relative">
            <Slider
              key={`${group.slug || group.year}-${slidesToShow}`}
              {...baseSliderSettings}
              slidesToShow={slidesToShow}
              prevArrow={<PreviousArrow />}
              nextArrow={<NextArrow slidesToShow={slidesToShow} />}
            >
              {group.images.map((image) => (
                <div key={image.id} className="px-2">
                  <div className="relative h-100 overflow-hidden bg-gray-200">
                    <Image
                      src={image.url}
                      alt={image.alt || image.title || "DAM Gallery Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </div>
  );
}
