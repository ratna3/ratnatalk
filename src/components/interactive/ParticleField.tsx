"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ParticleField.module.css";

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    type: "petal" | "leaf" | "dust" | "spark";
    rotation: number;
    rotationSpeed: number;
}

interface ParticleFieldProps {
    type?: "petal" | "leaf" | "dust" | "spark";
    count?: number;
    speed?: number;
}

export default function ParticleField({
    type = "petal",
    count = 25,
    speed = 1,
}: ParticleFieldProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);

    // Initialize particles
    useEffect(() => {
        const newParticles: Particle[] = [];
        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < count; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2 * speed,
                vy: (0.5 + Math.random() * 1) * speed,
                size: type === "dust" ? 2 + Math.random() * 3 : 8 + Math.random() * 12,
                opacity: 0.3 + Math.random() * 0.5,
                type,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 4,
            });
        }

        setParticles(newParticles);
    }, [count, speed, type]);

    // Animate particles
    useEffect(() => {
        let animationId: number;

        const animate = () => {
            setParticles((prev) =>
                prev.map((p) => {
                    let newX = p.x + p.vx;
                    let newY = p.y + p.vy;
                    let newOpacity = p.opacity;
                    const newRotation = p.rotation + p.rotationSpeed;

                    // Wind effect
                    const windX = Math.sin(Date.now() * 0.001 + p.id) * 0.5;
                    newX += windX;

                    // Reset if out of bounds
                    if (newY > window.innerHeight + 50) {
                        newY = -50;
                        newX = Math.random() * window.innerWidth;
                        newOpacity = 0.3 + Math.random() * 0.5;
                    }
                    if (newX < -50) newX = window.innerWidth + 50;
                    if (newX > window.innerWidth + 50) newX = -50;

                    return {
                        ...p,
                        x: newX,
                        y: newY,
                        opacity: newOpacity,
                        rotation: newRotation,
                    };
                })
            );

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const getParticleClass = (particleType: string) => {
        switch (particleType) {
            case "petal":
                return styles.petal;
            case "leaf":
                return styles.leaf;
            case "dust":
                return styles.dust;
            case "spark":
                return styles.spark;
            default:
                return styles.petal;
        }
    };

    return (
        <div ref={containerRef} className={styles.particleField}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={`${styles.particle} ${getParticleClass(p.type)}`}
                    style={{
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        transform: `rotate(${p.rotation}deg)`,
                    }}
                />
            ))}
        </div>
    );
}
