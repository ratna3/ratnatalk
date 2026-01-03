import { sql, isDatabaseConfigured } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// GET /api/blogs/[id] - Get a single blog
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isDatabaseConfigured() || !sql) {
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 503 }
            );
        }

        const { id } = await params;
        const blogId = parseInt(id, 10);

        if (isNaN(blogId)) {
            return NextResponse.json(
                { error: "Invalid blog ID" },
                { status: 400 }
            );
        }

        const blogs = await sql`
            SELECT * FROM blog WHERE id = ${blogId}
        `;

        if (blogs.length === 0) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(blogs[0]);
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;
        const blogId = parseInt(id, 10);

        if (isNaN(blogId)) {
            return NextResponse.json(
                { error: "Invalid blog ID" },
                { status: 400 }
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
            UPDATE blog 
            SET title = ${title}, content = ${content}, updated_at = NOW()
            WHERE id = ${blogId}
            RETURNING *
        `;

        if (result.length === 0) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json(
            { error: "Failed to update blog" },
            { status: 500 }
        );
    }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params;
        const blogId = parseInt(id, 10);

        if (isNaN(blogId)) {
            return NextResponse.json(
                { error: "Invalid blog ID" },
                { status: 400 }
            );
        }

        const result = await sql`
            DELETE FROM blog WHERE id = ${blogId} RETURNING *
        `;

        if (result.length === 0) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json(
            { error: "Failed to delete blog" },
            { status: 500 }
        );
    }
}
