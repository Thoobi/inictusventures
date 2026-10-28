import { sanityFetch } from "@/lib/sanity/client";
import { TEAM_MEMBERS_QUERY } from "@/lib/sanity/queries";
import TeamsImageGrid from "@/components/dam/teamsImageGrid";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

interface TeamImage {
	fileId?: string;
	url?: string;
	alt?: string | null;
	name?: string;
}

async function fetchTeams(): Promise<TeamImage[]> {
	const members = (await sanityFetch<TeamImage[]>(TEAM_MEMBERS_QUERY)) ?? [];
	return members.filter((member) => Boolean(member.url));
}

export const metadata: Metadata = pageMetadata({
	title: "Teams",
	description: "Meet the talented teams behind DAM — the people who make Dance, Art and Music possible.",
	path: "/dam/teams",
});

export default async function Teams() {
	const images = await fetchTeams();

	return (
		<section className="min-h-screen bg-white py-40 max-md:py-32 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-start mb-10 flex flex-col gap-1">
					<h1 className="text-5xl max-md:text-3xl font-bold font-mono">
						Teams
					</h1>
					<p className="text-base max-md:text-sm text-gray-700 font-mono">
						Meet the talented teams that made DAM possible
					</p>
				</div>

				{images.length === 0 ? (
					<p className="text-gray-500">No team images found</p>
				) : (
					<TeamsImageGrid images={images} />
				)}
			</div>
		</section>
	);
}
