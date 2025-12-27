import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.branding}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoRk}>RK</span>
                            <span className={styles.logoTalks}>Talks</span>
                        </Link>
                        <p className={styles.tagline}>
                            Sharing insights, experiences, and knowledge through thoughtful content.
                        </p>
                    </div>

                    <div className={styles.linksSection}>
                        <div className={styles.linkGroup}>
                            <h4>Quick Links</h4>
                            <Link href="/">Home</Link>
                            <Link href="/blogs">Blogs</Link>
                            <Link href="/certifications">Certifications</Link>
                            <Link href="/about">About</Link>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4>Connect</h4>
                            <Link href="/contact">Contact</Link>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomSection}>
                    <p>© {currentYear} RK Talks. All rights reserved.</p>
                    <p className={styles.madeWith}>
                        Made with <span className={styles.heart}>♥</span> by RK
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
