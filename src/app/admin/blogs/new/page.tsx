"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function NewBlogPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/admin/session");
            if (!response.ok) {
                router.push("/login");
            }
        } catch {
            router.push("/login");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Failed to create blog");
                return;
            }

            router.push("/admin");
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.editorPage}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/admin" className={styles.backBtn}>
                        ← Back to Dashboard
                    </Link>
                    <h1>New Blog Post</h1>
                </div>
            </header>

            <main className={styles.main}>
                <form onSubmit={handleSubmit} className={styles.editorForm}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title..."
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content">Content</label>
                        <p className={styles.hint}>
                            Supports Markdown: ## Heading, **bold**, - list items
                        </p>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog content here..."
                            required
                            rows={20}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <Link href="/admin" className={styles.cancelBtn}>
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className={styles.saveBtn}
                            disabled={saving}
                        >
                            {saving ? "Creating..." : "Create Blog"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
