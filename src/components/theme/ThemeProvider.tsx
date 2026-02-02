"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type TimeOfDay = "dawn" | "day" | "dusk" | "night";
type Season = "spring" | "summer" | "autumn" | "winter";
type Weather = "clear" | "rain" | "snow" | "fog";

interface ThemeState {
    timeOfDay: TimeOfDay;
    season: Season;
    weather: Weather;
    isAuto: boolean;
    setTimeOfDay: (time: TimeOfDay) => void;
    setSeason: (season: Season) => void;
    setWeather: (weather: Weather) => void;
    toggleAuto: () => void;
    cycleTimeOfDay: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}

function getAutoTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return "dawn";
    if (hour >= 8 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "dusk";
    return "night";
}

function getAutoSeason(): Season {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
    const [season, setSeason] = useState<Season>("spring");
    const [weather, setWeather] = useState<Weather>("clear");
    const [isAuto, setIsAuto] = useState(true);

    // Auto-detect time and season on mount
    useEffect(() => {
        if (isAuto) {
            setTimeOfDay(getAutoTimeOfDay());
            setSeason(getAutoSeason());
        }

        // Update time every minute when auto
        const interval = setInterval(() => {
            if (isAuto) {
                setTimeOfDay(getAutoTimeOfDay());
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [isAuto]);

    // Apply CSS variables based on theme
    useEffect(() => {
        const root = document.documentElement;

        // Time-based colors
        const timeColors = {
            dawn: {
                sky: "linear-gradient(180deg, #2C1445 0%, #FF8C42 50%, #FFD8A8 100%)",
                ambient: "rgba(255, 140, 66, 0.15)",
                overlay: "rgba(255, 216, 168, 0.1)",
            },
            day: {
                sky: "linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFFBF0 100%)",
                ambient: "rgba(255, 251, 240, 0.1)",
                overlay: "rgba(135, 206, 235, 0.05)",
            },
            dusk: {
                sky: "linear-gradient(180deg, #1A1A2E 0%, #FF6B6B 40%, #FFD93D 100%)",
                ambient: "rgba(255, 107, 107, 0.2)",
                overlay: "rgba(255, 217, 61, 0.1)",
            },
            night: {
                sky: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 50%, #415A77 100%)",
                ambient: "rgba(65, 90, 119, 0.3)",
                overlay: "rgba(13, 27, 42, 0.4)",
            },
        };

        const colors = timeColors[timeOfDay];
        root.style.setProperty("--sky-gradient", colors.sky);
        root.style.setProperty("--ambient-color", colors.ambient);
        root.style.setProperty("--time-overlay", colors.overlay);
        root.dataset.timeOfDay = timeOfDay;
        root.dataset.season = season;
        root.dataset.weather = weather;
    }, [timeOfDay, season, weather]);

    const toggleAuto = () => setIsAuto((prev) => !prev);

    const cycleTimeOfDay = () => {
        setIsAuto(false);
        const order: TimeOfDay[] = ["dawn", "day", "dusk", "night"];
        const currentIndex = order.indexOf(timeOfDay);
        setTimeOfDay(order[(currentIndex + 1) % 4]);
    };

    return (
        <ThemeContext.Provider
            value={{
                timeOfDay,
                season,
                weather,
                isAuto,
                setTimeOfDay,
                setSeason,
                setWeather,
                toggleAuto,
                cycleTimeOfDay,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
