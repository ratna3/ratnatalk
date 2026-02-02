"use client";

import { useEffect, useState } from "react";
import styles from "./JourneyProgress.module.css";

const scenes = [
    { id: "mountains", name: "Summit", icon: "🏔️", page: "/" },
    { id: "forest", name: "Forest", icon: "🌲", page: "/about" },
    { id: "village", name: "Village", icon: "🏘️", page: "/blogs" },
    { id: "temple", name: "Temple", icon: "⛩️", page: "/services" },
    { id: "garden", name: "Garden", icon: "🪨", page: "/certifications" },
    { id: "pond", name: "Pond", icon: "🌙", page: "/contact" },
];

export default function JourneyProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeScene, setActiveScene] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            setScrollProgress(progress);

            // Determine active scene based on scroll position
            const sceneIndex = Math.floor((progress / 100) * scenes.length);
            setActiveScene(Math.min(sceneIndex, scenes.length - 1));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles.journeyProgress}>
            {/* Progress bar */}
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Scene indicators */}
            <div className={styles.sceneIndicators}>
                {scenes.map((scene, index) => (
                    <a
                        key={scene.id}
                        href={scene.page}
                        className={`${styles.sceneIndicator} ${index === activeScene ? styles.active : ""
                            } ${index < activeScene ? styles.visited : ""}`}
                        title={scene.name}
                    >
                        <span className={styles.sceneIcon}>{scene.icon}</span>
                        <span className={styles.sceneName}>{scene.name}</span>
                    </a>
                ))}
            </div>

            {/* Dragon indicator */}
            <div
                className={styles.dragonIndicator}
                style={{ left: `${scrollProgress}%` }}
            >
                🐉
            </div>
        </div>
    );
}
