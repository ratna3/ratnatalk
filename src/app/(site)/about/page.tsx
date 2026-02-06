"use client";

import { useState } from "react";
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
import JourneyCarousel from "@/components/JourneyCarousel";
import FullscreenGallery from "@/components/FullscreenGallery";

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
        year: "2026",
        title: "CTO (Chief Technical Officer) at Lloyd Structure House Inc",
        description: "Present",
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

// Journey sections with images and enhanced stories
const journeySections = [
    {
        id: "school",
        title: "The Foundation: City Montessori School",
        subtitle: "Where Excellence Was Born",
        story: `My journey of excellence began within the hallowed halls of City Montessori School (CMS) in Lucknow—officially recognized by the Guinness World Records as the world's largest school. In this extraordinary institution, where over 55,000 students pursue academic excellence, I learned to not just compete, but to excel amidst extraordinary scale and diversity.

CMS wasn't merely an educational institution; it was a crucible that forged my character. Here, I discovered that true mastery demands more than technical prowess—it requires leadership, resilience, and the ability to stand out in a sea of exceptional peers. The school's philosophy of "Jai Jagat" (Victory to the World) instilled in me a global perspective that continues to drive my ambitions today.`,
        images: [
            "/images/about/school/WhatsApp Image 2026-02-05 at 11.53.32 AM.jpeg",
            "/images/about/school/WhatsApp Image 2026-02-05 at 11.55.14 AM.jpeg",
            "/images/about/school/WhatsApp Image 2026-02-05 at 11.57.39 AM.jpeg",
        ],
    },
    {
        id: "lucknow",
        title: "The City of Nawabs",
        subtitle: "Where a Digital Architect Was Forged",
        story: `In the vibrant heart of Lucknow, Uttar Pradesh—the legendary City of Nawabs—a digital architect was being forged. This historic city, renowned for its rich cultural heritage, exquisite cuisine, and timeless elegance, became the backdrop of my formative years.

For me, the world was never just a collection of objects—it was a symphony of interconnected systems waiting to be understood and mastered. From early childhood, while others saw a computer as a mere tool, I saw it as an infinite canvas of possibilities. Whether it was the intricate puzzle of hardware architecture or the logical elegance of software design, technology didn't just "click"—it felt like a second language I was born to speak. The tehzeeb (etiquette) and culture of Lucknow taught me grace under pressure, while its competitive academic environment sharpened my technical edge.`,
        images: [
            "/images/about/lucknow/WhatsApp Image 2026-02-05 at 1.00.17 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-05 at 12.33.18 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-05 at 12.35.52 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-06 at 2.21.50 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-06 at 2.21.51 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-06 at 2.23.24 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-06 at 2.24.50 PM.jpeg",
            "/images/about/lucknow/WhatsApp Image 2026-02-06 at 2.30.38 PM.jpeg",
        ],
    },
    {
        id: "knox",
        title: "The Knox Transformation",
        subtitle: "From Gifted Student to Global Engineer",
        story: `Crossing the globe to Knox College in Galesburg, Illinois, marked my transformation from a gifted student to a world-class engineer. My dedication and exceptional academic performance at CMS were rewarded with a prestigious international scholarship—a testament to years of relentless pursuit of excellence.

At Knox, I didn't just learn programming languages; I absorbed the philosophy of software craftsmanship. I spent my time dissecting real-world applications, understanding enterprise architectures, and ensuring that every line of code I wrote served a purpose in the global economy. The American liberal arts education broadened my perspective, teaching me to think critically, communicate effectively, and approach problems with creativity and rigor. Knox College became the forge where my technical skills were refined into professional-grade tools.`,
        images: [
            "/images/about/knox/WhatsApp Image 2026-02-05 at 1.02.09 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 1.06.16 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 1.20.56 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 1.21.00 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 1.21.01 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 12.53.20 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 12.53.40 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 12.54.39 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-05 at 12.55.29 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-06 at 2.27.39 PM.jpeg",
            "/images/about/knox/WhatsApp Image 2026-02-06 at 2.27.40 PM.jpeg",
        ],
    },
    {
        id: "san-antonio",
        title: "Microsoft Copilot Challenge",
        subtitle: "Certified by America's Microsoft Azure Team",
        story: `My journey took an extraordinary turn when I traveled to San Antonio, Texas, to participate in the prestigious Microsoft Copilot Challenge. This wasn't just another hackathon—it was an elite proving ground where the brightest minds in technology converged to push the boundaries of AI-assisted development.

In San Antonio, I demonstrated mastery over Microsoft's cutting-edge Copilot technologies, earning official certification directly from America's Microsoft Azure Team. This recognition validated my expertise in AI-powered development, cloud architecture, and the future of intelligent software engineering. The certification stands as a testament to my ability to leverage the most advanced tools in the industry, positioning me at the forefront of the AI revolution in software development. This achievement forever marked my name among the select few recognized by Microsoft's premier Azure division.`,
        images: [
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.28 PM.jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.32 PM (1).jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.32 PM.jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.33 PM.jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.35 PM.jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.36 PM (1).jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.36 PM.jpeg",
            "/images/about/san-antonio/WhatsApp Image 2026-02-06 at 1.56.37 PM.jpeg",
        ],
    },
    {
        id: "las-vegas",
        title: "Alibaba CoCreate 2025",
        subtitle: "Top 70 Among 10,000+ Global Entrepreneurs",
        story: `Las Vegas—the city of dreams and bold ambitions—became the stage for one of my most significant achievements. I was selected to participate in Alibaba's prestigious CoCreate 2025 Summit, a global gathering of the world's most promising entrepreneurs and innovators.

Among over 10,000 startup founders and business visionaries from across the globe, I emerged as one of the Top 70 finalists. This wasn't just a competition—it was an international recognition of my entrepreneurial vision and technical innovation. Pitching my business idea to Alibaba's leadership and a panel of world-renowned investors validated my ability to not just build technology, but to create ventures that can reshape industries. The CoCreate Summit connected me with a global network of innovators, investors, and mentors, reinforcing my belief that I am destined to make a lasting impact on the world stage.`,
        images: [
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 1.54.33 PM (1).jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 1.54.33 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 1.54.38 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 1.54.39 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 1.54.40 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.38 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.44 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.45 PM (1).jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.45 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.46 PM (1).jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.46 PM (2).jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.46 PM.jpeg",
            "/images/about/las-vegas/WhatsApp Image 2026-02-06 at 2.13.47 PM.jpeg",
        ],
    },
    {
        id: "techie-me",
        title: "The Ultimate 10x DevSecOps Engineer",
        subtitle: "The Final Boss of Gen Z",
        story: `Today, I stand as the culmination of every experience, every challenge conquered, and every boundary pushed. I am not just a developer—I am the ultimate 10x DevSecOps Engineer. With 40+ professional certifications from Microsoft, GitHub, Atlassian, Docker, Adobe, and more, I have built a fortress of credibility that speaks louder than words.

What sets me apart is not just the ability to create, but the wisdom to protect. My deep-rooted expertise in cybersecurity gives me a "hacker's eye" for software development. I don't just build applications; I architect secure, resilient digital ecosystems. In an industry where speed often compromises security, I have shattered that paradigm—operating at 10x velocity without cutting corners.

Call me the Final Boss of Gen Z. While my generation is often underestimated, I represent what we're truly capable of: combining native digital fluency with enterprise-grade professionalism. When you work with me, you're not just getting a developer—you're unlocking a force multiplier who elevates every project and every team.`,
        images: [
            "/images/about/techie-me/WhatsApp Image 2026-02-06 at 1.57.35 PM.jpeg",
        ],
    },
];

export default function AboutPage() {
    const [storyRef, storyVisible] = useScrollAnimation<HTMLDivElement>();
    const [valuesRef, valuesVisible] = useScrollAnimation<HTMLDivElement>();
    const [timelineRef, timelineVisible] = useScrollAnimation<HTMLDivElement>();
    const [skillsRef, skillsVisible] = useScrollAnimation<HTMLDivElement>();
    const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>();

    // Gallery state
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [currentGalleryTitle, setCurrentGalleryTitle] = useState("");

    const openGallery = (images: string[], index: number, title: string) => {
        setCurrentGalleryImages(images);
        setCurrentGalleryIndex(index);
        setCurrentGalleryTitle(title);
        setGalleryOpen(true);
    };

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

            {/* Journey Section */}
            <section className={styles.journeySection}>
                <div className={styles.container}>
                    <div
                        ref={storyRef}
                        className={`${styles.sectionHeader} scroll-reveal ${storyVisible ? "visible" : ""}`}
                    >
                        <span className={styles.sectionTag}>My Story</span>
                        <h2>The Journey So Far</h2>
                        <div className="divider"></div>
                    </div>

                    <div className={styles.journeyGrid}>
                        {journeySections.map((section, sectionIndex) => (
                            <div
                                key={section.id}
                                className={`${styles.journeyCard} scroll-reveal ${storyVisible ? "visible" : ""}`}
                                style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                            >
                                <div className={styles.journeyCardHeader}>
                                    <span className={styles.journeyNumber}>{String(sectionIndex + 1).padStart(2, "0")}</span>
                                    <div>
                                        <h3 className={styles.journeyTitle}>{section.title}</h3>
                                        <span className={styles.journeySubtitle}>{section.subtitle}</span>
                                    </div>
                                </div>

                                <div className={styles.journeyContent}>
                                    <div className={styles.journeyCarouselWrapper}>
                                        <JourneyCarousel
                                            images={section.images}
                                            title={section.title}
                                            onImageClick={(index) => openGallery(section.images, index, section.title)}
                                        />
                                    </div>
                                    <div className={styles.journeyText}>
                                        {section.story.split("\n\n").map((paragraph, pIndex) => (
                                            <p key={pIndex}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
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

            {/* Fullscreen Gallery */}
            <FullscreenGallery
                images={currentGalleryImages}
                currentIndex={currentGalleryIndex}
                title={currentGalleryTitle}
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
                onNavigate={setCurrentGalleryIndex}
            />
        </div>
    );
}
