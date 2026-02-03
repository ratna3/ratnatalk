"use client";

import { ThemeProvider, useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import WeatherEffects from "./WeatherEffects";
import AchievementSystem from "./AchievementSystem";
import AudioController from "./AudioController";
import { ReactNode } from "react";

function ThemeContent({ children }: { children: ReactNode }) {
    const { weather } = useTheme();

    return (
        <>
            {/* Weather Effects Layer */}
            <WeatherEffects weather={weather} />

            {/* Theme Controls */}
            <ThemeToggle />

            {/* Audio - Peaceful ambient music for each weather */}
            <AudioController weather={weather} />

            {/* Achievements */}
            <AchievementSystem />

            {/* Main Content */}
            {children}
        </>
    );
}

export default function ThemeWrapper({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <ThemeContent>{children}</ThemeContent>
        </ThemeProvider>
    );
}
