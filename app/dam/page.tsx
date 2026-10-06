// import Navbar from "@/components/dam/Navbar";
import Hero from "@/components/dam/pages/hero";
import Ticker from "@/components/dam/ticker";
import Intro from "@/components/dam/pages/intro";
import Pillars from "@/components/dam/pages/pillars";
import Events from "@/components/dam//pages/events";
import Manifesto from "@/components/dam/pages/manifestoe";
import VinylStrip from "@/components/dam/pages/vinylStrip";
// import Cursor from "@/components/dam/cursor";
import ScrollReveal from "@/components/dam/scrollReveal";
import type { Metadata } from "next";
import { pageMetadata, DAM_DESCRIPTION, DAM_NAME, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: { absolute: `${DAM_NAME} | ${SITE_NAME}` },
	description: DAM_DESCRIPTION,
	path: "/dam",
});

export default function Home() {
  return (
    <div className="bg-dam-black min-h-screen">
      {/* <Cursor /> */}
      <ScrollReveal />
      <Hero />
      <Ticker />
      <Intro />
      <Pillars />
      <Events />
      <Manifesto />
      <VinylStrip />
    </div>
  );
}
