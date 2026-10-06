import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: "Inistic",
		description: SITE_DESCRIPTION,
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#b91c1c",
		icons: [{ src: "/icon.png", sizes: "242x249", type: "image/png" }],
	};
}
