import type { Metadata } from "next";
import "./globals.css";
import LandscapeCanvas from "@/components/landscape/LandscapeCanvas";
import SmoothScroll from "@/components/landscape/SmoothScroll";
import JourneyProgress from "@/components/navigation/JourneyProgress";
import CustomCursor from "@/components/interactive/CustomCursor";
import InteractiveCreatures from "@/components/interactive/InteractiveCreatures";
import ParticleField from "@/components/interactive/ParticleField";
import HiddenCollectibles from "@/components/interactive/HiddenCollectibles";
import ThemeWrapper from "@/components/theme/ThemeWrapper";

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
          <ThemeWrapper>
            {/* Background layers */}
            <LandscapeCanvas />

            {/* Interactive elements */}
            <CustomCursor />
            <InteractiveCreatures />
            <ParticleField type="petal" count={20} speed={0.8} />
            <HiddenCollectibles />

            {/* Navigation */}
            <JourneyProgress />

            {/* Main content */}
            <main>{children}</main>
          </ThemeWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
