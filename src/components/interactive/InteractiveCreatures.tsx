"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./InteractiveCreatures.module.css";

interface Creature {
    id: number;
    type: "firefly" | "butterfly" | "fish";
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    speed: number;
    size: number;
    color: string;
    rotation: number;
}

const CREATURE_COLORS = {
    firefly: ["#FFE066", "#FFD700", "#FFC107"],
    butterfly: ["#FFB7C5", "#DDA0DD", "#FF69B4"],
    fish: ["#FF6347", "#FF8C00", "#FFD700"],
};

export default function InteractiveCreatures() {
    const [creatures, setCreatures] = useState<Creature[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Initialize creatures
    useEffect(() => {
        const initialCreatures: Creature[] = [];

        // Add fireflies
        for (let i = 0; i < 8; i++) {
            initialCreatures.push({
                id: i,
                type: "firefly",
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 0.7,
                targetX: Math.random() * window.innerWidth,
                targetY: Math.random() * window.innerHeight * 0.7,
                speed: 0.5 + Math.random() * 1,
                size: 4 + Math.random() * 4,
                color: CREATURE_COLORS.firefly[Math.floor(Math.random() * 3)],
                rotation: 0,
            });
        }

        // Add butterflies
        for (let i = 8; i < 12; i++) {
            initialCreatures.push({
                id: i,
                type: "butterfly",
                x: Math.random() * window.innerWidth,
                y: 100 + Math.random() * 300,
                targetX: Math.random() * window.innerWidth,
                targetY: 100 + Math.random() * 300,
                speed: 1 + Math.random() * 1.5,
                size: 15 + Math.random() * 10,
                color: CREATURE_COLORS.butterfly[Math.floor(Math.random() * 3)],
                rotation: Math.random() * 360,
            });
        }

        setCreatures(initialCreatures);
    }, []);

    // Track mouse position
    const handleMouseMove = useCallback((e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    // Animate creatures
    useEffect(() => {
        const interval = setInterval(() => {
            setCreatures((prev) =>
                prev.map((creature) => {
                    // Calculate distance to mouse
                    const distToMouse = Math.sqrt(
                        Math.pow(creature.x - mousePos.x, 2) +
                        Math.pow(creature.y - mousePos.y, 2)
                    );

                    let newTargetX = creature.targetX;
                    let newTargetY = creature.targetY;

                    // If mouse is close, move away
                    if (distToMouse < 150) {
                        const angle = Math.atan2(creature.y - mousePos.y, creature.x - mousePos.x);
                        newTargetX = creature.x + Math.cos(angle) * 200;
                        newTargetY = creature.y + Math.sin(angle) * 200;
                    } else if (Math.random() < 0.02) {
                        // Random new target occasionally
                        newTargetX = Math.random() * window.innerWidth;
                        newTargetY = Math.random() * window.innerHeight * 0.6;
                    }

                    // Move towards target
                    const dx = newTargetX - creature.x;
                    const dy = newTargetY - creature.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 5) {
                        return {
                            ...creature,
                            x: creature.x + (dx / dist) * creature.speed,
                            y: creature.y + (dy / dist) * creature.speed,
                            targetX: newTargetX,
                            targetY: newTargetY,
                            rotation: Math.atan2(dy, dx) * (180 / Math.PI),
                        };
                    }

                    return { ...creature, targetX: newTargetX, targetY: newTargetY };
                })
            );
        }, 30);

        return () => clearInterval(interval);
    }, [mousePos]);

    return (
        <div className={styles.creaturesContainer}>
            {creatures.map((creature) => (
                <div
                    key={creature.id}
                    className={`${styles.creature} ${styles[creature.type]}`}
                    style={{
                        left: creature.x,
                        top: creature.y,
                        width: creature.size,
                        height: creature.size,
                        transform: `translate(-50%, -50%) rotate(${creature.rotation}deg)`,
                        backgroundColor: creature.type === "firefly" ? creature.color : undefined,
                    }}
                >
                    {creature.type === "butterfly" && (
                        <>
                            <span
                                className={styles.wing}
                                style={{ backgroundColor: creature.color }}
                            />
                            <span
                                className={styles.wing}
                                style={{ backgroundColor: creature.color }}
                            />
                        </>
                    )}
                    {creature.type === "firefly" && (
                        <span
                            className={styles.glow}
                            style={{ boxShadow: `0 0 ${creature.size * 2}px ${creature.color}` }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
