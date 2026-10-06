import type { Metadata } from "next";
import JsonLd from "@/components/shared/jsonLd";
import { DAM_DESCRIPTION, DAM_NAME, SITE_NAME, SITE_URL } from "@/lib/seo";

const DAM_TITLE_TEMPLATE = `%s | DAM by ${SITE_NAME}`;

export const metadata: Metadata = {
	title: {
		default: `${DAM_NAME} | ${SITE_NAME}`,
		template: DAM_TITLE_TEMPLATE,
	},
	description: DAM_DESCRIPTION,
	openGraph: {
		title: { default: DAM_NAME, template: DAM_TITLE_TEMPLATE },
		description: DAM_DESCRIPTION,
		siteName: SITE_NAME,
		locale: "en_US",
		type: "website",
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": `${SITE_URL}/dam#organization`,
	name: "DAM",
	alternateName: DAM_NAME,
	url: `${SITE_URL}/dam`,
	description: DAM_DESCRIPTION,
	parentOrganization: { "@id": `${SITE_URL}/#organization` },
};

export default function DamLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<JsonLd data={jsonLd} />
			{children}
		</>
	);
}
