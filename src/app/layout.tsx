import type { Metadata } from "next";
import { DM_Serif_Display, Source_Sans_3, Playfair_Display } from "next/font/google";
import "./globals.css";
import LiquidBackground from "@/components/LiquidBackground";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
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
    <html lang="en" className={`${dmSerif.variable} ${sourceSans.variable} ${playfair.variable}`}>
      <body className={sourceSans.className}>
        <LiquidBackground />
        <main>{children}</main>
      </body>
    </html>
  );
}
