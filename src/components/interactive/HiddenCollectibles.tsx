"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

// Generate unique session ID
function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export default function HiddenCollectibles() {
    const [collectibles, setCollectibles] = useState<Collectible[]>(COLLECTIBLES);
    const [showNotification, setShowNotification] = useState(false);
    const [lastCollected, setLastCollected] = useState<Collectible | null>(null);
    const [totalCollected, setTotalCollected] = useState(0);
    const sessionIdRef = useRef<string>("");

    // Initialize session and cleanup on unmount/refresh
    useEffect(() => {
        // Generate new session ID on each page load (reset on refresh)
        sessionIdRef.current = generateSessionId();

        // Cleanup function to clear session data when page unloads
        const cleanup = async () => {
            if (sessionIdRef.current) {
                // Use sendBeacon for reliable cleanup on page unload
                navigator.sendBeacon?.(
                    `/api/collectibles?sessionId=${sessionIdRef.current}`,
                    JSON.stringify({ _method: "DELETE" })
                );
            }
        };

        // Handle page unload
        window.addEventListener("beforeunload", cleanup);

        return () => {
            window.removeEventListener("beforeunload", cleanup);
            // Also cleanup on component unmount
            if (sessionIdRef.current) {
                fetch(`/api/collectibles?sessionId=${sessionIdRef.current}`, {
                    method: "DELETE",
                }).catch(() => { });
            }
        };
    }, []);

    const handleCollect = useCallback(async (collectible: Collectible) => {
        if (collectible.collected) return;

        // Update state immediately for responsive UI
        setCollectibles((prev) =>
            prev.map((c) =>
                c.id === collectible.id ? { ...c, collected: true } : c
            )
        );

        // Store in database
        try {
            await fetch("/api/collectibles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: sessionIdRef.current,
                    collectibleId: collectible.id,
                }),
            });
        } catch (error) {
            console.error("Failed to store collectible:", error);
        }

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
