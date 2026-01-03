import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find admin by email
        const admins = await sql`
      SELECT * FROM admin WHERE email = ${email}
    `;

        if (admins.length === 0) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const admin = admins[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password_hash);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create session token
        const sessionToken = crypto.randomUUID();

        // Set HTTP-only cookie (expires in 24 hours)
        const cookieStore = await cookies();
        cookieStore.set("admin_session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return NextResponse.json({
            message: "Login successful",
            admin: {
                id: admin.id,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Login failed" },
            { status: 500 }
        );
    }
}
