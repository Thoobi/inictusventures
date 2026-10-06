"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/shared/modal";

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

const PREVIEW_LENGTH = 220;

function decodeEntities(text: string): string {
	return text
		.replace(/&nbsp;/g, " ")
		.replace(/&#8205;/g, "")
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");
}

function getPatreonAboutPreview(html: string): {
	text: string;
	isTruncated: boolean;
} {
	const text = decodeEntities(html.replace(/<[^>]+>/g, " "))
		.replace(/\s+/g, " ")
		.trim();

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

function formatPatreonAboutModal(html: string): string {
	return html.replace(/<p>(?:\s|&nbsp;| |&#8205;)*<\/p>/g, "").trim();
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
							className="flex h-full min-w-0 flex-col gap-4 rounded-xl bg-red-800 p-3"
						>
							<div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-red-900">
								<Image
									src={patreon.patreonImage.url}
									alt={patreon.patreonImage.alt || patreon.name}
									fill
									sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
									className="object-cover object-center transition-transform duration-300 ease-out hover:scale-105"
								/>
							</div>
							<div className="flex w-full flex-col gap-2 px-1 pb-2">
								<h2 className="text-white text-2xl max-md:text-xl font-mono font-bold">
									{patreon.name}
								</h2>
								<p className="text-white text-sm max-md:text-xs leading-6 font-medium font-mono wrap-break-word">
									{preview.text}
									{preview.isTruncated && (
										<button
											type="button"
											onClick={() => setActivePatreon(patreon)}
											aria-label={`Read more about ${patreon.name}`}
											className="ml-1 cursor-pointer text-xs font-semibold text-white/80 underline underline-offset-2 hover:text-white font-mono transition-colors"
										>
											Read more
										</button>
									)}
								</p>
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
						<div
							className="text-black text-base leading-7 font-mono [&_p]:mb-4 [&_strong]:font-bold"
							dangerouslySetInnerHTML={{
								__html: formatPatreonAboutModal(activePatreon.about),
							}}
						/>
					</div>
				)}
			</Modal>
		</>
	);
}
