"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";
import heroAnimation from "@/animations/hero.json";
import {
    FaBookOpen,
    FaHandshake,
    FaLightbulb,
    FaBullseye,
    FaArrowRight
} from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

const skills = [
    { category: "Cloud Platforms", items: ["AWS", "Google Cloud", "Azure", "DigitalOcean"] },
    { category: "DevOps & Tools", items: ["Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"] },
    { category: "Programming", items: ["Python", "JavaScript", "TypeScript", "Go", "Node.js"] },
    { category: "Leadership", items: ["Team Management", "Agile/Scrum", "Strategic Planning", "Mentoring"] },
];

const timeline = [
    {
        year: "2024",
        title: "Cloud Architect",
        description: "Leading cloud transformation initiatives and architecting enterprise-grade solutions.",
    },
    {
        year: "2022",
        title: "Senior Engineer",
        description: "Spearheaded DevOps practices and mentored junior developers in best practices.",
    },
    {
        year: "2020",
        title: "Software Engineer",
        description: "Built scalable microservices and contributed to open-source projects.",
    },
    {
        year: "2018",
        title: "Started Tech Journey",
        description: "Began my journey in technology with a passion for learning and innovation.",
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
                            Hi, I&apos;m <span className={styles.gradient}>RK</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Cloud Architect • Tech Enthusiast • Lifelong Learner
                        </p>
                        <p className={styles.heroDescription}>
                            I&apos;m a passionate technologist with a love for building scalable systems and sharing
                            knowledge. With years of experience in cloud architecture and software development,
                            I help organizations transform their technical capabilities while continuously growing
                            my own expertise.
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNumber}>5+</span>
                                <span className={styles.heroStatLabel}>Years Experience</span>
                            </div>
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNumber}>15+</span>
                                <span className={styles.heroStatLabel}>Certifications</span>
                            </div>
                            <div className={styles.heroStat}>
                                <span className={styles.heroStatNumber}>50+</span>
                                <span className={styles.heroStatLabel}>Articles Written</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroAnimation}>
                        <LottieAnimation
                            animationData={heroAnimation}
                            style={{ width: "350px", height: "350px" }}
                        />
                    </div>
                </div>
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
                        <p>
                            My journey in technology began with a simple curiosity about how things work.
                            From writing my first lines of code to architecting complex cloud solutions,
                            every step has been driven by an insatiable desire to learn and create.
                        </p>
                        <p>
                            Through RK Talks, I aim to share the insights and experiences I&apos;ve gathered
                            over the years. Whether it&apos;s breaking down complex technical concepts or
                            discussing leadership principles, I believe in making knowledge accessible to everyone.
                        </p>
                        <p>
                            When I&apos;m not coding or writing, you&apos;ll find me exploring new technologies,
                            contributing to open-source projects, or mentoring aspiring developers.
                            I believe that true growth comes from both learning and teaching.
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
                                key={item.year}
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
