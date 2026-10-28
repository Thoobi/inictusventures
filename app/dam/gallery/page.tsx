import DamGallerySlider, {
  type DamGalleryImage,
  type DamGalleryYearGroup,
} from "../../../components/dam/gallerySlider";
import { sanityFetch } from "@/lib/sanity/client";
import { DAM_EDITIONS_QUERY } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

interface DamEdition {
  _id: string;
  year: string;
  slug?: string;
  images: { id: string; url?: string; fileId?: string; alt?: string | null }[] | null;
}

async function fetchGalleryImages(): Promise<{ groups: DamGalleryYearGroup[] }> {
  const editions = (await sanityFetch<DamEdition[]>(DAM_EDITIONS_QUERY)) ?? [];

  const groups = editions
    .map((edition): DamGalleryYearGroup | null => {
      const images: DamGalleryImage[] = (edition.images ?? [])
        .filter((img) => Boolean(img.url))
        .map((img) => ({
          id: `${edition._id}-${img.id}`,
          fileId: img.fileId,
          url: img.url as string,
          alt: img.alt,
          title: edition.year,
          year: edition.year,
        }));

      return images.length > 0
        ? { year: edition.year, slug: edition.slug, images }
        : null;
    })
    .filter((group): group is DamGalleryYearGroup => Boolean(group));

  return { groups };
}

export const metadata: Metadata = pageMetadata({
	title: "Gallery",
	description: "Browse the DAM gallery — photos of past winners and highlights from every year of Dance, Art and Music.",
	path: "/dam/gallery",
});

export default async function Gallery() {
  const { groups } = await fetchGalleryImages();

  return (
    <section className="min-h-screen bg-white py-40  px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Gallery
          </h1>
          <p className="text-base max-md:text-sm text-gray-700 font-mono">
            This is the curation of DAM winners
          </p>
        </div>
        <DamGallerySlider groups={groups} />
      </div>
    </section>
  );
}
