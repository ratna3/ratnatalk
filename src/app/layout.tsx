import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorBackground from "@/components/CursorBackground";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RK Talks | Personal Blog & Insights",
  description: "Welcome to RK Talks - A premium platform for personal blogs, insights, and professional certifications. Explore thought-provoking content and achievements.",
  keywords: ["RK Talks", "Blog", "Personal Blog", "Certifications", "Insights", "Tech Blog"],
  authors: [{ name: "RK" }],
  openGraph: {
    title: "RK Talks | Personal Blog & Insights",
    description: "Welcome to RK Talks - A premium platform for personal blogs, insights, and professional certifications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className={spaceGrotesk.className}>
        <CursorBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
