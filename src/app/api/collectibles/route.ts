import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

// Initialize table if not exists
async function initTable() {
    await sql`
        CREATE TABLE IF NOT EXISTS session_collectibles (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(64) NOT NULL,
            collectible_id VARCHAR(64) NOT NULL,
            collected_at TIMESTAMP DEFAULT NOW(),
            UNIQUE(session_id, collectible_id)
        )
    `;
}

// GET - Retrieve collected items for a session
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        const result = await sql`
            SELECT collectible_id FROM session_collectibles 
            WHERE session_id = ${sessionId}
        `;

        const collectedIds = result.map((row: { collectible_id: string }) => row.collectible_id);
        return NextResponse.json({ collectedIds });
    } catch (error) {
        console.error("Error fetching collectibles:", error);
        return NextResponse.json({ error: "Failed to fetch collectibles" }, { status: 500 });
    }
}

// POST - Store a collected item
export async function POST(request: Request) {
    try {
        await initTable();

        const { sessionId, collectibleId } = await request.json();

        if (!sessionId || !collectibleId) {
            return NextResponse.json(
                { error: "Session ID and Collectible ID required" },
                { status: 400 }
            );
        }

        await sql`
            INSERT INTO session_collectibles (session_id, collectible_id)
            VALUES (${sessionId}, ${collectibleId})
            ON CONFLICT (session_id, collectible_id) DO NOTHING
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error storing collectible:", error);
        return NextResponse.json({ error: "Failed to store collectible" }, { status: 500 });
    }
}

// DELETE - Clear session data
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        await sql`
            DELETE FROM session_collectibles 
            WHERE session_id = ${sessionId}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error clearing session:", error);
        return NextResponse.json({ error: "Failed to clear session" }, { status: 500 });
    }
}
