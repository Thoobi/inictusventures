import { sanityFetch } from "@/lib/sanity/client";
import { PATRONS_QUERY } from "@/lib/sanity/queries";
import PatronsGrid, {
	type PatreonCardData,
} from "@/components/patrons/patronsGrid";
import SupportUsSection from "@/components/patrons/supportUsSection";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60; // Fallback; the Sanity webhook revalidates on publish

async function fetchpatrons(): Promise<PatreonCardData[]> {
	const patrons = (await sanityFetch<PatreonCardData[]>(PATRONS_QUERY)) ?? [];
	return patrons.filter((patron) => Boolean(patron.patreonImage?.url));
}

export const metadata: Metadata = pageMetadata({
	title: "Patrons",
	description: "Meet the patrons who support Inistic Ventures, and find out how you can sponsor or donate to support creative talent.",
	path: "/patrons",
});

export default async function patrons() {
	const patrons = await fetchpatrons();
	return (
		<section className="flex flex-col py-40 max-md:py-30 max-md:px-5 bg-[#fbfbfb]">
			<div className="max-w-7xl mx-auto w-full">
				<div className="text-start mb-10 flex flex-col gap-1">
					<h1 className="text-5xl max-md:text-3xl font-bold font-mono">
						Patrons
					</h1>
					<p className="text-base max-md:text-sm text-black font-mono max-w-2xl">
						We are grateful for the support of our patrons who make
						our work possible. Their contributions help us continue
						to create and innovate.
					</p>
				</div>

				<SupportUsSection />

				<PatronsGrid patrons={patrons} />
			</div>
		</section>
	);
}
