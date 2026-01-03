import { sql, isDatabaseConfigured } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(
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

        const body = await request.json();
        const { featured } = body;
        const { id } = await params;

        if (typeof featured !== "boolean") {
            return NextResponse.json(
                { error: "Featured status must be a boolean" },
                { status: 400 }
            );
        }

        const result = await sql`
            UPDATE blog 
            SET featured = ${featured}, updated_at = NOW()
            WHERE id = ${id}
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
        console.error("Error updating featured status:", error);
        return NextResponse.json(
            { error: "Failed to update featured status" },
            { status: 500 }
        );
    }
}
