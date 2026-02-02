"use client";

import { useEffect, useState } from "react";

interface MobileOptimizationsProps {
    children: React.ReactNode;
}

export default function MobileOptimizations({ children }: MobileOptimizationsProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
        };

        // Detect reduced motion preference
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(motionQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setIsReducedMotion(e.matches);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        motionQuery.addEventListener("change", handleMotionChange);

        // Set CSS custom properties for responsive behavior
        document.documentElement.style.setProperty(
            "--is-mobile",
            isMobile ? "1" : "0"
        );

        // Optimize touch interactions on mobile
        if (isMobile) {
            document.documentElement.classList.add("touch-device");

            // Disable hover effects on touch devices
            document.documentElement.style.setProperty("--hover-enabled", "0");
        } else {
            document.documentElement.classList.remove("touch-device");
            document.documentElement.style.setProperty("--hover-enabled", "1");
        }

        // Performance: Reduce animations on mobile
        if (isMobile || isReducedMotion) {
            document.documentElement.classList.add("reduced-animations");
        } else {
            document.documentElement.classList.remove("reduced-animations");
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            motionQuery.removeEventListener("change", handleMotionChange);
        };
    }, [isMobile, isReducedMotion]);

    return <>{children}</>;
}
