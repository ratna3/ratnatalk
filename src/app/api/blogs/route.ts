import { sql, isDatabaseConfigured } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// GET /api/blogs - List all blogs
export async function GET(request: NextRequest) {
    try {
        // Check if database is configured
        if (!isDatabaseConfigured() || !sql) {
            console.error("Database not configured - DATABASE_URL missing");
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 503 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get("category");
        const featured = searchParams.get("featured");
        const limit = searchParams.get("limit");

        let blogs;

        if (category && category !== "All") {
            blogs = await sql`
                SELECT * FROM blog 
                WHERE category = ${category}
                ORDER BY created_at DESC
            `;
        } else if (featured === "true") {
            blogs = await sql`
                SELECT * FROM blog 
                WHERE featured = true
                ORDER BY created_at DESC 
                LIMIT ${limit ? parseInt(limit) : 3}
            `;
        } else if (limit) {
            blogs = await sql`
                SELECT * FROM blog 
                ORDER BY created_at DESC 
                LIMIT ${parseInt(limit)}
            `;
        } else {
            blogs = await sql`
                SELECT * FROM blog 
                ORDER BY created_at DESC
            `;
        }

        return NextResponse.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json(
            { error: "Failed to fetch blogs", details: String(error) },
            { status: 500 }
        );
    }
}

// POST /api/blogs - Create a new blog
export async function POST(request: NextRequest) {
    try {
        if (!isDatabaseConfigured() || !sql) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 503 }
            );
        }

        // Check admin authentication
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        const result = await sql`
            INSERT INTO blog (title, content, created_at, updated_at)
            VALUES (${title}, ${content}, NOW(), NOW())
            RETURNING *
        `;

        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json(
            { error: "Failed to create blog" },
            { status: 500 }
        );
    }
}
