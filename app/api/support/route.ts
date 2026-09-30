import { NextResponse } from "next/server";
import { Resend } from "resend";

interface SupportRequestBody {
	fullName?: string;
	email?: string;
	phone?: string;
	organisation?: string;
	supportType?: string;
	tier?: string;
	message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function clean(value: unknown, maxLength = 500): string {
	return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
	const apiKey = process.env.RESEND_API_KEY;
	const inbox = process.env.SUPPORT_INBOX_EMAIL;
	const from =
		process.env.RESEND_FROM_EMAIL || "Inistic Ventures <onboarding@resend.dev>";

	if (!apiKey || !inbox) {
		console.error("RESEND_API_KEY or SUPPORT_INBOX_EMAIL is not set");
		return NextResponse.json(
			{ error: "Email service is not configured." },
			{ status: 500 },
		);
	}

	let body: SupportRequestBody;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 });
	}

	const fullName = clean(body.fullName, 120);
	const email = clean(body.email, 200);
	const phone = clean(body.phone, 40);
	const organisation = clean(body.organisation, 200);
	const supportType = clean(body.supportType, 100);
	const tier = clean(body.tier, 100);
	const message = clean(body.message, 3000);

	if (!fullName || !email || !supportType || !tier) {
		return NextResponse.json(
			{ error: "Please fill in all required fields." },
			{ status: 400 },
		);
	}

	if (!EMAIL_PATTERN.test(email)) {
		return NextResponse.json(
			{ error: "Please enter a valid email address." },
			{ status: 400 },
		);
	}

	const rows: [string, string][] = [
		["Name", fullName],
		["Email", email],
		["Phone", phone || "—"],
		["Organisation", organisation || "—"],
		["Cause", supportType],
		["Tier", tier],
	];

	const html = `
		<h2>New sponsorship enquiry</h2>
		<table cellpadding="6" style="border-collapse:collapse">
			${rows
				.map(
					([label, value]) =>
						`<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`,
				)
				.join("")}
		</table>
		${
			message
				? `<h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
				: ""
		}
	`;

	const text = [
		"New sponsorship enquiry",
		...rows.map(([label, value]) => `${label}: ${value}`),
		message ? `\nMessage:\n${message}` : "",
	].join("\n");

	const resend = new Resend(apiKey);
	const { error } = await resend.emails.send({
		from,
		to: inbox,
		replyTo: email,
		subject: `Sponsorship enquiry: ${supportType} — ${tier} (${fullName})`,
		html,
		text,
	});

	if (error) {
		console.error("Resend error:", error);
		return NextResponse.json(
			{ error: "We couldn't send your request. Please try again." },
			{ status: 502 },
		);
	}

	return NextResponse.json({ ok: true });
}
