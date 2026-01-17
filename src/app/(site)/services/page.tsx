"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import successAnimation from "@/animations/success.json";
import {
    FaCode,
    FaMobile,
    FaServer,
    FaPalette,
    FaSearch,
    FaTools,
    FaPaperPlane,
    FaCheckCircle,
    FaRocket,
    FaArrowRight,
    FaTimes,
    FaUser,
    FaClipboardList,
    FaCogs,
    FaMoneyBillWave,
    FaInfoCircle
} from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

const serviceOptions = [
    { id: "web", label: "Web Development", icon: <FaCode /> },
    { id: "mobile", label: "Mobile App Development", icon: <FaMobile /> },
    { id: "api", label: "API Development", icon: <FaServer /> },
    { id: "uiux", label: "UI/UX Design", icon: <FaPalette /> },
    { id: "consultation", label: "Consultation/Code Review", icon: <FaSearch /> },
    { id: "maintenance", label: "Maintenance/Support", icon: <FaTools /> },
];

const projectStages = [
    "Idea/Concept",
    "Requirements Defined",
    "Design Ready",
    "Development in Progress",
    "Live/Needing Update",
];

const designPreferences = [
    { value: "specific_design", label: "I have a specific design (Figma/Adobe XD)" },
    { value: "custom_design", label: "I need a custom design created" },
    { value: "templates", label: "I am open to using professional templates" },
];

const budgetRanges = [
    "<$1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
];

const urgencyLevels = [
    "Standard",
    "High Priority (Rush Fee may apply)",
    "Flexible",
];

const communicationMethods = [
    "Email",
    "Slack",
    "WhatsApp",
    "Discord",
    "Video Call",
];

const referralSources = [
    "Google Search",
    "Social Media",
    "Friend/Colleague Referral",
    "GitHub",
    "LinkedIn",
    "Previous Work",
    "Other",
];

interface FormData {
    // Contact Information
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    preferredContact: string;
    contactHandle: string;

    // Project Overview
    projectTitle: string;
    serviceTypes: string[];
    projectDescription: string;

    // Technical & Design Specifics
    currentStage: string;
    designPreference: string;
    techStack: string;
    featuresRequired: string;

    // Timeline & Budget
    estimatedBudget: string;
    deadline: string;
    urgencyLevel: string;

    // Additional Information
    competitorWebsites: string;
    referralSource: string;
}

export default function ServicesPage() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        preferredContact: "Email",
        contactHandle: "",
        projectTitle: "",
        serviceTypes: [],
        projectDescription: "",
        currentStage: "",
        designPreference: "",
        techStack: "",
        featuresRequired: "",
        estimatedBudget: "",
        deadline: "",
        urgencyLevel: "Standard",
        competitorWebsites: "",
        referralSource: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const [heroRef, heroVisible] = useScrollAnimation<HTMLDivElement>();
    const [formRef, formVisible] = useScrollAnimation<HTMLDivElement>();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checkbox = e.target as HTMLInputElement;
            const serviceId = checkbox.value;

            setFormData(prev => ({
                ...prev,
                serviceTypes: checkbox.checked
                    ? [...prev.serviceTypes, serviceId]
                    : prev.serviceTypes.filter(id => id !== serviceId)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch('/api/service-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit request');
            }

            setSubmitStatus("success");
            setFormData({
                fullName: "",
                companyName: "",
                email: "",
                phone: "",
                preferredContact: "Email",
                contactHandle: "",
                projectTitle: "",
                serviceTypes: [],
                projectDescription: "",
                currentStage: "",
                designPreference: "",
                techStack: "",
                featuresRequired: "",
                estimatedBudget: "",
                deadline: "",
                urgencyLevel: "Standard",
                competitorWebsites: "",
                referralSource: "",
            });
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeSuccessModal = () => {
        setSubmitStatus("idle");
    };

    return (
        <div className={styles.servicesPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div
                    ref={heroRef}
                    className={`${styles.heroContainer} scroll-reveal ${heroVisible ? "visible" : ""}`}
                >
                    <span className={styles.heroTag}>
                        <FaRocket /> Request Services
                    </span>
                    <h1>
                        Let&apos;s Build Something <span className={styles.gradient}>Amazing</span>
                    </h1>
                    <p>
                        Whether you need a stunning website, a powerful mobile app, or custom software solutions,
                        I&apos;m here to bring your vision to life. Fill out the form below to get started.
                    </p>
                </div>
                <ScrollIndicator />
            </section>

            {/* Form Section */}
            <section className={styles.formSection}>
                <div className={styles.container}>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className={`${styles.requestForm} scroll-reveal ${formVisible ? "visible" : ""}`}
                    >
                        {/* Contact Information */}
                        <div className={styles.formCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}><FaUser /></span>
                                <h2>Contact Information</h2>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="fullName">Full Name <span className={styles.required}>*</span></label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="companyName">Business/Company Name</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="Your Company (Optional)"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email Address <span className={styles.required}>*</span></label>
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

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="preferredContact">Preferred Communication <span className={styles.required}>*</span></label>
                                    <select
                                        id="preferredContact"
                                        name="preferredContact"
                                        value={formData.preferredContact}
                                        onChange={handleChange}
                                        required
                                    >
                                        {communicationMethods.map(method => (
                                            <option key={method} value={method}>{method}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Conditional Contact Handle Field */}
                                {formData.preferredContact !== "Email" && (
                                    <div className={styles.formGroup}>
                                        <label htmlFor="contactHandle">
                                            {formData.preferredContact === "Slack" && "Slack Workspace/Username"}
                                            {formData.preferredContact === "WhatsApp" && "WhatsApp Number"}
                                            {formData.preferredContact === "Discord" && "Discord Username"}
                                            {formData.preferredContact === "Video Call" && "Preferred Platform (Zoom/Meet/Teams)"}
                                            <span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="contactHandle"
                                            name="contactHandle"
                                            value={formData.contactHandle}
                                            onChange={handleChange}
                                            placeholder={
                                                formData.preferredContact === "Slack" ? "workspace-name or @username" :
                                                    formData.preferredContact === "WhatsApp" ? "+1 234 567 8900" :
                                                        formData.preferredContact === "Discord" ? "username#1234 or username" :
                                                            "e.g., Zoom, Google Meet"
                                            }
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Overview */}
                        <div className={styles.formCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}><FaClipboardList /></span>
                                <h2>Project Overview</h2>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="projectTitle">Project Title <span className={styles.required}>*</span></label>
                                <input
                                    type="text"
                                    id="projectTitle"
                                    name="projectTitle"
                                    value={formData.projectTitle}
                                    onChange={handleChange}
                                    placeholder="E-commerce Website Redesign"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Service Type <span className={styles.required}>*</span></label>
                                <div className={styles.serviceGrid}>
                                    {serviceOptions.map(service => (
                                        <label
                                            key={service.id}
                                            className={`${styles.serviceOption} ${formData.serviceTypes.includes(service.id) ? styles.selected : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                name="serviceTypes"
                                                value={service.id}
                                                checked={formData.serviceTypes.includes(service.id)}
                                                onChange={handleChange}
                                            />
                                            <span className={styles.serviceIcon}>{service.icon}</span>
                                            <span className={styles.serviceLabel}>{service.label}</span>
                                            <FaCheckCircle className={styles.checkIcon} />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="projectDescription">Project Description/Scope <span className={styles.required}>*</span></label>
                                <textarea
                                    id="projectDescription"
                                    name="projectDescription"
                                    value={formData.projectDescription}
                                    onChange={handleChange}
                                    placeholder="Describe your project in detail. What problem are you trying to solve? What are your goals?"
                                    rows={5}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Technical & Design Specifics */}
                        <div className={styles.formCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}><FaCogs /></span>
                                <h2>Technical & Design Specifics</h2>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="currentStage">Current Stage of Project <span className={styles.required}>*</span></label>
                                    <select
                                        id="currentStage"
                                        name="currentStage"
                                        value={formData.currentStage}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select stage...</option>
                                        {projectStages.map(stage => (
                                            <option key={stage} value={stage}>{stage}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="techStack">Preferred Tech Stack</label>
                                    <input
                                        type="text"
                                        id="techStack"
                                        name="techStack"
                                        value={formData.techStack}
                                        onChange={handleChange}
                                        placeholder="e.g., MERN, React, Python"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Design/Template Preference <span className={styles.required}>*</span></label>
                                <div className={styles.radioGroup}>
                                    {designPreferences.map(pref => (
                                        <label key={pref.value} className={styles.radioOption}>
                                            <input
                                                type="radio"
                                                name="designPreference"
                                                value={pref.value}
                                                checked={formData.designPreference === pref.value}
                                                onChange={handleChange}
                                                required
                                            />
                                            <span className={styles.radioCustom}></span>
                                            <span className={styles.radioLabel}>{pref.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="featuresRequired">Specific Features Required</label>
                                <textarea
                                    id="featuresRequired"
                                    name="featuresRequired"
                                    value={formData.featuresRequired}
                                    onChange={handleChange}
                                    placeholder="e.g., Payment Gateway, User Authentication, AI Integration, Admin Dashboard..."
                                    rows={3}
                                ></textarea>
                            </div>
                        </div>

                        {/* Timeline & Budget */}
                        <div className={styles.formCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}><FaMoneyBillWave /></span>
                                <h2>Timeline & Budget</h2>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="estimatedBudget">Estimated Budget <span className={styles.required}>*</span></label>
                                    <select
                                        id="estimatedBudget"
                                        name="estimatedBudget"
                                        value={formData.estimatedBudget}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select budget range...</option>
                                        {budgetRanges.map(range => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="deadline">Project Deadline</label>
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="urgencyLevel">Urgency Level <span className={styles.required}>*</span></label>
                                    <select
                                        id="urgencyLevel"
                                        name="urgencyLevel"
                                        value={formData.urgencyLevel}
                                        onChange={handleChange}
                                        required
                                    >
                                        {urgencyLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className={styles.formCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}><FaInfoCircle /></span>
                                <h2>Additional Information</h2>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="competitorWebsites">Competitor/Reference Websites</label>
                                    <input
                                        type="text"
                                        id="competitorWebsites"
                                        name="competitorWebsites"
                                        value={formData.competitorWebsites}
                                        onChange={handleChange}
                                        placeholder="https://example.com, https://competitor.com"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="referralSource">How did you hear about me?</label>
                                    <select
                                        id="referralSource"
                                        name="referralSource"
                                        value={formData.referralSource}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select an option...</option>
                                        {referralSources.map(source => (
                                            <option key={source} value={source}>{source}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className={styles.submitSection}>
                            <button
                                type="submit"
                                className={`btn-primary ${styles.submitBtn}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Request
                                        <FaPaperPlane />
                                    </>
                                )}
                            </button>

                            {submitStatus === "error" && (
                                <div className={styles.errorMessage}>
                                    <span>✗</span> {errorMessage || "Something went wrong. Please try again."}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </section>

            {/* Success Modal */}
            {submitStatus === "success" && (
                <div className={styles.successOverlay} onClick={closeSuccessModal}>
                    <div className={styles.successModal} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeSuccessModal}>
                            <FaTimes />
                        </button>

                        <div className={styles.successAnimation}>
                            <LottieAnimation
                                animationData={successAnimation}
                                loop={false}
                                style={{ width: "150px", height: "150px" }}
                            />
                        </div>

                        <h2>Thank You! 🎉</h2>
                        <p className={styles.successTitle}>Your Request Has Been Submitted Successfully</p>
                        <p className={styles.successDesc}>
                            I appreciate your interest in working together! I&apos;ve received your project details
                            and will review them carefully. Expect to hear back from me within 24-48 hours.
                        </p>

                        <div className={styles.successActions}>
                            <Link href="/" className="btn-primary">
                                Back to Home
                                <FaArrowRight />
                            </Link>
                            <Link href="/blogs" className="btn-secondary">
                                Read My Blogs
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
