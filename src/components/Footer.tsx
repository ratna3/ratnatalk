import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.branding}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/images/logo.png"
                                alt="RK Talks Logo"
                                width={65}
                                height={65}
                                className={styles.logoImage}
                                unoptimized
                            />
                            <span className={styles.logoText}>RK Talks</span>
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
                            <a href="https://github.com/ratna3" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://x.com/RatnaKirti1" target="_blank" rel="noopener noreferrer">Twitter/X</a>
                            <a href="https://discord.gg/n2Zrr4c5NU" target="_blank" rel="noopener noreferrer">Discord</a>
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
