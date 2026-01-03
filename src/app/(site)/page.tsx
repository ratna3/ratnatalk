"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import writingAnimation from "@/animations/writing.json";
import scrollAnimation from "@/animations/scroll.json";
import sparkAnimation from "@/animations/spark.json";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

// Helper functions
const getExcerpt = (content: string, maxLength: number = 120): string => {
  const plainText = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/- /g, '')
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

const stats = [
  { number: "50+", label: "Articles Published" },
  { number: "10K+", label: "Readers" },
  { number: "15+", label: "Certifications" },
  { number: "5+", label: "Years Experience" },
];

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [statsRef, statsVisible] = useScrollAnimation<HTMLDivElement>();
  const [blogsHeaderRef, blogsHeaderVisible] = useScrollAnimation<HTMLDivElement>();
  const [blogsGridRef, blogsGridVisible] = useScrollAnimation<HTMLDivElement>();
  const [aboutContentRef, aboutContentVisible] = useScrollAnimation<HTMLDivElement>();
  const [aboutVisualRef, aboutVisualVisible] = useScrollAnimation<HTMLDivElement>();
  const [ctaRef, ctaVisible] = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?featured=true&limit=3');
      if (response.ok) {
        const data = await response.json();
        setFeaturedBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const blogsWithMeta = featuredBlogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    excerpt: getExcerpt(blog.content),
    date: formatDate(blog.created_at),
    category: getCategory(blog.content),
    readTime: getReadTime(blog.content),
  }));

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}></div>
          <div className={styles.heroPattern}></div>
        </div>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>Welcome to</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.gradient}>RK</span> Talks
            </h1>
            <p className={styles.heroSubtitle}>
              Insights, experiences, and knowledge shared through thoughtful
              writing. Explore my journey in technology, leadership, and
              continuous learning.
            </p>
            <div className={styles.heroCta}>
              <Link href="/blogs" className="btn-primary">
                Explore Blogs
                <FaArrowRight />
              </Link>
              <Link href="/certifications" className="btn-secondary">
                View Certifications
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.profileImageWrapper}>
              <Image
                src="/images/myself.jpg"
                alt="RK Profile"
                width={450}
                height={450}
                className={styles.profileImage}
                priority
              />
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <LottieAnimation
            animationData={scrollAnimation}
            style={{ width: "50px", height: "80px" }}
          />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div
            ref={statsRef}
            className={`${styles.statsGrid} scroll-reveal ${statsVisible ? "visible" : ""}`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${styles.statCard} stagger-${index + 1}`}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className={styles.blogsSection}>
        <div className={styles.container}>
          <div
            ref={blogsHeaderRef}
            className={`${styles.sectionHeader} scroll-reveal ${blogsHeaderVisible ? "visible" : ""}`}
          >
            <div className={styles.sectionHeaderContent}>
              <span className={styles.sectionTag}>Latest Insights</span>
              <h2>Featured Blogs</h2>
              <div className="divider"></div>
              <p>
                Dive into my latest thoughts on technology, leadership, and
                personal growth
              </p>
            </div>
            <div className={styles.sectionAnimation}>
              <LottieAnimation
                animationData={writingAnimation}
                style={{ width: "150px", height: "150px" }}
              />
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingBlogs}>Loading blogs...</div>
          ) : (
            <div
              ref={blogsGridRef}
              className={`${styles.blogsGrid} scroll-reveal-flip ${blogsGridVisible ? "visible" : ""}`}
            >
              {blogsWithMeta.map((blog, index) => (
                <article
                  key={blog.id}
                  className={`${styles.blogCard} stagger-${index + 1}`}
                >
                  <div className={styles.blogCardHeader}>
                    <span className={styles.blogCategory}>{blog.category}</span>
                    <span className={styles.blogDate}>{blog.date}</span>
                  </div>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                  <div className={styles.blogCardFooter}>
                    <span className={styles.readTime}>{blog.readTime}</span>
                    <Link
                      href={`/blogs/${blog.id}`}
                      className={styles.readMore}
                    >
                      Read More
                      <FaArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className={styles.viewAllContainer}>
            <Link href="/blogs" className="btn-primary">
              View All Blogs
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className={styles.aboutPreview}>
        <div className={styles.container}>
          <div
            ref={aboutContentRef}
            className={`${styles.aboutContent} scroll-reveal-left ${aboutContentVisible ? "visible" : ""}`}
          >
            <span className={styles.sectionTag}>About Me</span>
            <h2>
              Hi, I&apos;m <span className={styles.gradient}>RK</span>
            </h2>
            <div className="divider"></div>
            <p>
              A passionate technologist and lifelong learner dedicated to
              sharing knowledge and experiences. Through RK Talks, I aim to
              inspire others by documenting my journey in technology,
              leadership, and personal development.
            </p>
            <p>
              With multiple certifications and years of hands-on experience, I
              believe in the power of continuous learning and the importance of
              giving back to the community.
            </p>
            <Link href="/about" className="btn-secondary">
              Learn More About Me
              <FaArrowRight />
            </Link>
          </div>
          <div
            ref={aboutVisualRef}
            className={`${styles.aboutVisual} scroll-reveal-right ${aboutVisualVisible ? "visible" : ""}`}
          >
            <div className={styles.aboutCard}>
              <div className={styles.sparkEffect}>
                <LottieAnimation
                  animationData={sparkAnimation}
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <div className={styles.aboutCardInner}>
                <span className={styles.quoteIcon}>
                  <FaQuoteLeft />
                </span>
                <p>
                  The best way to predict the future is to create it through
                  continuous learning and action.
                </p>
                <span className={styles.quoteAuthor}>- RK</span>
              </div>
            </div>
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
            <h2>Ready to Start Learning?</h2>
            <p>
              Explore my collection of articles and certifications to fuel your
              growth journey.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/blogs" className="btn-primary">
                Browse Blogs
                <FaArrowRight />
              </Link>
              <Link href="/certifications" className="btn-secondary">
                View Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
