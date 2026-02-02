import type { Metadata } from "next";
import "./globals.css";
import LandscapeCanvas from "@/components/landscape/LandscapeCanvas";
import SmoothScroll from "@/components/landscape/SmoothScroll";
import JourneyProgress from "@/components/navigation/JourneyProgress";

export const metadata: Metadata = {
  title: "RK Talks | A Journey Through Thoughts",
  description: "Welcome to RK Talks - An immersive journey through a Japanese landscape of personal blogs, insights, and professional achievements.",
  keywords: ["RK Talks", "Blog", "Personal Blog", "Certifications", "Insights", "Tech Blog", "Portfolio"],
  authors: [{ name: "RK" }],
  openGraph: {
    title: "RK Talks | A Journey Through Thoughts",
    description: "Welcome to RK Talks - An immersive journey through a Japanese landscape of personal blogs, insights, and professional achievements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <LandscapeCanvas />
          <JourneyProgress />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
