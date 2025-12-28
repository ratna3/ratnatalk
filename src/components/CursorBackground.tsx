"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorBackground.module.css";

const CursorBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
        };

        // Smooth animation loop with easing
        const animate = () => {
            // Smooth interpolation (ease towards target)
            const ease = 0.08;
            currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * ease;
            currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * ease;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.cursorBackground}>
            {/* Main glow that follows cursor */}
            <div ref={glowRef} className={styles.cursorGlow}>
                <div className={styles.glowInner} />
                <div className={styles.glowOuter} />
            </div>

            {/* Subtle ambient orbs */}
            <div className={`${styles.ambientOrb} ${styles.orb1}`} />
            <div className={`${styles.ambientOrb} ${styles.orb2}`} />
            <div className={`${styles.ambientOrb} ${styles.orb3}`} />
        </div>
    );
};

export default CursorBackground;
