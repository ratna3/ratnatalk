"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./LiquidBackground.module.css";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
}

const LiquidBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const pointsRef = useRef<Point[]>([]);
    const animationRef = useRef<number>();
    const lastMouseRef = useRef({ x: 0, y: 0 });

    const createRipplePoint = useCallback((x: number, y: number) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 60 + Math.random() * 40,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - lastMouseRef.current.x;
            const dy = e.clientY - lastMouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Create ripple points based on movement speed
            if (distance > 5) {
                const numPoints = Math.min(Math.floor(distance / 10), 3);
                for (let i = 0; i < numPoints; i++) {
                    if (pointsRef.current.length < 100) {
                        pointsRef.current.push(createRipplePoint(e.clientX, e.clientY));
                    }
                }
            }

            lastMouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                mouseRef.current = { x: touch.clientX, y: touch.clientY };

                if (pointsRef.current.length < 50) {
                    pointsRef.current.push(createRipplePoint(touch.clientX, touch.clientY));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw main cursor glow
            const gradient = ctx.createRadialGradient(
                mouseRef.current.x,
                mouseRef.current.y,
                0,
                mouseRef.current.x,
                mouseRef.current.y,
                300
            );
            gradient.addColorStop(0, "rgba(37, 99, 235, 0.15)");
            gradient.addColorStop(0.3, "rgba(124, 58, 237, 0.08)");
            gradient.addColorStop(0.6, "rgba(219, 112, 147, 0.04)");
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw ripple points
            pointsRef.current = pointsRef.current.filter((point) => {
                point.x += point.vx;
                point.y += point.vy;
                point.vx *= 0.98;
                point.vy *= 0.98;
                point.life++;

                const progress = point.life / point.maxLife;
                const alpha = 1 - progress;
                const size = 4 + progress * 20;

                const pointGradient = ctx.createRadialGradient(
                    point.x,
                    point.y,
                    0,
                    point.x,
                    point.y,
                    size
                );
                pointGradient.addColorStop(0, `rgba(124, 58, 237, ${alpha * 0.5})`);
                pointGradient.addColorStop(0.5, `rgba(37, 99, 235, ${alpha * 0.3})`);
                pointGradient.addColorStop(1, "transparent");

                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = pointGradient;
                ctx.fill();

                return point.life < point.maxLife;
            });

            // Draw connecting lines between nearby points
            ctx.strokeStyle = "rgba(124, 58, 237, 0.1)";
            ctx.lineWidth = 1;
            for (let i = 0; i < pointsRef.current.length; i++) {
                for (let j = i + 1; j < pointsRef.current.length; j++) {
                    const p1 = pointsRef.current[i];
                    const p2 = pointsRef.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const alpha = (1 - distance / 100) * 0.3;
                        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [createRipplePoint]);

    return (
        <div ref={containerRef} className={styles.liquidBackground}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {/* Animated gradient blobs */}
            <div className={styles.blobContainer}>
                <div className={`${styles.blob} ${styles.blob1}`} />
                <div className={`${styles.blob} ${styles.blob2}`} />
                <div className={`${styles.blob} ${styles.blob3}`} />
                <div className={`${styles.blob} ${styles.blob4}`} />
            </div>

            {/* Iridescent shimmer overlay */}
            <div className={styles.shimmerOverlay} />
        </div>
    );
};

export default LiquidBackground;
