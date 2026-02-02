"use client";

import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

const TIME_ICONS = {
    dawn: "🌅",
    day: "☀️",
    dusk: "🌇",
    night: "🌙",
};

const WEATHER_ICONS = {
    clear: "✨",
    rain: "🌧️",
    snow: "❄️",
    fog: "🌫️",
};

export default function ThemeToggle() {
    const { timeOfDay, weather, isAuto, cycleTimeOfDay, setWeather, toggleAuto } = useTheme();

    const cycleWeather = () => {
        const order: ("clear" | "rain" | "snow" | "fog")[] = ["clear", "rain", "snow", "fog"];
        const currentIndex = order.indexOf(weather);
        setWeather(order[(currentIndex + 1) % 4]);
    };

    return (
        <div className={styles.themeToggle}>
            {/* Time Toggle */}
            <button
                className={styles.toggleBtn}
                onClick={cycleTimeOfDay}
                aria-label={`Current time: ${timeOfDay}. Click to change.`}
                title={`Time: ${timeOfDay}${isAuto ? " (auto)" : ""}`}
            >
                <span className={styles.icon}>{TIME_ICONS[timeOfDay]}</span>
            </button>

            {/* Weather Toggle */}
            <button
                className={styles.toggleBtn}
                onClick={cycleWeather}
                aria-label={`Current weather: ${weather}. Click to change.`}
                title={`Weather: ${weather}`}
            >
                <span className={styles.icon}>{WEATHER_ICONS[weather]}</span>
            </button>

            {/* Auto Toggle */}
            <button
                className={`${styles.toggleBtn} ${styles.autoBtn} ${isAuto ? styles.active : ""}`}
                onClick={toggleAuto}
                aria-label={isAuto ? "Auto mode on" : "Auto mode off"}
                title={isAuto ? "Auto time (on)" : "Manual time"}
            >
                <span className={styles.icon}>{isAuto ? "🔄" : "⏸️"}</span>
            </button>
        </div>
    );
}
