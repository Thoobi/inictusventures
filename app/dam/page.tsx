import Hero from "@/components/dam/pages/hero";
import Ticker from "@/components/dam/ticker";
import Intro from "@/components/dam/pages/intro";
import Pillars from "@/components/dam/pages/pillars";
import Manifesto from "@/components/dam/pages/manifestoe";
import VinylStrip from "@/components/dam/pages/vinylStrip";
import Button from "@/components/custom/button";
import { Reveal, SplitReveal } from "@/components/motion";
import type { Metadata } from "next";
import { pageMetadata, DAM_DESCRIPTION, DAM_NAME, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: { absolute: `${DAM_NAME} | ${SITE_NAME}` },
	description: DAM_DESCRIPTION,
	path: "/dam",
});

export default function Home() {
	return (
		<div className="bg-white overflow-x-clip">
			<Hero />
			<Ticker />
			<Intro />
			<Pillars />
			<Manifesto />
			<VinylStrip />

			<section
				aria-labelledby="dam-cta-heading"
				className="flex flex-col items-center gap-8 text-center px-12 max-md:px-5 pb-28 max-md:pb-16 pt-8 font-mono"
			>
				<h2
					id="dam-cta-heading"
					className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase"
				>
					<SplitReveal text="Ready to take" className="block" />
					<SplitReveal text="the stage?" className="block text-red-700" delay={0.2} />
				</h2>
				<Reveal delay={0.3}>
					<Button
						title="Register for DAM"
						href="/dam/registration"
						className="inline-block bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:from-black hover:to-red-700 hover:scale-105 transition-all duration-300 ease-out"
					/>
				</Reveal>
			</section>
		</div>
	);
}
