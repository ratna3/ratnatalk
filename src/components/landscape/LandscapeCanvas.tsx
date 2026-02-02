"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LandscapeCanvas.module.css";

// Scene images
import mountainSky from "@/assets/scenes/mountains/sky.png";
import mountainDistant from "@/assets/scenes/mountains/distant.png";
import mountainMain from "@/assets/scenes/mountains/main.png";
import forestMain from "@/assets/scenes/forest/main.png";
import templeMain from "@/assets/scenes/temple/main.png";
import gardenMain from "@/assets/scenes/garden/main.png";
import villageMain from "@/assets/scenes/village/main.png";
import pondMain from "@/assets/scenes/pond/main.png";
import goldenDragon from "@/assets/dragon/dragon.png";

export default function LandscapeCanvas() {
    const [scrollY, setScrollY] = useState(0);
    const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day");

    useEffect(() => {
        // Determine time of day based on user's local time
        const hour = new Date().getHours();
        setTimeOfDay(hour >= 6 && hour < 18 ? "day" : "night");

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate parallax offsets
    const parallaxOffset = (speed: number) => {
        return scrollY * speed * -1;
    };

    return (
        <div className={`${styles.landscapeCanvas} ${styles[timeOfDay]}`}>
            {/* Sky Layer - Slowest */}
            <div
                className={`${styles.layer} ${styles.skyLayer}`}
                style={{ transform: `translateY(${parallaxOffset(0.1)}px)` }}
            >
                <Image
                    src={mountainSky}
                    alt="Sky"
                    fill
                    priority
                    className={styles.sceneImage}
                />
            </div>

            {/* Distant Mountains Layer */}
            <div
                className={`${styles.layer} ${styles.distantLayer}`}
                style={{ transform: `translateY(${parallaxOffset(0.2)}px)` }}
            >
                <Image
                    src={mountainDistant}
                    alt="Distant Mountains"
                    fill
                    className={styles.sceneImage}
                />
            </div>

            {/* Main Mountains Layer */}
            <div
                className={`${styles.layer} ${styles.mainLayer}`}
                style={{ transform: `translateY(${parallaxOffset(0.3)}px)` }}
            >
                <Image
                    src={mountainMain}
                    alt="Mountains"
                    fill
                    className={styles.sceneImage}
                />
            </div>

            {/* Golden Dragon */}
            <div
                className={styles.dragonLayer}
                style={{
                    transform: `translateY(${parallaxOffset(0.15)}px) translateX(${Math.sin(scrollY * 0.01) * 50
                        }px)`,
                }}
            >
                <Image
                    src={goldenDragon}
                    alt="Golden Dragon"
                    width={300}
                    height={300}
                    className={styles.dragon}
                />
            </div>

            {/* Particles - Cherry Blossoms */}
            <div className={styles.particlesLayer}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.petal}
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className={styles.gradientOverlay} />
        </div>
    );
}
