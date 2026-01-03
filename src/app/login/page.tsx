"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { FaLock, FaEnvelope, FaArrowRight, FaShieldAlt } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }

            router.push("/admin");
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            {/* Animated background */}
            <div className={styles.backgroundEffects}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>
            </div>

            <div className={styles.loginContainer}>
                {/* Left side - Branding */}
                <div className={styles.brandingSide}>
                    <div className={styles.brandingContent}>
                        <div className={styles.logoWrapper}>
                            <FaShieldAlt className={styles.shieldIcon} />
                        </div>
                        <h1>RK Talks</h1>
                        <p className={styles.brandTagline}>Admin Control Center</p>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>✍️</span>
                                <span>Manage Blog Posts</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>📊</span>
                                <span>Real-time Updates</span>
                            </div>
                            <div className={styles.feature}>
                                <span className={styles.featureIcon}>🔒</span>
                                <span>Secure Access</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/" className={styles.backToSite}>
                        ← Back to Website
                    </Link>
                </div>

                {/* Right side - Login Form */}
                <div className={styles.formSide}>
                    <div className={styles.formWrapper}>
                        <div className={styles.formHeader}>
                            <h2>Welcome Back</h2>
                            <p>Sign in to access the admin dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.loginForm}>
                            {error && (
                                <div className={styles.errorAlert}>
                                    <span className={styles.errorIcon}>⚠️</span>
                                    {error}
                                </div>
                            )}

                            <div className={styles.inputGroup}>
                                <label htmlFor="email">Email Address</label>
                                <div className={styles.inputWrapper}>
                                    <FaEnvelope className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="password">Password</label>
                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.inputIcon} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className={styles.loader}></span>
                                ) : (
                                    <>
                                        Sign In
                                        <FaArrowRight className={styles.buttonIcon} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className={styles.securityNote}>
                            <FaLock className={styles.securityIcon} />
                            <span>Protected by secure authentication</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
