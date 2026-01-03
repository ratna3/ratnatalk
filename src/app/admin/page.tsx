"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

interface Blog {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        checkAuth();
        fetchBlogs();
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

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blogs");
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setBlogs(blogs.filter((blog) => blog.id !== id));
                setDeleteId(null);
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className={styles.adminPage}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.adminPage}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>Admin Dashboard</h1>
                    <div className={styles.headerActions}>
                        <Link href="/admin/blogs/new" className={styles.newBlogBtn}>
                            + New Blog
                        </Link>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <span className={styles.statNumber}>{blogs.length}</span>
                            <span className={styles.statLabel}>Total Blogs</span>
                        </div>
                    </div>

                    <section className={styles.blogsSection}>
                        <h2>All Blogs</h2>

                        {blogs.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>No blogs yet. Create your first blog!</p>
                                <Link href="/admin/blogs/new" className={styles.newBlogBtn}>
                                    + Create Blog
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.blogsTable}>
                                <div className={styles.tableHeader}>
                                    <span>Title</span>
                                    <span>Created</span>
                                    <span>Updated</span>
                                    <span>Actions</span>
                                </div>
                                {blogs.map((blog) => (
                                    <div key={blog.id} className={styles.tableRow}>
                                        <span className={styles.blogTitle}>{blog.title}</span>
                                        <span className={styles.blogDate}>
                                            {formatDate(blog.created_at)}
                                        </span>
                                        <span className={styles.blogDate}>
                                            {formatDate(blog.updated_at)}
                                        </span>
                                        <div className={styles.actions}>
                                            <Link
                                                href={`/blogs/${blog.id}`}
                                                className={styles.viewBtn}
                                                target="_blank"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/blogs/${blog.id}/edit`}
                                                className={styles.editBtn}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(blog.id)}
                                                className={styles.deleteBtn}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Delete Blog?</h3>
                        <p>This action cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => setDeleteId(null)}
                                className={styles.cancelBtn}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className={styles.confirmDeleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
