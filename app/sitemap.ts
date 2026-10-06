import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: {
	path: string;
	changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
	priority: number;
}[] = [
	{ path: "/", changeFrequency: "monthly", priority: 1 },
	{ path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
	{ path: "/patrons", changeFrequency: "monthly", priority: 0.7 },
	{ path: "/dam", changeFrequency: "monthly", priority: 0.9 },
	{ path: "/dam/registration", changeFrequency: "monthly", priority: 0.8 },
	{ path: "/dam/gallery", changeFrequency: "weekly", priority: 0.6 },
	{ path: "/dam/judges", changeFrequency: "monthly", priority: 0.6 },
	{ path: "/dam/teams", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
	return routes.map(({ path, changeFrequency, priority }) => ({
		url: `${SITE_URL}${path === "/" ? "" : path}`,
		changeFrequency,
		priority,
	}));
}
