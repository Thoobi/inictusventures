import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import Footer from "@/components/shared/footer";
import NavPathChecker from "@/components/shared/navPathChecker";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inistic Ventures | Theatre Education & Consultancy",
    template: "%s | Inistic Ventures", // Allows children pages to do: title: "About" -> "About | Inistic Ventures"
  },
  description: "Empowering institutional growth and creative strategy through premier theatre education and expert consulting services.",
  keywords: ["Theatre Education", "Arts Consultancy", "Inistic Ventures", "Curriculum Development", "Creative Strategy"],
  authors: [{ name: "Inistic Ventures" }],
  metadataBase: new URL("https://inisticventures.com"), // Replace with your production domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Inistic Ventures | Theatre Education & Consultancy",
    description: "Empowering institutional growth and creative strategy through premier theatre education and expert consulting services.",
    url: "https://inisticventures.com",
    siteName: "Inistic Ventures",
    locale: "en_US",
    type: "website",
    images: [
      // {
      //   url: "/og-image.jpg",
      //   width: 1200,
      //   height: 630,
      //   alt: "Inistic Ventures - Theatre Education and Consultancy",
      // },
    ],
  },

  icons: {
    icon: "/icon.png", // Standard favicon

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
