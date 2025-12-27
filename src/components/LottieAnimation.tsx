"use client";

import Lottie from "lottie-react";

interface LottieAnimationProps {
    animationData: object;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
}

const LottieAnimation = ({
    animationData,
    className = "",
    loop = true,
    autoplay = true,
    style = {},
}: LottieAnimationProps) => {
    return (
        <Lottie
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            className={className}
            style={style}
        />
    );
};

export default LottieAnimation;
