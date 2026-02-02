"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./LandscapeCanvas.module.css";

// Single cohesive landscape image
import landscapeImage from "@/assets/scenes/mountains/landscape.png";

export default function LandscapeCanvas() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            setMousePos({ x, y });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Parallax offset based on scroll
    const parallaxY = scrollY * 0.3;

    return (
        <div ref={canvasRef} className={styles.landscapeCanvas}>
            {/* Main Background Layer with subtle parallax */}
            <div
                className={styles.backgroundLayer}
                style={{
                    transform: `translateY(${-parallaxY}px) translateX(${mousePos.x * 0.3}px)`,
                }}
            >
                <Image
                    src={landscapeImage}
                    alt="Japanese Mountain Landscape"
                    fill
                    priority
                    quality={100}
                    className={styles.landscapeImage}
                />
            </div>

            {/* Atmospheric mist overlay */}
            <div className={styles.mistOverlay} />

            {/* Subtle floating particles - like dust in sunlight */}
            <div className={styles.particlesLayer}>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.dustParticle}
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                            opacity: 0.3 + Math.random() * 0.4,
                        }}
                    />
                ))}
            </div>

            {/* Bottom gradient fade to content */}
            <div className={styles.bottomFade} />

            {/* Vignette effect for depth */}
            <div className={styles.vignette} />
        </div>
    );
}
