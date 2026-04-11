"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export interface PatreonCardData {
  name: string;
  about: string;
  slug: string;
  email?: string;
  phone?: string;
  patreonImage: {
    url: string;
    fileId: string;
    alt?: string;
  };
}

interface patronsGridProps {
  patrons: PatreonCardData[];
}

function formatPatreonAboutPreview(html: string): string {
  return html
    .replace(/<p>(?:\s|&nbsp;| |&#8205;)*<\/p>/g, "")
    .replace(/<\/p>\s*<p>/g, " ")
    .replace(/<\/?p>/g, "")
    .trim();
}

function formatPatreonAboutModal(html: string): string {
  return html.replace(/<p>(?:\s|&nbsp;| |&#8205;)*<\/p>/g, "").trim();
}

export default function PatronsGrid({ patrons }: patronsGridProps) {
  const [activePatreon, setActivePatreon] = useState<PatreonCardData | null>(
    null,
  );
  const originalBodyOverflow = useRef<string | null>(null);

  useEffect(() => {
    if (activePatreon) {
      if (originalBodyOverflow.current === null) {
        originalBodyOverflow.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow.current ?? "";
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow.current ?? "";
    };
  }, [activePatreon]);

  return (
    <>
      <div className="flex flex-wrap flex-row gap-10">
        {patrons.map((patreon) => (
          <div
            key={patreon.slug}
            className="w-full md:w-100 min-w-0 bg-red-800 p-3 rounded-lg max-md:rounded-xl justify-center items-start flex flex-col gap-4"
          >
            <div className="flex flex-row justify-between w-full">
              <Image
                src={patreon.patreonImage.url}
                width={500}
                height={500}
                alt={patreon.patreonImage.alt || patreon.name}
                className="object-cover h-60 w-60 max-md:h-30 max-md:w-30 object-center transition-transform duration-300 hover:scale-102 rounded-xl"
              />
              {patreon.email || patreon.phone ? (
                <div className="flex flex-col gap-3 bg-white rounded-lg h-fit p-2">
                  <div className="w-full">
                    {patreon.email && (
                      <Link
                        href={`mailto:${patreon.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                        aria-label={`Email ${patreon.name}`}
                      >
                        <IoMail className="text-red-900/90 text-3xl max-md:text-2xl cursor-pointer" />
                      </Link>
                    )}
                  </div>
                  {patreon.phone && (
                    <Link
                      href={`tel:${patreon.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Call ${patreon.name}`}
                      className="text-3xl"
                    >
                      <FaPhoneAlt className="text-red-900/90 text-3xl max-md:text-2xl cursor-pointer" />
                    </Link>
                  )}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-2xl max-md:text-xl font-mono font-bold">
                {patreon.name}
              </h2>
              <div className="relative">
                <div
                  className="text-white text-sm font-medium max-md:text-xs leading-7 wrap-break-word overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:6] [&_strong]:font-bold [&_strong]:text-white font-mono h-72"
                  dangerouslySetInnerHTML={{
                    __html: formatPatreonAboutPreview(patreon.about),
                  }}
                />
                {/* gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-7 bg-linear-to-t from-red-800 to-transparent pointer-events-none" />
              </div>
              <button
                type="button"
                onClick={() => setActivePatreon(patreon)}
                className="self-start cursor-pointer text-sm font-semibold text-white/70 hover:text-white font-mono transition-colors"
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      {activePatreon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => setActivePatreon(null)}
            className="absolute inset-0 backdrop-blur-xl"
          />
          <div className="relative z-10 w-full max-w-4xl rounded-xl bg-white px-6 pt-14 pb-6">
            <button
              type="button"
              onClick={() => setActivePatreon(null)}
              className="absolute top-4 right-4 z-20 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            >
              <IoCloseOutline className="text-4xl max-md:text-3xl" />
            </button>
            <div className="max-h-[80vh] overflow-y-auto pr-1">
              <h3 className="mb-4 text-3xl max-md:text-2xl font-bold font-mono text-black">
                {activePatreon.name}
              </h3>
              <div
                className="text-black text-base leading-7 font-mono [&_p]:mb-4 [&_strong]:font-bold"
                dangerouslySetInnerHTML={{
                  __html: formatPatreonAboutModal(activePatreon.about),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
