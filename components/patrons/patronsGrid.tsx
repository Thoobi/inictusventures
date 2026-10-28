"use client";

import Image from "next/image";
import { useState } from "react";
import { PortableText, toPlainText, type PortableTextBlock } from "next-sanity";
import Modal from "@/components/shared/modal";

export interface PatreonCardData {
	name: string;
	about: PortableTextBlock[];
	slug: string;
	patreonImage: {
		url: string;
		fileId: string;
		alt?: string;
	};
}

interface patronsGridProps {
	patrons: PatreonCardData[];
}

const PREVIEW_LENGTH = 220;

function getPatreonAboutPreview(about: PortableTextBlock[]): {
	text: string;
	isTruncated: boolean;
} {
	const text = toPlainText(about).replace(/\s+/g, " ").trim();

	if (text.length <= PREVIEW_LENGTH) {
		return { text, isTruncated: false };
	}

	const cut = text.slice(0, PREVIEW_LENGTH);
	const lastSpace = cut.lastIndexOf(" ");
	return {
		text: `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?-]+$/, "")}…`,
		isTruncated: true,
	};
}

export default function PatronsGrid({ patrons }: patronsGridProps) {
	const [activePatreon, setActivePatreon] = useState<PatreonCardData | null>(
		null,
	);

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-md:gap-5">
				{patrons.map((patreon) => {
					const preview = getPatreonAboutPreview(patreon.about);

					return (
						<div
							key={patreon.slug}
							className="flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
						>
							{/* Patron photos are portraits; a square crop keeps faces in frame where 4:3 cut them. */}
							<div className="relative aspect-square w-full overflow-hidden bg-gray-100">
								<Image
									src={patreon.patreonImage.url}
									alt={patreon.patreonImage.alt || patreon.name}
									fill
									sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
									className="object-cover object-center transition-transform duration-300 ease-out hover:scale-105"
								/>
							</div>
							<div className="flex w-full flex-1 flex-col gap-2 p-5 max-md:p-4">
								<h2 className="text-black text-2xl max-md:text-xl font-mono font-bold">
									{patreon.name}
								</h2>
								<p className="text-gray-700 text-sm leading-6 font-mono wrap-break-word">
									{preview.text}
								</p>
								{preview.isTruncated && (
									<button
										type="button"
										onClick={() => setActivePatreon(patreon)}
										aria-label={`Read more about ${patreon.name}`}
										className="mt-auto self-start pt-2 cursor-pointer text-sm font-semibold text-red-700 underline underline-offset-2 hover:text-black font-mono transition-colors"
									>
										Read more
									</button>
								)}
							</div>
						</div>
					);
				})}
			</div>

			<Modal
				open={activePatreon !== null}
				onClose={() => setActivePatreon(null)}
				labelledBy="patron-modal-title"
				className="max-w-4xl px-6 pt-14 pb-6 max-md:px-4"
			>
				{activePatreon && (
					<div className="max-h-[80vh] overflow-y-auto pr-1">
						<h3
							id="patron-modal-title"
							className="mb-4 text-3xl max-md:text-2xl font-bold font-mono text-black"
						>
							{activePatreon.name}
						</h3>
						<div className="text-black text-base leading-7 font-mono [&_p]:mb-4 [&_strong]:font-bold [&_a]:underline">
							<PortableText value={activePatreon.about} />
						</div>
					</div>
				)}
			</Modal>
		</>
	);
}
