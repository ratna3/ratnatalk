"use client";

import { useEffect, useState } from "react";
import styles from "./WeatherEffects.module.css";

interface WeatherEffectsProps {
    weather: "clear" | "rain" | "snow" | "fog";
}

interface RainDrop {
    id: number;
    x: number;
    delay: number;
    duration: number;
}

interface SnowFlake {
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
    sway: number;
}

export default function WeatherEffects({ weather }: WeatherEffectsProps) {
    const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
    const [snowFlakes, setSnowFlakes] = useState<SnowFlake[]>([]);

    // Initialize rain drops
    useEffect(() => {
        if (weather === "rain") {
            const drops: RainDrop[] = [];
            for (let i = 0; i < 100; i++) {
                drops.push({
                    id: i,
                    x: Math.random() * 100,
                    delay: Math.random() * 2,
                    duration: 0.5 + Math.random() * 0.3,
                });
            }
            setRainDrops(drops);
        } else {
            setRainDrops([]);
        }
    }, [weather]);

    // Initialize snow flakes
    useEffect(() => {
        if (weather === "snow") {
            const flakes: SnowFlake[] = [];
            for (let i = 0; i < 60; i++) {
                flakes.push({
                    id: i,
                    x: Math.random() * 100,
                    size: 3 + Math.random() * 6,
                    delay: Math.random() * 5,
                    duration: 5 + Math.random() * 5,
                    sway: 20 + Math.random() * 40,
                });
            }
            setSnowFlakes(flakes);
        } else {
            setSnowFlakes([]);
        }
    }, [weather]);

    if (weather === "clear") return null;

    return (
        <div className={styles.weatherContainer}>
            {/* Rain */}
            {weather === "rain" && (
                <div className={styles.rainLayer}>
                    {rainDrops.map((drop) => (
                        <div
                            key={drop.id}
                            className={styles.rainDrop}
                            style={{
                                left: `${drop.x}%`,
                                animationDelay: `${drop.delay}s`,
                                animationDuration: `${drop.duration}s`,
                            }}
                        />
                    ))}
                    <div className={styles.rainOverlay} />
                </div>
            )}

            {/* Snow */}
            {weather === "snow" && (
                <div className={styles.snowLayer}>
                    {snowFlakes.map((flake) => (
                        <div
                            key={flake.id}
                            className={styles.snowFlake}
                            style={{
                                left: `${flake.x}%`,
                                width: flake.size,
                                height: flake.size,
                                animationDelay: `${flake.delay}s`,
                                animationDuration: `${flake.duration}s`,
                                ["--sway" as string]: `${flake.sway}px`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Fog */}
            {weather === "fog" && (
                <div className={styles.fogLayer}>
                    <div className={`${styles.fogBank} ${styles.fogBank1}`} />
                    <div className={`${styles.fogBank} ${styles.fogBank2}`} />
                    <div className={`${styles.fogBank} ${styles.fogBank3}`} />
                </div>
            )}
        </div>
    );
}
