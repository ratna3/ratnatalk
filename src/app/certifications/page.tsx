"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import certificateAnimation from "@/animations/certificate.json";
import {
    FaAward,
    FaMedal,
    FaCogs,
    FaDocker,
    FaCode,
    FaClipboardList,
    FaWrench,
    FaTrophy,
    FaCloud,
    FaBolt,
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaAws,
    FaGoogle,
    FaMicrosoft
} from "react-icons/fa";
import { SiKubernetes, SiTerraform } from "react-icons/si";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

// Icon mapping for certification badges
const badgeIcons: { [key: string]: React.ReactNode } = {
    "aws-pro": <FaAws className={styles.badgeIcon} />,
    "gcp": <FaGoogle className={styles.badgeIcon} />,
    "k8s": <SiKubernetes className={styles.badgeIcon} />,
    "azure": <FaMicrosoft className={styles.badgeIcon} />,
    "terraform": <SiTerraform className={styles.badgeIcon} />,
    "scrum": <FaClipboardList className={styles.badgeIcon} />,
    "docker": <FaDocker className={styles.badgeIcon} />,
    "aws-dev": <FaCode className={styles.badgeIcon} />,
};

// Sample certification data
const certifications = [
    {
        id: 1,
        title: "AWS Solutions Architect - Professional",
        issuer: "Amazon Web Services",
        issueDate: "Oct 2024",
        expiryDate: "Oct 2027",
        credentialId: "AWS-SAP-2024-XXXX",
        category: "Cloud",
        description:
            "Advanced certification demonstrating expertise in designing distributed systems and applications on AWS infrastructure.",
        skills: ["Cloud Architecture", "AWS Services", "System Design", "Security"],
        badgeKey: "aws-pro",
    },
    {
        id: 2,
        title: "Google Cloud Professional Cloud Architect",
        issuer: "Google Cloud",
        issueDate: "Aug 2024",
        expiryDate: "Aug 2026",
        credentialId: "GCP-PCA-2024-XXXX",
        category: "Cloud",
        description:
            "Validates ability to design, develop, and manage robust, secure, scalable, and dynamic solutions on Google Cloud.",
        skills: ["GCP Services", "Cloud Migration", "Solution Design", "DevOps"],
        badgeKey: "gcp",
    },
    {
        id: 3,
        title: "Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation",
        issueDate: "Jun 2024",
        expiryDate: "Jun 2027",
        credentialId: "CKA-2024-XXXX",
        category: "DevOps",
        description:
            "Demonstrates competence in Kubernetes administration, including cluster maintenance and troubleshooting.",
        skills: ["Kubernetes", "Container Orchestration", "Cluster Management", "Networking"],
        badgeKey: "k8s",
    },
    {
        id: 4,
        title: "Microsoft Azure Solutions Architect Expert",
        issuer: "Microsoft",
        issueDate: "Apr 2024",
        expiryDate: "Apr 2026",
        credentialId: "AZ-305-2024-XXXX",
        category: "Cloud",
        description:
            "Expert-level certification for designing cloud and hybrid solutions on Microsoft Azure platform.",
        skills: ["Azure Services", "Hybrid Cloud", "Identity Management", "Governance"],
        badgeKey: "azure",
    },
    {
        id: 5,
        title: "HashiCorp Certified: Terraform Associate",
        issuer: "HashiCorp",
        issueDate: "Mar 2024",
        expiryDate: "Mar 2026",
        credentialId: "TF-ASSOC-2024-XXXX",
        category: "DevOps",
        description:
            "Validates proficiency in Infrastructure as Code using HashiCorp Terraform.",
        skills: ["Terraform", "IaC", "Cloud Automation", "State Management"],
        badgeKey: "terraform",
    },
    {
        id: 6,
        title: "Professional Scrum Master I (PSM I)",
        issuer: "Scrum.org",
        issueDate: "Jan 2024",
        expiryDate: "No Expiry",
        credentialId: "PSM-I-2024-XXXX",
        category: "Leadership",
        description:
            "Demonstrates fundamental understanding of Scrum framework and its application in software development.",
        skills: ["Scrum Framework", "Agile Methodology", "Team Facilitation", "Sprint Planning"],
        badgeKey: "scrum",
    },
    {
        id: 7,
        title: "Docker Certified Associate",
        issuer: "Docker",
        issueDate: "Nov 2023",
        expiryDate: "Nov 2025",
        credentialId: "DCA-2023-XXXX",
        category: "DevOps",
        description:
            "Validates expertise in Docker containerization and container management best practices.",
        skills: ["Docker", "Containerization", "Docker Compose", "Image Management"],
        badgeKey: "docker",
    },
    {
        id: 8,
        title: "AWS Developer Associate",
        issuer: "Amazon Web Services",
        issueDate: "Sep 2023",
        expiryDate: "Sep 2026",
        credentialId: "AWS-DVA-2023-XXXX",
        category: "Cloud",
        description:
            "Demonstrates proficiency in developing and maintaining applications on the AWS platform.",
        skills: ["AWS Lambda", "API Gateway", "DynamoDB", "Serverless"],
        badgeKey: "aws-dev",
    },
];

const categories = ["All", "Cloud", "DevOps", "Leadership"];

export default function CertificationsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredCerts = certifications.filter(
        (cert) => selectedCategory === "All" || cert.category === selectedCategory
    );

    const totalCerts = certifications.length;
    const cloudCerts = certifications.filter((c) => c.category === "Cloud").length;
    const devOpsCerts = certifications.filter((c) => c.category === "DevOps").length;

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
                            learning journey in cloud computing, DevOps, and leadership.
                        </p>
                    </div>
                    <div className={styles.heroAnimation}>
                        <LottieAnimation
                            animationData={certificateAnimation}
                            style={{ width: "250px", height: "250px" }}
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={styles.statsSection}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statIcon}>
                                <FaTrophy />
                            </span>
                            <span className={styles.statNumber}>{totalCerts}</span>
                            <span className={styles.statLabel}>Total Certifications</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statIcon}>
                                <FaCloud />
                            </span>
                            <span className={styles.statNumber}>{cloudCerts}</span>
                            <span className={styles.statLabel}>Cloud Certifications</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statIcon}>
                                <FaBolt />
                            </span>
                            <span className={styles.statNumber}>{devOpsCerts}</span>
                            <span className={styles.statLabel}>DevOps Certifications</span>
                        </div>
                        <div className={styles.statCard}>
                            <span className={styles.statIcon}>
                                <FaCalendarAlt />
                            </span>
                            <span className={styles.statNumber}>2024</span>
                            <span className={styles.statLabel}>Latest Achievement</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <div className={styles.categories}>
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
                        {filteredCerts.map((cert, index) => (
                            <article
                                key={cert.id}
                                className={styles.certCard}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={styles.certHeader}>
                                    <span className={styles.certBadge}>
                                        {badgeIcons[cert.badgeKey] || <FaAward className={styles.badgeIcon} />}
                                    </span>
                                    <span className={styles.certCategory}>{cert.category}</span>
                                </div>
                                <h2 className={styles.certTitle}>{cert.title}</h2>
                                <p className={styles.certIssuer}>{cert.issuer}</p>
                                <p className={styles.certDescription}>{cert.description}</p>

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

                                <div className={styles.certFooter}>
                                    <span className={styles.credentialId}>
                                        ID: {cert.credentialId}
                                    </span>
                                    <button className={styles.verifyBtn}>
                                        Verify
                                        <FaExternalLinkAlt size={12} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2>Want to Learn More?</h2>
                        <p>
                            Check out my blog for insights on how I prepared for these
                            certifications and tips for your certification journey.
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
