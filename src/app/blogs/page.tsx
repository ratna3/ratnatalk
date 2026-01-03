"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import writingAnimation from "@/animations/writing.json";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
    ssr: false,
});

interface Blog {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

// Helper functions to extract blog metadata from content
const getExcerpt = (content: string, maxLength: number = 150): string => {
    // Remove markdown formatting and get first paragraph
    const plainText = content
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, '') // Remove italic
        .replace(/- /g, '') // Remove list markers
        .split('\n')
        .filter(line => line.trim())
        .join(' ')
        .trim();

    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
};

const getReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
};

const getCategory = (content: string): string => {
    // Extract category from content based on keywords
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('leadership') || lowerContent.includes('team')) return 'Leadership';
    if (lowerContent.includes('cloud') || lowerContent.includes('aws') || lowerContent.includes('azure')) return 'Cloud';
    if (lowerContent.includes('devops') || lowerContent.includes('ci/cd') || lowerContent.includes('pipeline')) return 'DevOps';
    if (lowerContent.includes('learning') || lowerContent.includes('growth') || lowerContent.includes('career')) return 'Personal Growth';
    return 'Technology';
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const categories = [
    "All",
    "Technology",
    "Leadership",
    "Cloud",
    "Personal Growth",
    "DevOps",
];

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const [filtersRef, filtersVisible] = useScrollAnimation<HTMLDivElement>();
    const [blogsGridRef, blogsGridVisible] = useScrollAnimation<HTMLDivElement>();
    const [newsletterRef, newsletterVisible] = useScrollAnimation<HTMLDivElement>();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBlogs = blogs.filter((blog) => {
        const category = getCategory(blog.content);
        const matchesCategory =
            selectedCategory === "All" || category === selectedCategory;
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Mark first 3 as featured
    const blogsWithMeta = filteredBlogs.map((blog, index) => ({
        ...blog,
        category: getCategory(blog.content),
        excerpt: getExcerpt(blog.content),
        readTime: getReadTime(blog.content),
        date: formatDate(blog.created_at),
        featured: index < 3,
    }));

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
                <div
                    ref={filtersRef}
                    className={`${styles.container} scroll-reveal ${filtersVisible ? "visible" : ""}`}
                >
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
                    {loading ? (
                        <div className={styles.loading}>Loading blogs...</div>
                    ) : blogsWithMeta.length > 0 ? (
                        <div
                            ref={blogsGridRef}
                            className={`${styles.blogsGrid} scroll-reveal-float ${blogsGridVisible ? "visible" : ""}`}
                        >
                            {blogsWithMeta.map((blog, index) => (
                                <article
                                    key={blog.id}
                                    className={`${styles.blogCard} ${blog.featured ? styles.featured : ""} stagger-${Math.min(index + 1, 10)}`}
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
                    <div
                        ref={newsletterRef}
                        className={`${styles.newsletterContent} scroll-reveal-zoom ${newsletterVisible ? "visible" : ""}`}
                    >
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
