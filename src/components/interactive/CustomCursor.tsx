"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./CustomCursor.module.css";

interface TrailPoint {
    id: number;
    x: number;
    y: number;
    opacity: number;
}

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);

        // Add trail point
        const newPoint: TrailPoint = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
        };

        setTrail((prev) => [...prev.slice(-8), newPoint]);

        // Check if hovering over clickable element
        const target = e.target as HTMLElement;
        const isClickable =
            target.tagName === "A" ||
            target.tagName === "BUTTON" ||
            target.closest("a") ||
            target.closest("button") ||
            target.style.cursor === "pointer" ||
            window.getComputedStyle(target).cursor === "pointer";

        setIsPointer(isClickable);
    }, []);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);
    const handleMouseLeave = useCallback(() => setIsVisible(false), []);
    const handleMouseEnter = useCallback(() => setIsVisible(true), []);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = "none";

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        // Fade out trail points
        const interval = setInterval(() => {
            setTrail((prev) =>
                prev
                    .map((point) => ({ ...point, opacity: point.opacity - 0.15 }))
                    .filter((point) => point.opacity > 0)
            );
        }, 50);

        return () => {
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            clearInterval(interval);
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <>
            {/* Ink trail */}
            <div className={styles.trailContainer}>
                {trail.map((point) => (
                    <div
                        key={point.id}
                        className={styles.trailPoint}
                        style={{
                            left: point.x,
                            top: point.y,
                            opacity: point.opacity * 0.6,
                            transform: `translate(-50%, -50%) scale(${point.opacity})`,
                        }}
                    />
                ))}
            </div>

            {/* Main cursor */}
            <div
                className={`${styles.cursor} ${isVisible ? styles.visible : ""} ${isPointer ? styles.pointer : ""
                    } ${isClicking ? styles.clicking : ""}`}
                style={{
                    left: position.x,
                    top: position.y,
                }}
            >
                <div className={styles.cursorInner}>
                    <span className={styles.brushTip}>筆</span>
                </div>
            </div>

            {/* Outer ring */}
            <div
                className={`${styles.cursorRing} ${isVisible ? styles.visible : ""} ${isPointer ? styles.pointer : ""
                    }`}
                style={{
                    left: position.x,
                    top: position.y,
                }}
            />
        </>
    );
}
