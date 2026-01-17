"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "./page.module.css";
import {
    FaBookOpen,
    FaHandshake,
    FaLightbulb,
    FaBullseye,
    FaArrowRight
} from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ScrollIndicator from "@/components/ScrollIndicator";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

const skills = [
    { category: "Software Engineering", items: ["Python", "JavaScript", "TypeScript", "Node.js", "React", "Next.js"] },
    { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "AWS", "Azure", "GitHub Actions", "CI/CD"] },
    { category: "Cybersecurity", items: ["Penetration Testing", "Hack The Box", "Security Audits", "Threat Analysis"] },
    { category: "Tools & Platforms", items: ["Microsoft", "GitHub", "Atlassian", "Adobe Creative Suite", "AI/ML Tools"] },
];

const timeline = [
    {
        year: "2025",
        title: "Founding Member at Lloyd Structure House Inc",
        description: "I am effectively managing and giving advice to the team members and CEO of the company. ",
    },
    {
        year: "2025",
        title: "Team Member at Integrity",
        description: "Where I am effectively managing a dedicated lead system at Integrity, driving significant growth for America's largest insurance agency. ",
    },
    {
        year: "2025",
        title: "40+ Certifications Achieved",
        description: "Mastered Microsoft, GitHub, Atlassian, Docker, DevOps, Adobe, AI, and Cybersecurity.",
    },
    {
        year: "2024",
        title: "Software Developement Intern",
        description: "As a Software Development Intern at BIPS System Limited, I joined a dynamic team of 23 professionals focused on developing cutting-edge Automatic Water Flow Control Systems for Canals and Barrages.",
    },
    {
        year: "2021",
        title: "Founded Deo Exotic Attar & Perfume",
        description: "Deo Exotic Attar and Perfume is a specialized online and offline store that offers premium quality oil-based perfume and attar.",
    },
];

const values = [
    {
        icon: <FaBookOpen />,
        title: "Continuous Learning",
        description: "I believe in the power of lifelong learning and staying curious about new technologies.",
    },
    {
        icon: <FaHandshake />,
        title: "Community Contribution",
        description: "Sharing knowledge through blogs and mentoring to help others grow in their careers.",
    },
    {
        icon: <FaLightbulb />,
        title: "Innovation",
        description: "Always exploring new ways to solve problems and improve existing solutions.",
    },
    {
        icon: <FaBullseye />,
        title: "Excellence",
        description: "Committed to delivering high-quality work and exceeding expectations.",
    },
];

export default function AboutPage() {
    const [storyRef, storyVisible] = useScrollAnimation<HTMLDivElement>();
    const [valuesRef, valuesVisible] = useScrollAnimation<HTMLDivElement>();
    const [timelineRef, timelineVisible] = useScrollAnimation<HTMLDivElement>();
    const [skillsRef, skillsVisible] = useScrollAnimation<HTMLDivElement>();
    const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>();

    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroTag}>About Me</span>
                        <h1>
                            Hi, I&apos;m <span className={styles.gradient}>Ratna Kirti</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            10x DevSecOps Engineer • Cybersecurity Expert • The Final Boss of Gen Z
                        </p>
                        <p className={styles.heroDescription}>
                            I&apos;m not just another developer—I&apos;m the ultimate 10x DevSecOps Engineer.
                            While others write code, I architect bulletproof digital ecosystems. With 40+
                            professional certifications and battle-tested expertise across Software Engineering,
                            DevOps, and Cybersecurity, I deliver what others only promise: secure, scalable,
                            and world-class solutions at 10x the speed.
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNumber}>40+</span>
                                <span className={styles.heroStatLabel}>Certifications</span>
                            </div>
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNumber}>20+</span>
                                <span className={styles.heroStatLabel}>Websites Launched</span>
                            </div>
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNumber}>10+</span>
                                <span className={styles.heroStatLabel}>Software Solutions</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroImageWrapper}>
                        <Image
                            src="/images/myself.jpg"
                            alt="Ratna Kirti - 10x DevSecOps Engineer"
                            width={450}
                            height={450}
                            className={styles.heroImage}
                            priority
                        />
                    </div>
                </div>
                <ScrollIndicator />
            </section>

            {/* Story Section */}
            <section className={styles.storySection}>
                <div className={styles.container}>
                    <div
                        ref={storyRef}
                        className={`${styles.sectionHeader} scroll-reveal ${storyVisible ? "visible" : ""}`}
                    >
                        <span className={styles.sectionTag}>My Story</span>
                        <h2>The Journey So Far</h2>
                        <div className="divider"></div>
                    </div>
                    <div className={`${styles.storyContent} scroll-reveal ${storyVisible ? "visible" : ""}`}>
                        <h3 className={styles.storySubheading}>From the City of Nawabs to the World Stage</h3>
                        <p>
                            In the vibrant heart of Lucknow, Uttar Pradesh, a digital architect was being forged.
                            For me, the world was never just a collection of objects—it was a series of systems
                            waiting to be understood. From early childhood, while others saw a computer as a tool,
                            I saw it as an infinite canvas. Whether it was the intricate puzzle of hardware or the
                            logical elegance of software, technology didn&apos;t just &quot;click&quot;—it felt like a second
                            language I was born to speak.
                        </p>
                        <p>
                            My journey of excellence began at City Montessori School (CMS). Within the halls of the
                            world&apos;s largest school, I learned to navigate complexity at scale. CMS provided the
                            perfect forge for my ambitions, teaching me that true mastery requires both technical
                            prowess and the ability to lead. My dedication was rewarded with a prestigious scholarship
                            to Knox College in Galesburg, Illinois.
                        </p>

                        <h3 className={styles.storySubheading}>The Knox Transformation</h3>
                        <p>
                            Crossing the globe to Knox College marked the transition from a gifted student to a
                            high-level engineer. Here, I didn&apos;t just learn languages; I learned the philosophy of
                            development. I spent my time in Galesburg dissecting the real-world applications of my
                            skills, ensuring that every line of code I wrote served a purpose in the global economy.
                        </p>

                        <h3 className={styles.storySubheading}>The Certified Expert: A Global Endorsement</h3>
                        <p>
                            I didn&apos;t just build a portfolio; I built a fortress of credibility. Through disciplined
                            late-night sessions and rigorous testing, I secured 40+ professional certifications,
                            earning the respect and endorsement of the world&apos;s leading tech giants—from Microsoft,
                            GitHub, and Atlassian to mastering DevOps, Docker, Adobe, AI, and Cybersecurity through
                            Hack The Box.
                        </p>

                        <h3 className={styles.storySubheading}>The Security-First Visionary</h3>
                        <p>
                            What sets me apart is not just the ability to create, but the wisdom to protect. Because
                            of my deep-rooted expertise in cybersecurity, I possess a &quot;hacker&apos;s eye&quot; for software
                            development. I don&apos;t just build applications; I architect secure, resilient digital
                            environments. I understand how malicious users think, allowing me to preemptively close
                            backdoors that others don&apos;t even know exist.
                        </p>

                        <h3 className={styles.storySubheading}>The Ultimate 10x DevSecOps Engineer</h3>
                        <p>
                            In an industry where speed often compromises security, I&apos;ve shattered that paradigm.
                            I operate at 10x velocity—not by cutting corners, but by mastering the entire development
                            lifecycle from conception to deployment to defense. While others specialize in silos,
                            I dominate across the full stack: infrastructure as code, containerized deployments,
                            automated CI/CD pipelines, real-time threat monitoring, and proactive vulnerability
                            management. I don&apos;t just keep up with technology—I stay three steps ahead.
                        </p>
                        <p>
                            Call me the Final Boss of Gen Z. While my generation is often underestimated, I represent
                            what we&apos;re truly capable of: combining native digital fluency with enterprise-grade
                            professionalism. I bring the hunger, the innovation, and the relentless work ethic that
                            transforms organizations. When you work with me, you&apos;re not just getting a developer—
                            you&apos;re unlocking a force multiplier who elevates every project and every team.
                        </p>
                        <p>
                            From the streets of Lucknow to the international arena of Knox College, my story is one
                            of constant evolution. I am no longer just a resident of Uttar Pradesh—I am a global
                            digital craftsman, turning complex problems into secure, elegant, and world-class realities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <div
                        ref={valuesRef}
                        className={`${styles.sectionHeader} scroll-reveal ${valuesVisible ? "visible" : ""}`}
                    >
                        <span className={styles.sectionTag}>Core Values</span>
                        <h2>What Drives Me</h2>
                        <div className="divider"></div>
                    </div>
                    <div className={`${styles.valuesGrid} scroll-reveal-float ${valuesVisible ? "visible" : ""}`}>
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className={`${styles.valueCard} stagger-${index + 1}`}
                            >
                                <span className={styles.valueIcon}>{value.icon}</span>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className={styles.timelineSection}>
                <div className={styles.container}>
                    <div
                        ref={timelineRef}
                        className={`${styles.sectionHeader} scroll-reveal ${timelineVisible ? "visible" : ""}`}
                    >
                        <span className={styles.sectionTag}>Career Path</span>
                        <h2>My Journey</h2>
                        <div className="divider"></div>
                    </div>
                    <div className={`${styles.timeline} scroll-reveal-flip ${timelineVisible ? "visible" : ""}`}>
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.timelineItem} stagger-${index + 1}`}
                            >
                                <div className={styles.timelineYear}>{item.year}</div>
                                <div className={styles.timelineContent}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className={styles.skillsSection}>
                <div className={styles.container}>
                    <div
                        ref={skillsRef}
                        className={`${styles.sectionHeader} scroll-reveal ${skillsVisible ? "visible" : ""}`}
                    >
                        <span className={styles.sectionTag}>Expertise</span>
                        <h2>Skills & Technologies</h2>
                        <div className="divider"></div>
                    </div>
                    <div className={`${styles.skillsGrid} scroll-reveal ${skillsVisible ? "visible" : ""}`}>
                        {skills.map((skillGroup, index) => (
                            <div
                                key={skillGroup.category}
                                className={`${styles.skillCard} stagger-${index + 1}`}
                            >
                                <h3>{skillGroup.category}</h3>
                                <div className={styles.skillTags}>
                                    {skillGroup.items.map((skill) => (
                                        <span key={skill} className={styles.skillTag}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div
                        ref={ctaRef}
                        className={`${styles.ctaContent} scroll-reveal-zoom ${ctaVisible ? "visible" : ""}`}
                    >
                        <h2>Let&apos;s Connect</h2>
                        <p>
                            Interested in collaborating or just want to say hi? I&apos;d love to hear from you!
                        </p>
                        <a href="/contact" className="btn-primary">
                            Get In Touch
                            <FaArrowRight />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
