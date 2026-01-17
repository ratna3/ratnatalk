"use client";

import dynamic from "next/dynamic";
import styles from "./ScrollIndicator.module.css";
import scrollAnimation from "@/animations/scroll.json";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

interface ScrollIndicatorProps {
    className?: string;
}

export default function ScrollIndicator({ className }: ScrollIndicatorProps) {
    return (
        <div className={`${styles.scrollIndicator} ${className || ""}`}>
            <LottieAnimation
                animationData={scrollAnimation}
                style={{ width: "50px", height: "80px" }}
            />
            <span>Scroll to explore</span>
        </div>
    );
}
