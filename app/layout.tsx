import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import Footer from "@/components/shared/footer";
import NavPathChecker from "@/components/shared/navPathChecker";
import JsonLd from "@/components/shared/jsonLd";
import {
	CONTACT_EMAIL,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	SOCIAL_LINKS,
} from "@/lib/seo";
import "./globals.css";

const monaSans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

const inisticLinks = [
	{ label: "Website", href: SITE_URL },
	{ label: "Instagram", href: "https://www.instagram.com/inisticmedia/" },
	{ label: "Email", href: `mailto:${CONTACT_EMAIL}` },
];

const DEFAULT_TITLE = "Inistic Ventures | Multimedia, Talent & Theatre Production";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: DEFAULT_TITLE,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	keywords: [
		"Inistic Ventures",
		"Inistic Multimedia",
		"Talent Management",
		"Television and Film Production",
		"Stage and Musical Production",
		"Theatre Education",
		"Arts Consultancy",
		"DAM Dance Art Music",
	],
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	// Canonical URLs are set per page — a canonical here would be inherited
	// by every route and point them all at the homepage.
	openGraph: {
		title: {
			default: DEFAULT_TITLE,
			template: `%s | ${SITE_NAME}`,
		},
		description: SITE_DESCRIPTION,
		url: "/",
		siteName: SITE_NAME,
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		site: "@InisticTv",
		creator: "@InisticTv",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
	},
	formatDetection: { telephone: false },
};

export const viewport: Viewport = {
	themeColor: "#b91c1c",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: SITE_NAME,
			alternateName: "Inistic Multimedia",
			url: SITE_URL,
			logo: `${SITE_URL}/assets/logo.png`,
			description: SITE_DESCRIPTION,
			email: CONTACT_EMAIL,
			sameAs: SOCIAL_LINKS,
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: SITE_NAME,
			inLanguage: "en",
			publisher: { "@id": `${SITE_URL}/#organization` },
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${monaSans.variable} antialiased`}>
				<JsonLd data={jsonLd} />
				<div className="fixed w-full z-50">
					<NavPathChecker />
				</div>

				<nav aria-label="Inistic links" className="sr-only">
					<ul>
						{inisticLinks.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									target="_blank"
									rel="noreferrer noopener"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				{children}
				<Footer />
			</body>
		</html>
	);
}
