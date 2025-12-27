"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
    options: ScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

// Hook for multiple elements (useful for lists)
export function useScrollAnimationList(
    count: number,
    options: ScrollAnimationOptions = {}
): [RefObject<(HTMLElement | null)[]>, boolean[]] {
    const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
    const refs = useRef<(HTMLElement | null)[]>([]);
    const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(count).fill(false));

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        refs.current.forEach((element, index) => {
            if (!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                        });
                        if (triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!triggerOnce) {
                        setVisibleItems((prev) => {
                            const newState = [...prev];
                            newState[index] = false;
                            return newState;
                        });
                    }
                },
                { threshold, rootMargin }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, [count, threshold, rootMargin, triggerOnce]);

    return [refs, visibleItems];
}
