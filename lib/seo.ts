import type { Metadata } from "next";

export const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL || "https://inisticventures.com"
).replace(/\/$/, "");

export const SITE_NAME = "Inistic Ventures";

export const SITE_DESCRIPTION =
	"Inistic Ventures is a multimedia company pioneering creative influence through talent management, television and film production, stage and musical production, and theatre education and consultancy.";

export const DAM_NAME = "DAM — Dance, Art & Music";

export const DAM_DESCRIPTION =
	"DAM by Inistic Ventures is a creative ecosystem for dancers, artists and musicians — street battles, showcases, exhibitions and live music celebrating bold, raw, authentic talent.";

export const SOCIAL_LINKS = [
	"https://x.com/InisticTv",
	"https://www.instagram.com/inisticmedia/",
	"https://linkedin.com/company/inisticmedia",
	"https://youtube.com/@inistictv",
];

export const CONTACT_EMAIL = "hello@inisticventures.com";

interface PageMetadataInput {
	/** Use `{ absolute }` to skip the layout's title template. */
	title: string | { absolute: string };
	description: string;
	path: string;
	noIndex?: boolean;
}

/**
 * Builds per-page metadata so every route gets its own canonical URL,
 * Open Graph and Twitter tags.
 */
export function pageMetadata({
	title,
	description,
	path,
	noIndex,
}: PageMetadataInput): Metadata {
	// Page-level openGraph replaces the inherited one, including the image
	// from the opengraph-image file, so point at the right one explicitly.
	const image = path.startsWith("/dam")
		? "/dam/opengraph-image"
		: "/opengraph-image";

	return {
		title,
		description,
		alternates: { canonical: path },
		// openGraph/twitter are shallow-merged with the root layout, so the
		// shared fields have to be repeated here.
		openGraph: {
			type: "website",
			siteName: SITE_NAME,
			locale: "en_US",
			title,
			description,
			url: path,
			images: [{ url: image, width: 1200, height: 630 }],
		},
		// X falls back to og:title/og:description, which have the title template applied.
		twitter: { card: "summary_large_image", images: [image] },
		...(noIndex && { robots: { index: false, follow: true } }),
	};
}
