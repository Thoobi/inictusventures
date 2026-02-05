import type { Metadata } from "next";
import { Geist, Mona_Sans } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inictus",
  description: "Inictus Ventures",
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
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
