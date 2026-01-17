"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import certificateAnimation from "@/animations/certificate.json";
import {
    FaShieldAlt,
    FaDocker,
    FaCode,
    FaGithub,
    FaRobot,
    FaServer,
    FaReact,
    FaTrophy,
    FaMicrosoft,
    FaLock,
    FaNetworkWired,
    FaCogs,
    FaLaptopCode,
    FaProjectDiagram,
    FaBrain,
    FaPalette,
    FaExternalLinkAlt
} from "react-icons/fa";
import { SiDocker, SiMongodb, SiAngular, SiD3Dotjs, SiAtlassian } from "react-icons/si";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ScrollIndicator from "@/components/ScrollIndicator";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

// Certification data organized by category
const certifications = [
    // Cybersecurity
    {
        id: 1,
        title: "Career Essentials in Cybersecurity",
        issuer: "Microsoft & LinkedIn",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Cybersecurity Fundamentals", "Security Awareness", "Threat Prevention"],
        icon: <FaShieldAlt />,
        credentialUrl: "https://lnkd.in/gFbrRSwU",
    },
    {
        id: 2,
        title: "Cybersecurity Foundations",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Security Basics", "Risk Management", "Network Security"],
        icon: <FaLock />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/725ad607530eb09d28f3fcab82b22901cd69c7ab933e83fb73680bc399b20e35",
    },
    {
        id: 3,
        title: "Cybersecurity Awareness: Cybersecurity Terminology",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Security Terminology", "Threat Landscape"],
        icon: <FaShieldAlt />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/ef36ee488b33da0522fe50d04782545f6e2aa92826d25dd078532c60c76c8d6b",
    },
    {
        id: 4,
        title: "The Cybersecurity Threat Landscape",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Threat Analysis", "Attack Vectors", "Security Trends"],
        icon: <FaShieldAlt />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/a3db18069b60c7d8b565b79427590b11ec44582e1819eb7f0ac7370ea590bc34",
    },
    {
        id: 5,
        title: "Microsoft Security Copilot",
        issuer: "Microsoft",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["AI Security", "Security Copilot", "Threat Detection"],
        icon: <FaMicrosoft />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/6fe505bbdfb924843bb3f36af07c8937997c7d8b7b33068393dd1cc9bb39de12",
    },
    {
        id: 6,
        title: "Ethical Hacking: The Complete Malware Analysis Process",
        issuer: "Malcolm Shore",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Malware Analysis", "Ethical Hacking", "Reverse Engineering"],
        icon: <FaLock />,
        credentialUrl: "https://lnkd.in/gGpwuFXD",
    },
    {
        id: 7,
        title: "Information Gathering - Web Edition",
        issuer: "Hack The Box",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["OSINT", "Web Reconnaissance", "Penetration Testing"],
        icon: <FaNetworkWired />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/9469d2ecb238dee78285bee12d402d72934e409495839bbd6b72017919e4019b",
    },
    {
        id: 8,
        title: "Introduction to Network Traffic Analysis",
        issuer: "Hack The Box",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Network Analysis", "Traffic Monitoring", "Wireshark"],
        icon: <FaNetworkWired />,
        credentialUrl: "https://lnkd.in/gRScNVHv",
    },
    {
        id: 9,
        title: "Security Monitoring and SIEM Fundamentals",
        issuer: "Hack The Box",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["SIEM", "Security Monitoring", "Log Analysis"],
        icon: <FaServer />,
        credentialUrl: "https://lnkd.in/gr8fyeRw",
    },
    {
        id: 10,
        title: "Windows Event Logs and Finding Evil",
        issuer: "Hack The Box",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Windows Security", "Event Logs", "Incident Response"],
        icon: <FaMicrosoft />,
        credentialUrl: "https://lnkd.in/g_ZE7zWy",
    },
    {
        id: 11,
        title: "Footprinting",
        issuer: "Hack The Box",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Cybersecurity",
        skills: ["Footprinting", "Reconnaissance", "Information Gathering"],
        icon: <FaShieldAlt />,
        credentialUrl: "https://lnkd.in/gyhaAmi3",
    },
    // DevOps/Docker
    {
        id: 12,
        title: "Docker Foundations Professional Certificate",
        issuer: "Docker",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "DevOps",
        skills: ["Docker", "Containerization", "Container Management"],
        icon: <SiDocker />,
        credentialUrl: "https://lnkd.in/gMwzfaPa",
    },
    {
        id: 13,
        title: "Docker: Your First Project",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "DevOps",
        skills: ["Docker Basics", "Container Deployment"],
        icon: <FaDocker />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/ff5d6f61958c24868f61e2a5f43e5ca68a590b3994fbfe3911da4763e87329d3",
    },
    {
        id: 14,
        title: "Learning Docker",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "DevOps",
        skills: ["Docker", "Images", "Containers"],
        icon: <FaDocker />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/22a2e5626af30bc9405b9c61b66aedb9dfec01959e3cbecdfea5764407a8adb2",
    },
    {
        id: 15,
        title: "Learning Docker Compose",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "DevOps",
        skills: ["Docker Compose", "Multi-container Apps", "Orchestration"],
        icon: <FaDocker />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/8d3c7349deb5bf6db6e49833fa839b6a951f665d0b7cfb80aca8b778d7d22a39",
    },
    // GitHub
    {
        id: 16,
        title: "Career Essentials in GitHub Professional Certificate",
        issuer: "GitHub",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "GitHub",
        skills: ["GitHub", "Version Control", "Collaboration"],
        icon: <FaGithub />,
        credentialUrl: "https://lnkd.in/gtA59fXc",
    },
    {
        id: 17,
        title: "Practical GitHub Code Search",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "GitHub",
        skills: ["Code Search", "GitHub Navigation"],
        icon: <FaGithub />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/f7110d657b88f3d42a13d7d62b98e240786d01f3def436a53e98ff55869f4628",
    },
    {
        id: 18,
        title: "Practical GitHub Copilot",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "GitHub",
        skills: ["GitHub Copilot", "AI Coding", "Productivity"],
        icon: <FaGithub />,
        credentialUrl: "https://lnkd.in/guYa6z53",
    },
    {
        id: 19,
        title: "GitHub Copilot Challenge",
        issuer: "Microsoft Americas Azure Team",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "GitHub",
        skills: ["AI Pair Programming", "Code Generation"],
        icon: <FaGithub />,
        credentialUrl: "https://www.credly.com/badges/de951714-3ac4-4d33-ab8c-091b609c744c/linked_in_profile",
    },
    {
        id: 20,
        title: "Practical GitHub Actions",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "GitHub",
        skills: ["GitHub Actions", "CI/CD", "Automation"],
        icon: <FaGithub />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/0080935b2bcccfe2a98e06782cf94afac2ff805312745b05b87d621630502814",
    },
    {
        id: 21,
        title: "Practical GitHub Project Management and Collaboration",
        issuer: "Ray Villalobos",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "GitHub",
        skills: ["Project Management", "GitHub Projects", "Team Collaboration"],
        icon: <FaProjectDiagram />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/595998e9027e9f8dd408934e49930584e787027bbef1b997a77773db71d806b2",
    },
    // Software Development
    {
        id: 22,
        title: "Career Essentials in Software Development",
        issuer: "Microsoft & LinkedIn",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Development",
        skills: ["Software Development", "Best Practices", "SDLC"],
        icon: <FaCode />,
        credentialUrl: "https://lnkd.in/g9FjMMWF",
    },
    {
        id: 23,
        title: "Introduction to Career Skills in Software Development",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Development",
        skills: ["Career Skills", "Professional Development"],
        icon: <FaLaptopCode />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/1195851e66bf542061465bd040652bf61827e44b474681d274b51577cf03e3e3",
    },
    {
        id: 24,
        title: "Programming Foundations: Fundamentals",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Development",
        skills: ["Programming Basics", "Logic", "Algorithms"],
        icon: <FaCode />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/303af4d1c8fc5411de90d4456d465a33ede1ae46ddbefeb2b7dbc492c2af9d7b",
    },
    {
        id: 25,
        title: "Programming Foundations: Beyond the Fundamentals",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Development",
        skills: ["Advanced Programming", "Data Structures", "OOP"],
        icon: <FaCode />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/e6e8ccbefe72a2abb90e6b2053b2f6fa85bc1fc2d478f59798456a8115619647",
    },
    // Web Development
    {
        id: 26,
        title: "Angular Essential Training",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Web Dev",
        skills: ["Angular", "TypeScript", "Frontend Development"],
        icon: <SiAngular />,
        credentialUrl: "https://lnkd.in/gE-ygVjr",
    },
    {
        id: 27,
        title: "D3.js Essential Training",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Web Dev",
        skills: ["D3.js", "Data Visualization", "JavaScript"],
        icon: <SiD3Dotjs />,
        credentialUrl: "https://lnkd.in/gtJ5Yg52",
    },
    {
        id: 28,
        title: "Learning Redux Toolkit",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Web Dev",
        skills: ["Redux", "State Management", "React"],
        icon: <FaReact />,
        credentialUrl: "https://lnkd.in/gM_PCyrq",
    },
    {
        id: 29,
        title: "React.js: Building an Interface",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Web Dev",
        skills: ["React.js", "UI Development", "Components"],
        icon: <FaReact />,
        credentialUrl: "https://lnkd.in/gXgFB_cW",
    },
    {
        id: 30,
        title: "Learning Full-Stack JavaScript Development: MongoDB, Node, and React",
        issuer: "Samer Buna",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Web Dev",
        skills: ["Full-Stack", "MERN Stack", "Node.js", "MongoDB"],
        icon: <SiMongodb />,
        credentialUrl: "https://lnkd.in/gsduHDH5",
    },
    // AI/Generative AI
    {
        id: 31,
        title: "Microsoft Azure AI Essentials Professional Certificate",
        issuer: "Microsoft & LinkedIn",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["Azure AI", "Machine Learning", "AI Services"],
        icon: <FaMicrosoft />,
        credentialUrl: "https://lnkd.in/gbhQjWWN",
    },
    {
        id: 32,
        title: "Introduction to Model Context Protocol",
        issuer: "Anthropic",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["MCP", "AI Integration", "Anthropic"],
        icon: <FaBrain />,
        credentialUrl: "http://verify.skilljar.com/c/rqadmm8qbaiz",
    },
    {
        id: 33,
        title: "What Is Generative AI?",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["Generative AI", "AI Fundamentals"],
        icon: <FaRobot />,
        credentialUrl: "https://lnkd.in/gcS4Tcyf",
    },
    {
        id: 34,
        title: "Essential Skills in Generative AI for Creatives",
        issuer: "Adobe",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["Generative AI", "Creative AI", "Adobe Firefly"],
        icon: <FaPalette />,
        credentialUrl: "https://lnkd.in/gbNAwe2e",
    },
    {
        id: 35,
        title: "Generative AI Imaging: What Creative Pros Need to Know",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["AI Imaging", "Creative Tools"],
        icon: <FaPalette />,
        credentialUrl: "https://lnkd.in/gVqPJBef",
    },
    {
        id: 36,
        title: "Generative AI: Business and Legal Concerns for Creatives",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["AI Ethics", "Legal Considerations", "IP Rights"],
        icon: <FaRobot />,
        credentialUrl: "https://lnkd.in/g8PweP2i",
    },
    {
        id: 37,
        title: "Leveraging AI in Adobe Photoshop and Creative Cloud",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "AI",
        skills: ["Adobe AI", "Photoshop", "Creative Cloud"],
        icon: <FaPalette />,
        credentialUrl: "https://lnkd.in/gRBJDYiM",
    },
    // IT Service Management
    {
        id: 38,
        title: "Atlassian IT Service Management (ITSM) Professional Certificate",
        issuer: "Atlassian",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "ITSM",
        skills: ["ITSM", "Jira Service Management", "Atlassian"],
        icon: <SiAtlassian />,
        credentialUrl: "https://lnkd.in/g6K2_baa",
    },
    {
        id: 39,
        title: "Atlassian IT Service Management Foundations: Problem Management",
        issuer: "Atlassian",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "ITSM",
        skills: ["Problem Management", "ITIL", "Root Cause Analysis"],
        icon: <FaCogs />,
        credentialUrl: "https://lnkd.in/g9RBgPXf",
    },
    {
        id: 40,
        title: "IT Service Management Foundations: Change Management",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "ITSM",
        skills: ["Change Management", "ITIL", "CAB"],
        icon: <FaServer />,
        credentialUrl: "https://lnkd.in/ghNxPNFQ",
    },
    {
        id: 41,
        title: "IT Service Desk: Monitoring and Metrics Fundamentals",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "ITSM",
        skills: ["Service Desk", "KPIs", "Monitoring"],
        icon: <FaServer />,
        credentialUrl: "https://lnkd.in/gjrJCb7R",
    },
    {
        id: 42,
        title: "IT Service Desk: Service Management",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "ITSM",
        skills: ["Service Management", "Ticketing", "User Support"],
        icon: <FaServer />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/eda523289dd3e73fe715f7b8790e422f8bcbc09003a26c9d2caf0c066bf5e246",
    },
    // Leadership/Other
    {
        id: 43,
        title: "Cert Prep: Scrum Master (2018)",
        issuer: "LinkedIn Learning",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Leadership",
        skills: ["Scrum", "Agile", "Project Management"],
        icon: <FaProjectDiagram />,
        credentialUrl: "https://www.linkedin.com/learning/certificates/d05acb175ffb0e53578798ed95c29b81d8bb047b67e4a5ceb6f7306e20a322f9",
    },
    {
        id: 44,
        title: "CoCreate Pitch 2025 Semi Finalist Top 70",
        issuer: "CoCreate Las Vegas",
        issueDate: "2025",
        expiryDate: "No Expiry",
        category: "Achievement",
        skills: ["Entrepreneurship", "Pitching", "Innovation"],
        icon: <FaTrophy />,
        credentialUrl: "https://www.linkedin.com/posts/ratna-kirti_teamwork-collaboration-nevergiveup-ugcPost-7376195157190369280-aPU7",
    },
];

const categories = ["All", "Cybersecurity", "DevOps", "GitHub", "Development", "Web Dev", "AI", "ITSM", "Leadership", "Achievement"];

// Helper to group items into pairs
function groupIntoPairs<T>(items: T[]): T[][] {
    const pairs: T[][] = [];
    for (let i = 0; i < items.length; i += 2) {
        pairs.push(items.slice(i, i + 2));
    }
    return pairs;
}

// Component for animating each pair of certifications
interface CertPairRowProps {
    certs: typeof certifications;
    pairIndex: number;
}

function CertPairRow({ certs, pairIndex }: CertPairRowProps) {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

    return (
        <>
            {certs.map((cert, indexInPair) => (
                <article
                    key={cert.id}
                    ref={indexInPair === 0 ? ref : undefined}
                    className={`${styles.certCard} scroll-reveal-flip ${isVisible ? "visible" : ""} stagger-${indexInPair + 1}`}
                >
                    <div className={styles.certHeader}>
                        <span className={styles.certBadge}>
                            {cert.icon}
                        </span>
                        <span className={styles.certCategory}>{cert.category}</span>
                    </div>
                    <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.certTitleLink}
                    >
                        <h2 className={styles.certTitle}>
                            {cert.title}
                            <FaExternalLinkAlt className={styles.externalLinkIcon} />
                        </h2>
                    </a>
                    <p className={styles.certIssuer}>{cert.issuer}</p>

                    <div className={styles.certDates}>
                        <div className={styles.dateItem}>
                            <span className={styles.dateLabel}>Issued</span>
                            <span className={styles.dateValue}>{cert.issueDate}</span>
                        </div>
                        <div className={styles.dateItem}>
                            <span className={styles.dateLabel}>Expires</span>
                            <span className={styles.dateValue}>{cert.expiryDate}</span>
                        </div>
                    </div>

                    <div className={styles.certSkills}>
                        {cert.skills.map((skill) => (
                            <span key={skill} className={styles.skillTag}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </article>
            ))}
        </>
    );
}

export default function CertificationsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [statsRef, statsVisible] = useScrollAnimation<HTMLDivElement>();
    const [filterRef, filterVisible] = useScrollAnimation<HTMLDivElement>();
    const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>();

    const filteredCerts = certifications.filter(
        (cert) => selectedCategory === "All" || cert.category === selectedCategory
    );

    // Group certifications into pairs for staggered animation
    const certPairs = groupIntoPairs(filteredCerts);

    const totalCerts = certifications.length;
    const cybersecurityCerts = certifications.filter((c) => c.category === "Cybersecurity").length;
    const devOpsCerts = certifications.filter((c) => c.category === "DevOps").length;
    const aiCerts = certifications.filter((c) => c.category === "AI").length;
    const githubCerts = certifications.filter((c) => c.category === "GitHub").length;
    const developmentCerts = certifications.filter((c) => c.category === "Development").length;
    const webDevCerts = certifications.filter((c) => c.category === "Web Dev").length;
    const itsmCerts = certifications.filter((c) => c.category === "ITSM").length;
    const leadershipCerts = certifications.filter((c) => c.category === "Leadership").length;
    const achievementCerts = certifications.filter((c) => c.category === "Achievement").length;

    return (
        <div className={styles.certificationsPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroTag}>Professional Achievements</span>
                        <h1>
                            My <span className={styles.gradient}>Certifications</span>
                        </h1>
                        <p>
                            A showcase of my professional certifications and continuous
                            learning journey in cybersecurity, DevOps, AI, and software development.
                        </p>
                    </div>
                    <div className={styles.heroAnimation}>
                        <LottieAnimation
                            animationData={certificateAnimation}
                            style={{ width: "250px", height: "250px" }}
                        />
                    </div>
                </div>
                <ScrollIndicator />
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.container}>
                    <div
                        ref={statsRef}
                        className={`${styles.statsGrid} scroll-reveal ${statsVisible ? "visible" : ""}`}
                    >
                        <div className={`${styles.statCard} stagger-1`}>
                            <span className={styles.statIcon}>
                                <FaTrophy />
                            </span>
                            <span className={styles.statNumber}>{totalCerts}</span>
                            <span className={styles.statLabel}>Total Certifications</span>
                        </div>
                        <div className={`${styles.statCard} stagger-2`}>
                            <span className={styles.statIcon}>
                                <FaShieldAlt />
                            </span>
                            <span className={styles.statNumber}>{cybersecurityCerts}</span>
                            <span className={styles.statLabel}>Cybersecurity</span>
                        </div>
                        <div className={`${styles.statCard} stagger-3`}>
                            <span className={styles.statIcon}>
                                <FaRobot />
                            </span>
                            <span className={styles.statNumber}>{aiCerts}</span>
                            <span className={styles.statLabel}>AI & Generative AI</span>
                        </div>
                        <div className={`${styles.statCard} stagger-4`}>
                            <span className={styles.statIcon}>
                                <FaGithub />
                            </span>
                            <span className={styles.statNumber}>{githubCerts}</span>
                            <span className={styles.statLabel}>GitHub</span>
                        </div>
                        <div className={`${styles.statCard} stagger-5`}>
                            <span className={styles.statIcon}>
                                <FaServer />
                            </span>
                            <span className={styles.statNumber}>{itsmCerts}</span>
                            <span className={styles.statLabel}>ITSM</span>
                        </div>
                        <div className={`${styles.statCard} stagger-6`}>
                            <span className={styles.statIcon}>
                                <FaReact />
                            </span>
                            <span className={styles.statNumber}>{webDevCerts}</span>
                            <span className={styles.statLabel}>Web Dev</span>
                        </div>
                        <div className={`${styles.statCard} stagger-7`}>
                            <span className={styles.statIcon}>
                                <FaCode />
                            </span>
                            <span className={styles.statNumber}>{developmentCerts}</span>
                            <span className={styles.statLabel}>Development</span>
                        </div>
                        <div className={`${styles.statCard} stagger-8`}>
                            <span className={styles.statIcon}>
                                <FaDocker />
                            </span>
                            <span className={styles.statNumber}>{devOpsCerts}</span>
                            <span className={styles.statLabel}>DevOps</span>
                        </div>
                        <div className={`${styles.statCard} stagger-9`}>
                            <span className={styles.statIcon}>
                                <FaProjectDiagram />
                            </span>
                            <span className={styles.statNumber}>{leadershipCerts}</span>
                            <span className={styles.statLabel}>Leadership</span>
                        </div>
                        <div className={`${styles.statCard} stagger-10`}>
                            <span className={styles.statIcon}>
                                <FaTrophy />
                            </span>
                            <span className={styles.statNumber}>{achievementCerts}</span>
                            <span className={styles.statLabel}>Achievement</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <div
                        ref={filterRef}
                        className={`${styles.categories} scroll-reveal ${filterVisible ? "visible" : ""}`}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                                {category !== "All" && (
                                    <span className={styles.categoryCount}>
                                        {certifications.filter((c) => c.category === category).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Grid */}
            <section className={styles.certsSection}>
                <div className={styles.container}>
                    <div className={styles.certsGrid}>
                        {certPairs.map((pair, pairIndex) => (
                            <CertPairRow key={pairIndex} certs={pair} pairIndex={pairIndex} />
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
                        <h2>Want to Learn More?</h2>
                        <p>
                            Check out my blog for insights on my learning journey and tips for your certification path.
                        </p>
                        <a href="/blogs" className="btn-primary">
                            Read My Blog
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
