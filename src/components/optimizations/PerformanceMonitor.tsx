"use client";

import { useEffect, useRef } from "react";

export default function PerformanceMonitor() {
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());

    useEffect(() => {
        let animationId: number;
        let lowFpsCount = 0;

        const checkPerformance = () => {
            frameCountRef.current++;
            const now = performance.now();
            const delta = now - lastTimeRef.current;

            // Check FPS every second
            if (delta >= 1000) {
                const fps = (frameCountRef.current * 1000) / delta;
                frameCountRef.current = 0;
                lastTimeRef.current = now;

                // If FPS drops below 30, reduce effects
                if (fps < 30) {
                    lowFpsCount++;

                    // After 3 consecutive low FPS readings, reduce animations
                    if (lowFpsCount >= 3) {
                        document.documentElement.classList.add("low-performance");
                        console.log("Performance mode: Reduced animations enabled");
                    }
                } else {
                    lowFpsCount = Math.max(0, lowFpsCount - 1);
                }
            }

            animationId = requestAnimationFrame(checkPerformance);
        };

        // Start monitoring after a short delay
        const timeout = setTimeout(() => {
            animationId = requestAnimationFrame(checkPerformance);
        }, 2000);

        return () => {
            clearTimeout(timeout);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return null;
}
