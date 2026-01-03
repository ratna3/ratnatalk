import { neon, NeonQueryFunction } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

// Create sql function only if DATABASE_URL is available
export const sql: NeonQueryFunction<false, false> | null = databaseUrl ? neon(databaseUrl) : null;

// Helper to check if database is configured
export const isDatabaseConfigured = (): boolean => {
    return !!databaseUrl && !!sql;
};

// Blog types
export interface Blog {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    author_id: number | null;
    category?: string;
    excerpt?: string;
    read_time?: string;
    featured?: boolean;
    tags?: string[];
}

// Admin types
export interface Admin {
    id: number;
    email: string;
    password_hash: string;
    created_at: string;
}
