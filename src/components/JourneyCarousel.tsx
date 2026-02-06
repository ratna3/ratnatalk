"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./JourneyCarousel.module.css";

interface JourneyCarouselProps {
    images: string[];
    title: string;
    onImageClick: (index: number) => void;
}

export default function JourneyCarousel({ images, title, onImageClick }: JourneyCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<"next" | "prev">("next");

    const goToSlide = useCallback((index: number) => {
        if (isAnimating || index === currentIndex) return;
        setDirection(index > currentIndex ? "next" : "prev");
        setIsAnimating(true);
        setCurrentIndex(index);
    }, [isAnimating, currentIndex]);

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setDirection("next");
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [isAnimating, images.length]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setDirection("prev");
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [isAnimating, images.length]);

    // Auto-rotate carousel
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [images.length, nextSlide]);

    // Reset animation state
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    if (images.length === 0) return null;

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={prevSlide}
                            aria-label="Previous image"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15,18 9,12 15,6" />
                            </svg>
                        </button>
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={nextSlide}
                            aria-label="Next image"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9,18 15,12 9,6" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Slides */}
                <div className={styles.slidesContainer}>
                    {images.map((image, index) => (
                        <div
                            key={image}
                            className={`${styles.slide} ${index === currentIndex ? styles.active : ""
                                } ${isAnimating && index === currentIndex
                                    ? direction === "next"
                                        ? styles.fadeInRight
                                        : styles.fadeInLeft
                                    : ""
                                }`}
                            onClick={() => onImageClick(index)}
                        >
                            <Image
                                src={image}
                                alt={`${title} - Photo ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                className={styles.image}
                                priority={index === 0}
                            />
                            <div className={styles.imageOverlay}>
                                <span className={styles.expandIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Counter */}
                <div className={styles.counter}>
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Navigation Dots */}
            {images.length > 1 && (
                <div className={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
