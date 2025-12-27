"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import writingAnimation from "@/animations/writing.json";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

// Sample blog data - in production, this would come from a CMS or database
const allBlogs = [
    {
        id: 1,
        title: "The Art of Building Scalable Systems",
        excerpt:
            "Exploring the principles and patterns that make software systems truly scalable and maintainable over time. Learn how to design systems that grow with your business.",
        date: "Dec 25, 2024",
        category: "Technology",
        readTime: "8 min read",
        featured: true,
    },
    {
        id: 2,
        title: "Leadership in the Digital Age",
        excerpt:
            "How modern leaders can navigate the complexities of digital transformation while maintaining team cohesion and driving innovation.",
        date: "Dec 20, 2024",
        category: "Leadership",
        readTime: "6 min read",
        featured: true,
    },
    {
        id: 3,
        title: "Mastering Cloud Architecture",
        excerpt:
            "A comprehensive guide to designing robust cloud-native applications that stand the test of time and scale efficiently.",
        date: "Dec 15, 2024",
        category: "Cloud",
        readTime: "10 min read",
        featured: true,
    },
    {
        id: 4,
        title: "The Power of Continuous Learning",
        excerpt:
            "Why lifelong learning is essential in today's rapidly evolving tech landscape and how to build effective learning habits.",
        date: "Dec 10, 2024",
        category: "Personal Growth",
        readTime: "5 min read",
        featured: false,
    },
    {
        id: 5,
        title: "Understanding Microservices Architecture",
        excerpt:
            "Deep dive into microservices patterns, best practices, and when to use them versus monolithic approaches.",
        date: "Dec 5, 2024",
        category: "Technology",
        readTime: "12 min read",
        featured: false,
    },
    {
        id: 6,
        title: "Effective Communication for Tech Leaders",
        excerpt:
            "Master the art of communication to lead engineering teams effectively and drive successful project outcomes.",
        date: "Nov 30, 2024",
        category: "Leadership",
        readTime: "7 min read",
        featured: false,
    },
    {
        id: 7,
        title: "DevOps Best Practices 2024",
        excerpt:
            "Essential DevOps practices every team should adopt to improve deployment frequency and system reliability.",
        date: "Nov 25, 2024",
        category: "DevOps",
        readTime: "9 min read",
        featured: false,
    },
    {
        id: 8,
        title: "Building High-Performance Teams",
        excerpt:
            "Strategies for creating and nurturing engineering teams that consistently deliver exceptional results.",
        date: "Nov 20, 2024",
        category: "Leadership",
        readTime: "8 min read",
        featured: false,
    },
    {
        id: 9,
        title: "Introduction to System Design",
        excerpt:
            "A beginner-friendly guide to understanding system design principles and preparing for technical interviews.",
        date: "Nov 15, 2024",
        category: "Technology",
        readTime: "15 min read",
        featured: false,
    },
];

const categories = [
    "All",
    "Technology",
    "Leadership",
    "Cloud",
    "Personal Growth",
    "DevOps",
];

export default function BlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = allBlogs.filter((blog) => {
        const matchesCategory =
            selectedCategory === "All" || blog.category === selectedCategory;
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={styles.blogsPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroTag}>Insights & Stories</span>
                        <h1>
                            My <span className={styles.gradient}>Blog</span>
                        </h1>
                        <p>
                            Explore my thoughts on technology, leadership, and personal
                            growth. Each article is crafted to inspire and educate.
                        </p>
                    </div>
                    <div className={styles.heroAnimation}>
                        <LottieAnimation
                            animationData={writingAnimation}
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className={styles.filtersSection}>
                <div className={styles.container}>
                    <div className={styles.searchBar}>
                        <svg
                            className={styles.searchIcon}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.categories}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className={styles.blogsSection}>
                <div className={styles.container}>
                    {filteredBlogs.length > 0 ? (
                        <div className={styles.blogsGrid}>
                            {filteredBlogs.map((blog, index) => (
                                <article
                                    key={blog.id}
                                    className={`${styles.blogCard} ${blog.featured ? styles.featured : ""
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {blog.featured && (
                                        <span className={styles.featuredBadge}>Featured</span>
                                    )}
                                    <div className={styles.blogCardHeader}>
                                        <span className={styles.blogCategory}>{blog.category}</span>
                                        <span className={styles.blogDate}>{blog.date}</span>
                                    </div>
                                    <h2 className={styles.blogTitle}>{blog.title}</h2>
                                    <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                                    <div className={styles.blogCardFooter}>
                                        <span className={styles.readTime}>{blog.readTime}</span>
                                        <Link
                                            href={`/blogs/${blog.id}`}
                                            className={styles.readMore}
                                        >
                                            Read Article
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <h3>No articles found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                            <button
                                className="btn-primary"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className={styles.newsletterSection}>
                <div className={styles.container}>
                    <div className={styles.newsletterContent}>
                        <h2>Stay Updated</h2>
                        <p>
                            Subscribe to get notified when I publish new articles. No spam,
                            just quality content.
                        </p>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles.emailInput}
                            />
                            <button type="submit" className="btn-primary">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
