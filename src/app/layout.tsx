import type { Metadata, Viewport } from "next";
import "./globals.css";
import LandscapeCanvas from "@/components/landscape/LandscapeCanvas";
import SmoothScroll from "@/components/landscape/SmoothScroll";
import JourneyProgress from "@/components/navigation/JourneyProgress";
import CustomCursor from "@/components/interactive/CustomCursor";
import InteractiveCreatures from "@/components/interactive/InteractiveCreatures";
import HiddenCollectibles from "@/components/interactive/HiddenCollectibles";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
import MobileOptimizations from "@/components/optimizations/MobileOptimizations";
import PerformanceMonitor from "@/components/optimizations/PerformanceMonitor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF3E0" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A2E" },
  ],
};

export const metadata: Metadata = {
  title: "RK Talks | A Journey Through Thoughts",
  description: "Welcome to RK Talks - An immersive journey through a Japanese landscape of personal blogs, insights, and professional achievements.",
  keywords: ["RK Talks", "Blog", "Personal Blog", "Certifications", "Insights", "Tech Blog", "Portfolio"],
  authors: [{ name: "RK" }],
  openGraph: {
    title: "RK Talks | A Journey Through Thoughts",
    description: "Welcome to RK Talks - An immersive journey through a Japanese landscape of personal blogs, insights, and professional achievements.",
    type: "website",
    siteName: "RK Talks",
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Talks | A Journey Through Thoughts",
    description: "An immersive journey through a Japanese landscape of personal blogs and insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <MobileOptimizations>
          <SmoothScroll>
            <ThemeWrapper>
              {/* Performance monitoring */}
              <PerformanceMonitor />

              {/* Background layers */}
              <LandscapeCanvas />

              {/* Interactive elements (hidden on mobile for performance) */}
              <CustomCursor />
              <InteractiveCreatures />
              <HiddenCollectibles />

              {/* Navigation */}
              <JourneyProgress />

              {/* Main content */}
              <main id="main-content">{children}</main>
            </ThemeWrapper>
          </SmoothScroll>
        </MobileOptimizations>
      </body>
    </html>
  );
}
