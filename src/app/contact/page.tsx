"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import successAnimation from "@/animations/success.json";
import {
    FaEnvelope,
    FaLinkedin,
    FaTwitter,
    FaMapMarkerAlt,
    FaGithub,
    FaYoutube,
    FaPaperPlane
} from "react-icons/fa";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

const contactInfo = [
    {
        icon: <FaEnvelope />,
        title: "Email",
        value: "hello@rktalks.com",
        link: "mailto:hello@rktalks.com",
    },
    {
        icon: <FaLinkedin />,
        title: "LinkedIn",
        value: "linkedin.com/in/rk",
        link: "https://linkedin.com/in/rk",
    },
    {
        icon: <FaTwitter />,
        title: "Twitter",
        value: "@rk_talks",
        link: "https://twitter.com/rk_talks",
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
                        <div className={styles.contactInfo}>
                            <h2>Contact Information</h2>
                            <p className={styles.infoDescription}>
                                Feel free to reach out through any of these channels. I typically
                                respond within 24-48 hours.
                            </p>

                            <div className={styles.infoCards}>
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={info.title}
                                        className={styles.infoCard}
                                        style={{ animationDelay: `${index * 100}ms` }}
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
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="GitHub"
                                    >
                                        <FaGithub />
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Twitter"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="YouTube"
                                    >
                                        <FaYoutube />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.contactForm}>
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
