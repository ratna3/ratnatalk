"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AudioController.module.css";

interface AudioControllerProps {
    weather?: "clear" | "rain" | "snow" | "fog";
}

// Local ambient music files for each weather type (in public/audio folder)
// These files loop infinitely for a peaceful ambient experience
const AMBIENT_MUSIC: Record<string, string> = {
    clear: "/audio/sunny.mp3",  // Peaceful sunny day sounds
    rain: "/audio/rain.mp3",    // Gentle rain ambiance
    snow: "/audio/snow.mp3",    // Soft winter sounds
    fog: "/audio/fog.mp3",      // Mysterious calm ambient
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
