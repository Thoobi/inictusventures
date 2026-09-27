import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Footer from "@/components/shared/footer";
import NavPathChecker from "@/components/shared/navPathChecker";
import "./globals.css";

const monaSans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

export const inisticLinks = [
	{ label: "Website", href: "https://inisticventures.com" },
	{ label: "Instagram", href: "https://www.instagram.com/inisticmedia/" },
	{ label: "Email", href: "mailto:hello@inisticventures.com" },
];

export const metadata: Metadata = {
	title: {
		default: "Inistic Ventures | Theatre Education & Consultancy",
		template: "%s | Inistic Ventures",
	},
	description:
		"Empowering institutional growth and creative strategy through premier theatre education and expert consulting services.",
	keywords: [
		"Theatre Education",
		"Arts Consultancy",
		"Inistic Ventures",
		"Curriculum Development",
		"Creative Strategy",
	],
	authors: [{ name: "Inistic Ventures" }],
	metadataBase: new URL("https://inisticventures.com"),
	alternates: {
		canonical: "https://inisticventures.com",
		languages: {
			"en-US": "https://inisticventures.com",
		},
	},
	openGraph: {
		title: "Inistic Ventures | Theatre Education & Consultancy",
		description:
			"Empowering institutional growth and creative strategy through premier theatre education and expert consulting services.",
		url: "https://inisticventures.com",
		siteName: "Inistic Ventures",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/icon.png",
				width: 512,
				height: 512,
				alt: "Inistic Ventures - Theatre Education and Consultancy",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Inistic Ventures | Theatre Education & Consultancy",
		description:
			"Empowering institutional growth and creative strategy through premier theatre education and expert consulting services.",
		images: ["https://inisticventures.com/icon.png"],
	},
	icons: {
		icon: "/icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${monaSans.variable} antialiased`}>
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
