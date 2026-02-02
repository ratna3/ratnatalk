"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./HiddenCollectibles.module.css";

interface Collectible {
    id: string;
    type: "coin" | "scroll" | "lantern" | "fan";
    x: number;
    y: number;
    collected: boolean;
    hint: string;
}

const COLLECTIBLES: Collectible[] = [
    { id: "coin-1", type: "coin", x: 15, y: 30, collected: false, hint: "Near the mountain peak" },
    { id: "coin-2", type: "coin", x: 85, y: 45, collected: false, hint: "Hidden in the forest" },
    { id: "scroll-1", type: "scroll", x: 50, y: 70, collected: false, hint: "Ancient wisdom awaits" },
    { id: "lantern-1", type: "lantern", x: 25, y: 55, collected: false, hint: "Light the way" },
    { id: "fan-1", type: "fan", x: 70, y: 25, collected: false, hint: "Cool mountain breeze" },
];

const EMOJIS = {
    coin: "🪙",
    scroll: "📜",
    lantern: "🏮",
    fan: "🪭",
};

export default function HiddenCollectibles() {
    const [collectibles, setCollectibles] = useState<Collectible[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [lastCollected, setLastCollected] = useState<Collectible | null>(null);
    const [totalCollected, setTotalCollected] = useState(0);

    // Load saved progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("rk-collectibles");
        if (saved) {
            const savedIds = JSON.parse(saved);
            setCollectibles(
                COLLECTIBLES.map((c) => ({
                    ...c,
                    collected: savedIds.includes(c.id),
                }))
            );
            setTotalCollected(savedIds.length);
        } else {
            setCollectibles(COLLECTIBLES);
        }
    }, []);

    const handleCollect = useCallback((collectible: Collectible) => {
        if (collectible.collected) return;

        // Update state
        setCollectibles((prev) =>
            prev.map((c) =>
                c.id === collectible.id ? { ...c, collected: true } : c
            )
        );

        // Save to localStorage
        const saved = localStorage.getItem("rk-collectibles");
        const savedIds = saved ? JSON.parse(saved) : [];
        savedIds.push(collectible.id);
        localStorage.setItem("rk-collectibles", JSON.stringify(savedIds));

        // Show notification
        setLastCollected(collectible);
        setTotalCollected((prev) => prev + 1);
        setShowNotification(true);

        setTimeout(() => setShowNotification(false), 3000);
    }, []);

    return (
        <>
            {/* Hidden collectibles */}
            <div className={styles.collectiblesContainer}>
                {collectibles.map((c) => (
                    <button
                        key={c.id}
                        className={`${styles.collectible} ${c.collected ? styles.collected : ""}`}
                        style={{ left: `${c.x}%`, top: `${c.y}%` }}
                        onClick={() => handleCollect(c)}
                        aria-label={`Collect ${c.type}`}
                        title={c.hint}
                    >
                        <span className={styles.icon}>{EMOJIS[c.type]}</span>
                        <span className={styles.glow} />
                    </button>
                ))}
            </div>

            {/* Collection notification */}
            <div className={`${styles.notification} ${showNotification ? styles.show : ""}`}>
                <span className={styles.notifIcon}>
                    {lastCollected && EMOJIS[lastCollected.type]}
                </span>
                <div className={styles.notifText}>
                    <strong>Collected!</strong>
                    <span>{totalCollected} / {COLLECTIBLES.length} treasures found</span>
                </div>
            </div>

            {/* Progress indicator */}
            <div className={styles.progressIndicator}>
                <span className={styles.progressIcon}>🎌</span>
                <span className={styles.progressText}>
                    {totalCollected}/{COLLECTIBLES.length}
                </span>
            </div>
        </>
    );
}
