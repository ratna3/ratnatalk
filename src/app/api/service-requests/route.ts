import { sql, isDatabaseConfigured } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

export const dynamic = "force-dynamic";

// Initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const OWNER_EMAIL = "ratnakiriscr@gmail.com";

interface ServiceRequestData {
    // Contact Information
    fullName: string;
    companyName?: string;
    email: string;
    phone?: string;
    preferredContact: string;
    contactHandle?: string;

    // Project Overview
    projectTitle: string;
    serviceTypes: string[];
    projectDescription: string;
    requirementsDocUrl?: string;

    // Technical & Design Specifics
    currentStage: string;
    designPreference: string;
    techStack?: string;
    featuresRequired?: string;

    // Timeline & Budget
    estimatedBudget: string;
    deadline?: string;
    urgencyLevel: string;

    // Additional Information
    competitorWebsites?: string;
    referralSource?: string;
}

// POST /api/service-requests - Create a new service request
export async function POST(request: NextRequest) {
    try {
        // Check if database is configured
        if (!isDatabaseConfigured() || !sql) {
            console.error("Database not configured - DATABASE_URL missing");
            return NextResponse.json(
                { error: "Database not configured" },
                { status: 503 }
            );
        }

        const body: ServiceRequestData = await request.json();

        // Validate required fields
        const requiredFields = [
            'fullName', 'email', 'preferredContact', 'projectTitle',
            'serviceTypes', 'projectDescription', 'currentStage',
            'designPreference', 'estimatedBudget', 'urgencyLevel'
        ];

        for (const field of requiredFields) {
            if (!body[field as keyof ServiceRequestData]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate service types is an array with at least one item
        if (!Array.isArray(body.serviceTypes) || body.serviceTypes.length === 0) {
            return NextResponse.json(
                { error: "At least one service type must be selected" },
                { status: 400 }
            );
        }

        // Insert into database
        const result = await sql`
            INSERT INTO service_request (
                full_name, company_name, email, phone, preferred_contact,
                project_title, service_types, project_description, requirements_doc_url,
                current_stage, design_preference, tech_stack, features_required,
                estimated_budget, deadline, urgency_level,
                competitor_websites, referral_source
            ) VALUES (
                ${body.fullName},
                ${body.companyName || null},
                ${body.email},
                ${body.phone || null},
                ${body.preferredContact},
                ${body.projectTitle},
                ${body.serviceTypes},
                ${body.projectDescription},
                ${body.requirementsDocUrl || null},
                ${body.currentStage},
                ${body.designPreference},
                ${body.techStack || null},
                ${body.featuresRequired || null},
                ${body.estimatedBudget},
                ${body.deadline ? body.deadline : null},
                ${body.urgencyLevel},
                ${body.competitorWebsites || null},
                ${body.referralSource || null}
            )
            RETURNING id, created_at
        `;

        const savedRequest = result[0];

        // Send email notification
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'RK Talks <noreply@resend.dev>',
                    to: OWNER_EMAIL,
                    subject: `🚀 New Service Request: ${body.projectTitle}`,
                    html: generateEmailHtml(body, savedRequest.id, savedRequest.created_at)
                });
                console.log("Email notification sent successfully");
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError);
                // Don't fail the request if email fails
            }
        } else {
            console.log("Resend not configured - skipping email notification");
        }

        return NextResponse.json({
            success: true,
            message: "Service request submitted successfully",
            requestId: savedRequest.id
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating service request:", error);
        return NextResponse.json(
            { error: "Failed to submit service request", details: String(error) },
            { status: 500 }
        );
    }
}

function generateEmailHtml(data: ServiceRequestData, requestId: number, createdAt: string): string {
    const serviceTypesList = data.serviceTypes.join(', ');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #F59E0B, #B45309); color: white; padding: 24px; border-radius: 12px 12px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 24px; }
            .section { background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; border: 1px solid #e5e7eb; }
            .section h3 { color: #B45309; margin: 0 0 12px 0; font-size: 16px; border-bottom: 2px solid #FCD34D; padding-bottom: 8px; }
            .field { margin-bottom: 8px; }
            .label { font-weight: 600; color: #6B7280; font-size: 12px; text-transform: uppercase; }
            .value { color: #1F2937; font-size: 14px; }
            .footer { background: #1F2937; color: #9CA3AF; padding: 16px; text-align: center; border-radius: 0 0 12px 12px; font-size: 12px; }
            .badge { display: inline-block; background: #FEF3C7; color: #92400E; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚀 New Service Request Received</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Request #${requestId} • ${new Date(createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Contact Information</h3>
                <div class="field"><span class="label">Name:</span> <span class="value">${data.fullName}</span></div>
                ${data.companyName ? `<div class="field"><span class="label">Company:</span> <span class="value">${data.companyName}</span></div>` : ''}
                <div class="field"><span class="label">Email:</span> <span class="value"><a href="mailto:${data.email}">${data.email}</a></span></div>
                ${data.phone ? `<div class="field"><span class="label">Phone:</span> <span class="value">${data.phone}</span></div>` : ''}
                <div class="field"><span class="label">Preferred Contact:</span> <span class="badge">${data.preferredContact}</span></div>
                ${data.contactHandle ? `<div class="field"><span class="label">${data.preferredContact} Handle:</span> <span class="value">${data.contactHandle}</span></div>` : ''}
            </div>
            
            <div class="section">
                <h3>📋 Project Overview</h3>
                <div class="field"><span class="label">Project Title:</span> <span class="value" style="font-weight: 600;">${data.projectTitle}</span></div>
                <div class="field"><span class="label">Services Requested:</span> <span class="value">${serviceTypesList}</span></div>
                <div class="field">
                    <div class="label">Description:</div>
                    <div class="value" style="background: #f3f4f6; padding: 12px; border-radius: 6px; margin-top: 4px; white-space: pre-wrap;">${data.projectDescription}</div>
                </div>
            </div>
            
            <div class="section">
                <h3>🔧 Technical Details</h3>
                <div class="field"><span class="label">Current Stage:</span> <span class="badge">${data.currentStage}</span></div>
                <div class="field"><span class="label">Design Preference:</span> <span class="value">${data.designPreference}</span></div>
                ${data.techStack ? `<div class="field"><span class="label">Tech Stack:</span> <span class="value">${data.techStack}</span></div>` : ''}
                ${data.featuresRequired ? `<div class="field"><div class="label">Features Required:</div><div class="value" style="background: #f3f4f6; padding: 12px; border-radius: 6px; margin-top: 4px;">${data.featuresRequired}</div></div>` : ''}
            </div>
            
            <div class="section">
                <h3>💰 Budget & Timeline</h3>
                <div class="field"><span class="label">Budget:</span> <span class="badge">${data.estimatedBudget}</span></div>
                ${data.deadline ? `<div class="field"><span class="label">Deadline:</span> <span class="value">${new Date(data.deadline).toLocaleDateString()}</span></div>` : ''}
                <div class="field"><span class="label">Urgency:</span> <span class="badge" style="${data.urgencyLevel === 'High Priority (Rush Fee may apply)' ? 'background: #FEE2E2; color: #DC2626;' : ''}">${data.urgencyLevel}</span></div>
            </div>
            
            ${data.competitorWebsites || data.referralSource ? `
            <div class="section">
                <h3>📌 Additional Info</h3>
                ${data.competitorWebsites ? `<div class="field"><span class="label">Reference Websites:</span> <span class="value">${data.competitorWebsites}</span></div>` : ''}
                ${data.referralSource ? `<div class="field"><span class="label">How they found you:</span> <span class="value">${data.referralSource}</span></div>` : ''}
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <p>This request was submitted via RK Talks website.</p>
            <p>Reply directly to <a href="mailto:${data.email}" style="color: #FCD34D;">${data.email}</a> to respond.</p>
        </div>
    </body>
    </html>
    `;
}
