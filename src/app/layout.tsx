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
  title: "RK Talks | Ratna Kirti - 10x DevSecOps Engineer",
  description: "Welcome to RK Talks - Portfolio of Ratna Kirti, the Ultimate 10x DevSecOps Engineer with 40+ certifications. Cybersecurity Expert. The Final Boss of Gen Z.",
  keywords: ["RK Talks", "Ratna Kirti", "DevSecOps", "Cybersecurity", "10x Engineer", "Portfolio", "Blog", "Certifications", "Microsoft", "Azure"],
  authors: [{ name: "Ratna Kirti" }],
  metadataBase: new URL("https://rktalks.vercel.app"),
  openGraph: {
    title: "RK Talks | Ratna Kirti - 10x DevSecOps Engineer",
    description: "Portfolio of Ratna Kirti - The Ultimate 10x DevSecOps Engineer with 40+ certifications. Cybersecurity Expert. The Final Boss of Gen Z.",
    type: "website",
    siteName: "RK Talks",
    url: "https://rktalks.vercel.app",
    images: [
      {
        url: "/images/og_banner.png",
        width: 1200,
        height: 630,
        alt: "RK Talks - Ratna Kirti - 10x DevSecOps Engineer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Talks | Ratna Kirti - 10x DevSecOps Engineer",
    description: "The Ultimate 10x DevSecOps Engineer with 40+ certifications. Cybersecurity Expert. The Final Boss of Gen Z.",
    images: ["/images/og_banner.png"],
    creator: "@ratnakirti",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
