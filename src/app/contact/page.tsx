"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import successAnimation from "@/animations/success.json";
import {
    FaEnvelope,
    FaTwitter,
    FaMapMarkerAlt,
    FaGithub,
    FaDiscord,
    FaPaperPlane
} from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

const contactInfo = [
    {
        icon: <FaEnvelope />,
        title: "Email",
        value: "ratnakirtiscr@gmail.com",
        link: "mailto:ratnakirtiscr@gmail.com",
    },
    {
        icon: <FaGithub />,
        title: "GitHub",
        value: "@ratna3",
        link: "https://github.com/ratna3",
    },
    {
        icon: <FaTwitter />,
        title: "Twitter/X",
        value: "@RatnaKirti1",
        link: "https://x.com/RatnaKirti1",
    },
    {
        icon: <FaMapMarkerAlt />,
        title: "Location",
        value: "India",
        link: null,
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const [contactInfoRef, contactInfoVisible] = useScrollAnimation<HTMLDivElement>();
    const [formRef, formVisible] = useScrollAnimation<HTMLDivElement>();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
    };

    return (
        <div className={styles.contactPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContainer}>
                    <span className={styles.heroTag}>Get In Touch</span>
                    <h1>
                        Let&apos;s <span className={styles.gradient}>Connect</span>
                    </h1>
                    <p>
                        Have a question, collaboration idea, or just want to say hello?
                        I&apos;d love to hear from you. Drop me a message below!
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* Contact Info */}
                        <div
                            ref={contactInfoRef}
                            className={`${styles.contactInfo} scroll-reveal-left ${contactInfoVisible ? "visible" : ""}`}
                        >
                            <h2>Contact Information</h2>
                            <p className={styles.infoDescription}>
                                Feel free to reach out through any of these channels. I typically
                                respond within 24-48 hours.
                            </p>

                            <div className={styles.infoCards}>
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={info.title}
                                        className={`${styles.infoCard} stagger-${index + 1}`}
                                    >
                                        <span className={styles.infoIcon}>{info.icon}</span>
                                        <div className={styles.infoContent}>
                                            <span className={styles.infoTitle}>{info.title}</span>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    target={info.link.startsWith("http") ? "_blank" : undefined}
                                                    rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className={styles.infoValue}
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <span className={styles.infoValue}>{info.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.socialLinks}>
                                <h3>Follow Me</h3>
                                <div className={styles.socialIcons}>
                                    <a
                                        href="https://github.com/ratna3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="GitHub"
                                    >
                                        <FaGithub />
                                    </a>
                                    <a
                                        href="https://x.com/RatnaKirti1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Twitter/X"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        href="https://discord.gg/zUWK77Yn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Discord"
                                    >
                                        <FaDiscord />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div
                            ref={formRef}
                            className={`${styles.contactForm} scroll-reveal-right ${formVisible ? "visible" : ""}`}
                        >
                            <h2>Send a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="collaboration">Collaboration</option>
                                        <option value="speaking">Speaking Opportunity</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        rows={6}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`btn-primary ${styles.submitBtn}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className={styles.spinner}></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FaPaperPlane />
                                        </>
                                    )}
                                </button>

                                {submitStatus === "success" && (
                                    <div className={styles.successMessage}>
                                        <LottieAnimation
                                            animationData={successAnimation}
                                            loop={false}
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                        <span>Thank you! Your message has been sent successfully.</span>
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className={styles.errorMessage}>
                                        <span>✗</span> Oops! Something went wrong. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
