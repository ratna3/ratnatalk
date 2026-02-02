"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./AchievementSystem.module.css";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: string;
}

const ACHIEVEMENTS: Achievement[] = [
    {
        id: "first-visit",
        title: "First Steps",
        description: "Welcome to the journey!",
        icon: "👋",
        unlocked: false,
    },
    {
        id: "night-owl",
        title: "Night Owl",
        description: "Visit the site after midnight",
        icon: "🦉",
        unlocked: false,
    },
    {
        id: "early-bird",
        title: "Early Bird",
        description: "Visit the site before 6 AM",
        icon: "🐦",
        unlocked: false,
    },
    {
        id: "explorer",
        title: "Explorer",
        description: "Visit all pages",
        icon: "🧭",
        unlocked: false,
    },
    {
        id: "collector",
        title: "Treasure Hunter",
        description: "Collect all hidden treasures",
        icon: "🏆",
        unlocked: false,
    },
    {
        id: "weather-master",
        title: "Weather Master",
        description: "Try all weather effects",
        icon: "🌦️",
        unlocked: false,
    },
    {
        id: "time-traveler",
        title: "Time Traveler",
        description: "Cycle through all times of day",
        icon: "⏰",
        unlocked: false,
    },
    {
        id: "scroll-master",
        title: "Scroll Master",
        description: "Scroll to the bottom of a page",
        icon: "📜",
        unlocked: false,
    },
];

export default function AchievementSystem() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [lastUnlocked, setLastUnlocked] = useState<Achievement | null>(null);
    const [showPanel, setShowPanel] = useState(false);

    // Load saved achievements
    useEffect(() => {
        const saved = localStorage.getItem("rk-achievements");
        if (saved) {
            const savedAchievements = JSON.parse(saved);
            setAchievements(
                ACHIEVEMENTS.map((a) => ({
                    ...a,
                    unlocked: savedAchievements.includes(a.id),
                }))
            );
        } else {
            setAchievements(ACHIEVEMENTS);
        }

        // First visit achievement
        unlockAchievement("first-visit");

        // Time-based achievements
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) unlockAchievement("night-owl");
        if (hour >= 4 && hour < 6) unlockAchievement("early-bird");

        // Scroll achievement
        const handleScroll = () => {
            const scrolled = window.scrollY + window.innerHeight;
            const total = document.documentElement.scrollHeight;
            if (scrolled >= total - 10) {
                unlockAchievement("scroll-master");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const unlockAchievement = useCallback((id: string) => {
        setAchievements((prev) => {
            const achievement = prev.find((a) => a.id === id);
            if (!achievement || achievement.unlocked) return prev;

            // Save to localStorage
            const saved = localStorage.getItem("rk-achievements");
            const savedIds = saved ? JSON.parse(saved) : [];
            if (!savedIds.includes(id)) {
                savedIds.push(id);
                localStorage.setItem("rk-achievements", JSON.stringify(savedIds));
            }

            // Show notification
            setLastUnlocked({ ...achievement, unlocked: true });
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);

            return prev.map((a) =>
                a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a
            );
        });
    }, []);

    // Expose unlockAchievement globally
    useEffect(() => {
        (window as any).unlockAchievement = unlockAchievement;
    }, [unlockAchievement]);

    const unlockedCount = achievements.filter((a) => a.unlocked).length;

    return (
        <>
            {/* Achievement Button */}
            <button
                className={styles.achievementBtn}
                onClick={() => setShowPanel(!showPanel)}
                aria-label="View achievements"
            >
                <span className={styles.btnIcon}>🏅</span>
                <span className={styles.btnCount}>{unlockedCount}/{ACHIEVEMENTS.length}</span>
            </button>

            {/* Achievement Panel */}
            <div className={`${styles.panel} ${showPanel ? styles.open : ""}`}>
                <div className={styles.panelHeader}>
                    <h3>🏅 Achievements</h3>
                    <button className={styles.closeBtn} onClick={() => setShowPanel(false)}>
                        ✕
                    </button>
                </div>
                <div className={styles.panelContent}>
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`${styles.achievementCard} ${achievement.unlocked ? styles.unlocked : ""}`}
                        >
                            <span className={styles.achievementIcon}>{achievement.icon}</span>
                            <div className={styles.achievementInfo}>
                                <strong>{achievement.title}</strong>
                                <span>{achievement.description}</span>
                            </div>
                            {achievement.unlocked && <span className={styles.checkmark}>✓</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Notification */}
            <div className={`${styles.notification} ${showNotification ? styles.show : ""}`}>
                <span className={styles.notifIcon}>{lastUnlocked?.icon}</span>
                <div className={styles.notifText}>
                    <strong>Achievement Unlocked!</strong>
                    <span>{lastUnlocked?.title}</span>
                </div>
            </div>
        </>
    );
}
