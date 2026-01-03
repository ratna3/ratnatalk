"use client";

import { use, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import styles from "./page.module.css";

interface Blog {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

// Helper functions
const getCategory = (content: string): string => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('leadership') || lowerContent.includes('team')) return 'Leadership';
    if (lowerContent.includes('cloud') || lowerContent.includes('aws') || lowerContent.includes('azure')) return 'Cloud';
    if (lowerContent.includes('devops') || lowerContent.includes('ci/cd') || lowerContent.includes('pipeline')) return 'DevOps';
    if (lowerContent.includes('learning') || lowerContent.includes('growth') || lowerContent.includes('career')) return 'Personal Growth';
    return 'Technology';
};

const getReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
};

const getTags = (content: string): string[] => {
    const tags: string[] = [];
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('architecture')) tags.push('Architecture');
    if (lowerContent.includes('scalab')) tags.push('Scalability');
    if (lowerContent.includes('system design')) tags.push('System Design');
    if (lowerContent.includes('backend')) tags.push('Backend');
    if (lowerContent.includes('leadership')) tags.push('Leadership');
    if (lowerContent.includes('team')) tags.push('Team Building');
    if (lowerContent.includes('cloud')) tags.push('Cloud');
    if (lowerContent.includes('aws')) tags.push('AWS');
    if (lowerContent.includes('microservice')) tags.push('Microservices');
    if (lowerContent.includes('devops')) tags.push('DevOps');
    if (lowerContent.includes('ci/cd')) tags.push('CI/CD');

    return tags.slice(0, 4);
};

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function BlogDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetchBlog();
        fetchRelatedBlogs();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blogs/${id}`);
            if (response.ok) {
                const data = await response.json();
                setBlog(data);
            } else if (response.status === 404) {
                setNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedBlogs = async () => {
        try {
            const response = await fetch('/api/blogs?limit=3');
            if (response.ok) {
                const data = await response.json();
                // Filter out current blog
                setRelatedBlogs(data.filter((b: Blog) => b.id !== parseInt(id)));
            }
        } catch (error) {
            console.error('Error fetching related blogs:', error);
        }
    };

    if (loading) {
        return (
            <div className={styles.blogDetail}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div className={styles.blogDetail}>
                <div className={styles.notFound}>
                    <h1>Blog Not Found</h1>
                    <p>The blog you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/blogs" className="btn-primary">
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    const category = getCategory(blog.content);
    const readTime = getReadTime(blog.content);
    const tags = getTags(blog.content);
    const date = formatDate(blog.created_at);

    return (
        <div className={styles.blogDetail}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContainer}>
                    <Link href="/blogs" className={styles.backLink}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Blogs
                    </Link>

                    <div className={styles.heroMeta}>
                        <span className={styles.category}>{category}</span>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.readTime}>{readTime}</span>
                    </div>

                    <h1 className={styles.title}>{blog.title}</h1>

                    <div className={styles.author}>
                        <div className={styles.authorAvatar}>RK</div>
                        <div className={styles.authorInfo}>
                            <span className={styles.authorName}>RK</span>
                            <span className={styles.authorRole}>Author & Cloud Architect</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <article className={styles.article}>
                        <div className={styles.markdown}>
                            <ReactMarkdown>{blog.content}</ReactMarkdown>
                        </div>
                    </article>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className={styles.tags}>
                            <span className={styles.tagsLabel}>Tags:</span>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Share */}
                    <div className={styles.share}>
                        <span className={styles.shareLabel}>Share this article:</span>
                        <div className={styles.shareButtons}>
                            <button className={styles.shareBtn} aria-label="Share on Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </button>
                            <button className={styles.shareBtn} aria-label="Share on LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </button>
                            <button className={styles.shareBtn} aria-label="Copy link">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className={styles.container}>
                        <h2>Related Articles</h2>
                        <div className={styles.relatedGrid}>
                            {relatedBlogs.slice(0, 2).map((relatedBlog) => (
                                <Link
                                    key={relatedBlog.id}
                                    href={`/blogs/${relatedBlog.id}`}
                                    className={styles.relatedCard}
                                >
                                    <span className={styles.relatedCategory}>{getCategory(relatedBlog.content)}</span>
                                    <h3>{relatedBlog.title}</h3>
                                    <div className={styles.relatedMeta}>
                                        <span>{formatDate(relatedBlog.created_at)}</span>
                                        <span>{getReadTime(relatedBlog.content)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
