import { sanityFetch } from "@/lib/sanity/client";
import { JUDGES_QUERY } from "@/lib/sanity/queries";
import JudgesByYearGrid, {
  type JudgeCardData,
} from "@/components/dam/judgesByYearGrid";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

interface JudgeWithYear extends JudgeCardData {
  year: string;
}

type JudgesByYear = Record<string, JudgeCardData[]>;

async function fetchJudges(): Promise<JudgesByYear> {
  const judges = (await sanityFetch<JudgeWithYear[]>(JUDGES_QUERY)) ?? [];

  const judgesByYear: JudgesByYear = {};
  for (const { year, ...judge } of judges) {
    (judgesByYear[year || "Unknown"] ??= []).push(judge);
  }
  return judgesByYear;
}

export const metadata: Metadata = pageMetadata({
	title: "Judges",
	description: "Meet the distinguished panel of DAM judges across dance, art and music, year by year.",
	path: "/dam/judges",
});

export default async function Judges() {
  const judgesByYear = await fetchJudges();
  const years = Object.keys(judgesByYear).sort().reverse();

  return (
    <section className="min-h-screen bg-white py-40 max-md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 flex flex-col gap-1">
          <h1 className="text-5xl max-md:text-3xl font-bold font-mono">
            Judges
          </h1>
          <p className="text-base max-md:text-sm text-gray-700 font-mono">
            Meet the distinguished panel of judges
          </p>
        </div>

        {years.length === 0 ? (
          <p className="text-gray-500">No judges found</p>
        ) : (
          <JudgesByYearGrid years={years} judgesByYear={judgesByYear} />
        )}
      </div>
    </section>
  );
}
