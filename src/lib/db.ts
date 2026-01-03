import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(databaseUrl);

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
