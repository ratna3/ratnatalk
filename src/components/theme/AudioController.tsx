"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AudioController.module.css";

interface AudioControllerProps {
    weather?: "clear" | "rain" | "snow" | "fog";
}

// Peaceful ambient music URLs for each weather type
// Using royalty-free ambient sounds from freesound.org or similar sources
const AMBIENT_MUSIC: Record<string, string> = {
    clear: "https://cdn.freesound.org/previews/467/467274_1648170-lq.mp3", // Peaceful birds and nature
    rain: "https://cdn.freesound.org/previews/243/243627_4502871-lq.mp3", // Gentle rain sounds
    snow: "https://cdn.freesound.org/previews/514/514248_11283554-lq.mp3", // Soft wind with peaceful tones
    fog: "https://cdn.freesound.org/previews/564/564490_12574645-lq.mp3", // Mysterious calm ambient
};

export default function AudioController({ weather = "clear" }: AudioControllerProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.4);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Create and manage audio element
    const initAudio = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.loop = true;
            audioRef.current.volume = volume;
        }
        return audioRef.current;
    }, [volume]);

    // Change music based on weather
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || isMuted) return;

        const musicUrl = AMBIENT_MUSIC[weather];
        if (audio.src !== musicUrl) {
            setIsLoading(true);
            audio.src = musicUrl;
            audio.load();
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                    console.log("Audio playback failed - user interaction required");
                });
        }
    }, [weather, isMuted]);

    // Update volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Toggle mute/unmute
    const toggleMute = async () => {
        const audio = initAudio();

        if (isMuted) {
            setIsMuted(false);
            setIsLoading(true);
            audio.src = AMBIENT_MUSIC[weather];
            audio.volume = volume;

            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Audio playback failed");
            }
            setIsLoading(false);
        } else {
            setIsMuted(true);
            audio.pause();
            setIsPlaying(false);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <div className={styles.audioController}>
            <button
                className={`${styles.audioBtn} ${!isMuted ? styles.active : ""} ${isLoading ? styles.loading : ""}`}
                onClick={toggleMute}
                aria-label={isMuted ? "Play peaceful ambient music" : "Pause ambient music"}
                title={isMuted ? "Enable ambient music" : "Disable ambient music"}
                disabled={isLoading}
            >
                <span className={styles.icon}>
                    {isLoading ? "⏳" : isMuted ? "🔇" : "🎵"}
                </span>
            </button>

            {!isMuted && (
                <div className={styles.volumeSlider}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        aria-label="Volume control"
                    />
                </div>
            )}

            {isPlaying && (
                <div className={styles.visualizer}>
                    <span className={styles.bar} style={{ animationDelay: "0s" }} />
                    <span className={styles.bar} style={{ animationDelay: "0.1s" }} />
                    <span className={styles.bar} style={{ animationDelay: "0.2s" }} />
                </div>
            )}
        </div>
    );
}
