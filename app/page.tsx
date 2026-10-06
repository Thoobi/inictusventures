import Hero from "@/components/landing/hero";
import Services from "@/components/landing/services";
import Vision from "@/components/landing/vision";
import Manifesteos from "@/components/landing/manifestoe";
import type { Metadata } from "next";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: { absolute: "Inistic Ventures | Multimedia, Talent & Theatre Production" },
	description: SITE_DESCRIPTION,
	path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <Services />
      <Manifesteos />
    </>
  );
}
