"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu or side menu is open
    useEffect(() => {
        if (isMobileMenuOpen || isSideMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen, isSideMenuOpen]);

    // Main navigation links (without Admin)
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/blogs", label: "Blogs" },
        { href: "/certifications", label: "Certifications" },
        { href: "/services", label: "Services" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    // All links including Admin for mobile menu
    const allNavLinks = [
        ...navLinks,
        { href: "/login", label: "Admin" },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/images/logo.png"
                        alt="RK Talks Logo"
                        width={75}
                        height={75}
                        className={styles.logoImage}
                        unoptimized
                    />
                    <span className={styles.logoText}>RK Talks</span>
                </Link>

                <div className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.navLink}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Hamburger for Side Menu */}
                <button
                    className={styles.sideMenuBtn}
                    onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                    aria-label="Toggle side menu"
                >
                    <span className={`${styles.hamburger} ${isSideMenuOpen ? styles.active : ""}`}></span>
                </button>

                {/* Mobile Hamburger */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ""}`}></span>
                </button>
            </div>

            {/* Side Menu Overlay */}
            <div
                className={`${styles.sideMenuOverlay} ${isSideMenuOpen ? styles.open : ""}`}
                onClick={() => setIsSideMenuOpen(false)}
            />

            {/* Side Menu (Desktop - Admin Login) */}
            <div className={`${styles.sideMenu} ${isSideMenuOpen ? styles.open : ""}`}>
                <button
                    className={styles.sideMenuCloseBtn}
                    onClick={() => setIsSideMenuOpen(false)}
                    aria-label="Close side menu"
                >
                    ✕
                </button>
                <div className={styles.sideMenuContent}>
                    <h3 className={styles.sideMenuTitle}>Admin Access</h3>
                    <Link
                        href="/login"
                        className={styles.sideMenuLink}
                        onClick={() => setIsSideMenuOpen(false)}
                    >
                        <span className={styles.sideMenuIcon}>🔐</span>
                        Admin Login
                    </Link>
                </div>
            </div>

            {/* Mobile Menu - Outside container for proper fixed positioning */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
                <button
                    className={styles.mobileCloseBtn}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                {allNavLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={styles.mobileNavLink}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
