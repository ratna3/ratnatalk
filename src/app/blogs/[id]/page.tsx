"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

// Sample blog data - in production, this would come from a CMS or database
const blogs = [
    {
        id: 1,
        title: "The Art of Building Scalable Systems",
        content: `
      Building scalable systems is both an art and a science. It requires deep understanding of 
      architecture patterns, careful consideration of trade-offs, and a vision for future growth.

      ## Understanding Scalability

      Scalability isn't just about handling more users or data. It's about designing systems that 
      can grow gracefully without requiring complete rewrites. A truly scalable system maintains 
      its performance characteristics as load increases.

      ### Horizontal vs Vertical Scaling

      **Vertical scaling** (scaling up) involves adding more resources to existing servers. While 
      simpler, it has physical limits and can become prohibitively expensive.

      **Horizontal scaling** (scaling out) involves adding more machines to handle increased load. 
      This approach offers better fault tolerance and is generally more cost-effective at scale.

      ## Key Principles

      1. **Design for failure** - Assume components will fail and plan accordingly
      2. **Embrace eventual consistency** - Not everything needs to be immediately consistent
      3. **Cache aggressively** - Reduce database load through smart caching strategies
      4. **Decompose monoliths** - Break down large systems into manageable services

      ## Practical Strategies

      ### Database Optimization
      
      Start with proper indexing and query optimization. Consider read replicas for read-heavy 
      workloads and implement connection pooling to manage database connections efficiently.

      ### Caching Layers

      Implement multi-level caching: browser cache, CDN, application cache, and database cache. 
      Each layer reduces load on the layers below it.

      ### Load Balancing

      Distribute traffic across multiple servers using load balancers. Consider both layer 4 
      (TCP) and layer 7 (HTTP) load balancing based on your needs.

      ## Conclusion

      Building scalable systems is a journey, not a destination. Start with solid foundations, 
      measure everything, and iterate based on real-world data. Remember, premature optimization 
      is the root of all evil, but so is ignoring scalability entirely.
    `,
        date: "Dec 25, 2024",
        category: "Technology",
        readTime: "8 min read",
        author: "RK",
        tags: ["Architecture", "Scalability", "System Design", "Backend"],
    },
    {
        id: 2,
        title: "Leadership in the Digital Age",
        content: `
      The role of leadership has evolved dramatically in the digital age. Traditional command-and-control 
      approaches are giving way to more collaborative, empowering styles of leadership.

      ## The Changing Landscape

      Digital transformation has fundamentally changed how organizations operate. Leaders must now 
      navigate remote teams, rapid technological change, and increased expectations for transparency 
      and agility.

      ## Key Leadership Qualities

      ### Adaptability
      
      The pace of change requires leaders who can pivot quickly and embrace uncertainty. Rigid 
      adherence to plans is less valuable than the ability to respond to new information.

      ### Emotional Intelligence

      Understanding and managing emotions—both your own and others'—is crucial when leading 
      distributed teams and managing through change.

      ### Technical Fluency

      While leaders don't need to be technical experts, they must understand technology well 
      enough to make informed decisions and communicate effectively with technical teams.

      ## Building High-Performance Teams

      1. **Trust your team** - Micromanagement kills motivation
      2. **Provide context** - Help people understand the "why"
      3. **Create psychological safety** - Encourage experimentation and learning from failure
      4. **Celebrate wins** - Recognition drives engagement

      ## Conclusion

      Leadership in the digital age requires a blend of traditional wisdom and new approaches. 
      The best leaders are those who continue learning and adapting alongside their teams.
    `,
        date: "Dec 20, 2024",
        category: "Leadership",
        readTime: "6 min read",
        author: "RK",
        tags: ["Leadership", "Management", "Team Building", "Digital Transformation"],
    },
    {
        id: 3,
        title: "Mastering Cloud Architecture",
        content: `
      Cloud architecture has become the backbone of modern software systems. Understanding how to 
      design and implement cloud-native applications is essential for any technology professional.

      ## Cloud Computing Fundamentals

      Cloud computing offers on-demand access to computing resources without direct active management 
      by the user. The three main service models are:

      - **IaaS** (Infrastructure as a Service)
      - **PaaS** (Platform as a Service)
      - **SaaS** (Software as a Service)

      ## Designing for the Cloud

      ### Microservices Architecture

      Break applications into small, independently deployable services. Each service should have a 
      single responsibility and communicate through well-defined APIs.

      ### Containerization

      Containers provide consistent environments across development, testing, and production. 
      Kubernetes has become the standard for container orchestration.

      ### Serverless Computing

      For certain workloads, serverless architectures can reduce operational overhead and costs. 
      Functions like AWS Lambda or Azure Functions scale automatically based on demand.

      ## Best Practices

      1. **Infrastructure as Code** - Manage infrastructure through version-controlled code
      2. **Immutable Infrastructure** - Replace rather than modify infrastructure components
      3. **Observability** - Implement comprehensive logging, monitoring, and tracing
      4. **Security by Design** - Build security into every layer from the start

      ## Cost Optimization

      Cloud costs can spiral quickly without proper governance. Implement:
      
      - Resource tagging and allocation
      - Auto-scaling policies
      - Reserved instances for predictable workloads
      - Regular cost reviews

      ## Conclusion

      Mastering cloud architecture is an ongoing journey. Stay current with new services and 
      patterns, but always focus on solving real business problems efficiently.
    `,
        date: "Dec 15, 2024",
        category: "Cloud",
        readTime: "10 min read",
        author: "RK",
        tags: ["Cloud", "AWS", "Architecture", "Microservices"],
    },
];

export default function BlogDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const blogId = parseInt(id, 10);
    const blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
        notFound();
    }

    // Find related blogs
    const relatedBlogs = blogs
        .filter((b) => b.id !== blog.id && b.category === blog.category)
        .slice(0, 2);

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        return content.split("\n").map((line, index) => {
            line = line.trim();
            if (!line) return <br key={index} />;
            if (line.startsWith("## ")) {
                return (
                    <h2 key={index} className={styles.contentH2}>
                        {line.slice(3)}
                    </h2>
                );
            }
            if (line.startsWith("### ")) {
                return (
                    <h3 key={index} className={styles.contentH3}>
                        {line.slice(4)}
                    </h3>
                );
            }
            if (line.startsWith("- ")) {
                return (
                    <li key={index} className={styles.listItem}>
                        {line.slice(2)}
                    </li>
                );
            }
            if (line.match(/^\d+\./)) {
                return (
                    <li key={index} className={styles.listItem}>
                        {line.slice(3)}
                    </li>
                );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
                return (
                    <p key={index} className={styles.boldText}>
                        {line.slice(2, -2)}
                    </p>
                );
            }
            return (
                <p key={index} className={styles.paragraph}>
                    {line}
                </p>
            );
        });
    };

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
                        <span className={styles.category}>{blog.category}</span>
                        <span className={styles.date}>{blog.date}</span>
                        <span className={styles.readTime}>{blog.readTime}</span>
                    </div>

                    <h1 className={styles.title}>{blog.title}</h1>

                    <div className={styles.author}>
                        <div className={styles.authorAvatar}>RK</div>
                        <div className={styles.authorInfo}>
                            <span className={styles.authorName}>{blog.author}</span>
                            <span className={styles.authorRole}>Author & Cloud Architect</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <article className={styles.article}>{renderContent(blog.content)}</article>

                    {/* Tags */}
                    <div className={styles.tags}>
                        <span className={styles.tagsLabel}>Tags:</span>
                        {blog.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>

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
                            {relatedBlogs.map((relatedBlog) => (
                                <Link
                                    key={relatedBlog.id}
                                    href={`/blogs/${relatedBlog.id}`}
                                    className={styles.relatedCard}
                                >
                                    <span className={styles.relatedCategory}>{relatedBlog.category}</span>
                                    <h3>{relatedBlog.title}</h3>
                                    <div className={styles.relatedMeta}>
                                        <span>{relatedBlog.date}</span>
                                        <span>{relatedBlog.readTime}</span>
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
