"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./FullscreenGallery.module.css";

interface FullscreenGalleryProps {
    images: string[];
    currentIndex: number;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function FullscreenGallery({
    images,
    currentIndex,
    title,
    isOpen,
    onClose,
    onNavigate,
}: FullscreenGalleryProps) {
    const handlePrev = useCallback(() => {
        onNavigate((currentIndex - 1 + images.length) % images.length);
    }, [currentIndex, images.length, onNavigate]);

    const handleNext = useCallback(() => {
        onNavigate((currentIndex + 1) % images.length);
    }, [currentIndex, images.length, onNavigate]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    handlePrev();
                    break;
                case "ArrowRight":
                    handleNext();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose, handlePrev, handleNext]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.galleryContainer} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <h3 className={styles.title}>{title}</h3>
                        <span className={styles.counter}>
                            {currentIndex + 1} of {images.length}
                        </span>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close gallery">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Main Image */}
                <div className={styles.imageContainer}>
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                className={`${styles.navButton} ${styles.prevButton}`}
                                onClick={handlePrev}
                                aria-label="Previous image"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="15,18 9,12 15,6" />
                                </svg>
                            </button>
                            <button
                                className={`${styles.navButton} ${styles.nextButton}`}
                                onClick={handleNext}
                                aria-label="Next image"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9,18 15,12 9,6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <div className={styles.imageWrapper}>
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} - Photo ${currentIndex + 1}`}
                            fill
                            sizes="90vw"
                            className={styles.image}
                            priority
                        />
                    </div>
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                    <div className={styles.thumbnailStrip}>
                        {images.map((image, index) => (
                            <button
                                key={image}
                                className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ""
                                    }`}
                                onClick={() => onNavigate(index)}
                                aria-label={`View photo ${index + 1}`}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    sizes="80px"
                                    className={styles.thumbnailImage}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
