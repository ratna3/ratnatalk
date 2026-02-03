"use client";

import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

const WEATHER_ICONS = {
    clear: "☀️",
    rain: "🌧️",
    snow: "❄️",
    fog: "🌫️",
};

const WEATHER_LABELS = {
    clear: "Clear & Sunny",
    rain: "Rainy",
    snow: "Snowy",
    fog: "Foggy",
};

export default function ThemeToggle() {
    const { weather, setWeather } = useTheme();

    const cycleWeather = () => {
        const order: ("clear" | "rain" | "snow" | "fog")[] = ["clear", "rain", "snow", "fog"];
        const currentIndex = order.indexOf(weather);
        setWeather(order[(currentIndex + 1) % 4]);
    };

    return (
        <div className={styles.themeToggle}>
            {/* Weather Toggle - Single Button */}
            <button
                className={styles.toggleBtn}
                onClick={cycleWeather}
                aria-label={`Current weather: ${WEATHER_LABELS[weather]}. Click to change.`}
                title={`Weather: ${WEATHER_LABELS[weather]}`}
            >
                <span className={styles.icon}>{WEATHER_ICONS[weather]}</span>
            </button>
        </div>
    );
}
