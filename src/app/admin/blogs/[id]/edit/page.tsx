"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../new/page.module.css";

export default function EditBlogPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkAuth();
        fetchBlog();
    }, [id]);

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

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blogs/${id}`);
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
            } else {
                setError("Blog not found");
            }
        } catch {
            setError("Failed to load blog");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Failed to update blog");
                return;
            }

            router.push("/admin");
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.editorPage}>
                <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className={styles.editorPage}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link href="/admin" className={styles.backBtn}>
                        ← Back to Dashboard
                    </Link>
                    <h1>Edit Blog Post</h1>
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
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
