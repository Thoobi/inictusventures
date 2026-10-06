import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSql } from "@/lib/db";
import { damRegistrationEmail } from "@/lib/emails/damRegistrationEmail";

interface RegistrationRequestBody {
	fullName?: unknown;
	email?: unknown;
	phone?: unknown;
	address?: unknown;
	source?: unknown;
	category?: unknown;
	musicType?: unknown;
	whyJoin?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCES = ["facebook", "tiktok", "ig", "other"];
const CATEGORIES = ["dance", "music", "art"];
const MUSIC_TYPES = ["solo", "team"];

function clean(value: unknown, maxLength = 500): string {
	return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
	let body: RegistrationRequestBody;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 });
	}

	const fullName = clean(body.fullName, 120);
	const email = clean(body.email, 200).toLowerCase();
	const phone = clean(body.phone, 40);
	const address = clean(body.address, 300);
	const source = clean(body.source, 20);
	const category = clean(body.category, 20);
	const musicType = category === "music" ? clean(body.musicType, 20) : "";
	const whyJoin = clean(body.whyJoin, 3000);

	if (!fullName || !email || !phone || !address || !whyJoin) {
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

	if (
		!SOURCES.includes(source) ||
		!CATEGORIES.includes(category) ||
		(category === "music" && !MUSIC_TYPES.includes(musicType))
	) {
		return NextResponse.json(
			{ error: "Please choose an option for every dropdown." },
			{ status: 400 },
		);
	}

	try {
		const sql = getSql();
		await sql`
			INSERT INTO dam_registrations
				(full_name, email, phone, address, source, category, music_type, why_join)
			VALUES
				(${fullName}, ${email}, ${phone}, ${address}, ${source}, ${category}, ${musicType || null}, ${whyJoin})
		`;
	} catch (error) {
		console.error("Failed to save DAM registration:", error);
		return NextResponse.json(
			{ error: "We couldn't save your registration. Please try again." },
			{ status: 500 },
		);
	}

	// The registration is already saved, so an email failure is logged but
	// doesn't fail the request.
	await sendConfirmationEmail({ fullName, email, phone, category, musicType });

	return NextResponse.json({ ok: true }, { status: 201 });
}

async function sendConfirmationEmail(
	data: Parameters<typeof damRegistrationEmail>[0],
) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error("RESEND_API_KEY is not set; skipping DAM confirmation email");
		return;
	}

	const from =
		process.env.DAM_FROM_EMAIL ||
		process.env.RESEND_FROM_EMAIL ||
		"DAM by Inistic Ventures <onboarding@resend.dev>";
	const replyTo = process.env.SUPPORT_INBOX_EMAIL || "hello@inisticventures.com";
	const { subject, html, text } = damRegistrationEmail(data);

	try {
		const { error } = await new Resend(apiKey).emails.send({
			from,
			to: data.email,
			replyTo,
			subject,
			html,
			text,
		});
		if (error) {
			console.error("Resend error (DAM confirmation):", error);
		}
	} catch (error) {
		console.error("Failed to send DAM confirmation email:", error);
	}
}
