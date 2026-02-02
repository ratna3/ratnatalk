"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AudioController.module.css";

interface AudioControllerProps {
    timeOfDay?: "dawn" | "day" | "dusk" | "night";
    weather?: "clear" | "rain" | "snow" | "fog";
}

export default function AudioController({ timeOfDay = "day", weather = "clear" }: AudioControllerProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.3);
    const [isPlaying, setIsPlaying] = useState(false);

    const ambientRef = useRef<HTMLAudioElement | null>(null);
    const weatherRef = useRef<HTMLAudioElement | null>(null);

    // Note: In production, you would add actual audio files
    // For now, using Web Audio API for procedural sounds
    const audioContextRef = useRef<AudioContext | null>(null);
    const nodesRef = useRef<{
        oscillator?: OscillatorNode;
        gain?: GainNode;
        noise?: AudioBufferSourceNode;
    }>({});

    const createWhiteNoise = useCallback((audioContext: AudioContext) => {
        const bufferSize = audioContext.sampleRate * 2;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }, []);

    const startAmbientSound = useCallback(() => {
        if (audioContextRef.current) return;

        try {
            audioContextRef.current = new AudioContext();
            const ctx = audioContextRef.current;

            // Create master gain
            const masterGain = ctx.createGain();
            masterGain.gain.value = volume * 0.2;
            masterGain.connect(ctx.destination);
            nodesRef.current.gain = masterGain;

            // Nature sounds based on time and weather
            if (weather === "rain") {
                // Rain sound (filtered noise)
                const noiseBuffer = createWhiteNoise(ctx);
                const noise = ctx.createBufferSource();
                noise.buffer = noiseBuffer;
                noise.loop = true;

                const filter = ctx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.value = 400;

                const noiseGain = ctx.createGain();
                noiseGain.gain.value = 0.4;

                noise.connect(filter);
                filter.connect(noiseGain);
                noiseGain.connect(masterGain);
                noise.start();
                nodesRef.current.noise = noise;
            } else if (timeOfDay === "night") {
                // Night crickets (subtle oscillator)
                const osc = ctx.createOscillator();
                osc.type = "sine";
                osc.frequency.value = 3500;

                const oscGain = ctx.createGain();
                oscGain.gain.value = 0;

                // Chirp pattern
                const chirp = () => {
                    oscGain.gain.setValueAtTime(0.02, ctx.currentTime);
                    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                };

                setInterval(chirp, 2000 + Math.random() * 3000);

                osc.connect(oscGain);
                oscGain.connect(masterGain);
                osc.start();
                nodesRef.current.oscillator = osc;
            }

            setIsPlaying(true);
        } catch (error) {
            console.log("Audio not supported");
        }
    }, [volume, weather, timeOfDay, createWhiteNoise]);

    const stopAmbientSound = useCallback(() => {
        if (nodesRef.current.oscillator) {
            nodesRef.current.oscillator.stop();
        }
        if (nodesRef.current.noise) {
            nodesRef.current.noise.stop();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        nodesRef.current = {};
        setIsPlaying(false);
    }, []);

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            startAmbientSound();
        } else {
            setIsMuted(true);
            stopAmbientSound();
        }
    };

    // Update volume
    useEffect(() => {
        if (nodesRef.current.gain) {
            nodesRef.current.gain.gain.value = volume * 0.2;
        }
    }, [volume]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopAmbientSound();
        };
    }, [stopAmbientSound]);

    return (
        <div className={styles.audioController}>
            <button
                className={`${styles.audioBtn} ${!isMuted ? styles.active : ""}`}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute ambient sounds" : "Mute ambient sounds"}
                title={isMuted ? "Enable ambient sounds" : "Disable ambient sounds"}
            >
                <span className={styles.icon}>{isMuted ? "🔇" : "🔊"}</span>
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
