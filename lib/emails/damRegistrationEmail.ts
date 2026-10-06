import { SITE_URL } from "@/lib/seo";

export interface DamRegistrationEmailData {
	fullName: string;
	email: string;
	phone: string;
	category: string;
	musicType?: string;
}

const INSTAGRAM_URL = "https://www.instagram.com/dam.talent/";
const CONTACT_EMAIL = "hello@inisticventures.com";
// Email clients need an absolute URL; this is served from /public.
const LOGO_URL = `${SITE_URL}/assets/logo.png`;

const CATEGORY_LABELS: Record<string, string> = {
	dance: "Dance",
	music: "Music",
	art: "Art",
};

const MUSIC_TYPE_LABELS: Record<string, string> = {
	solo: "Solo (1 person)",
	team: "Team (3 – 4 persons)",
};

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/** The form asks for "Surname Firstname", so the first name is the last word. */
function firstNameOf(fullName: string): string {
	const parts = fullName.trim().split(/\s+/);
	return parts[parts.length - 1] || fullName;
}

/**
 * Confirmation email sent to someone who registered for the DAM Street
 * Battle. Inline styles and table layout keep it rendering consistently
 * across Gmail, Outlook and Apple Mail.
 */
export function damRegistrationEmail(data: DamRegistrationEmailData) {
	const firstName = firstNameOf(data.fullName);
	const category = CATEGORY_LABELS[data.category] ?? data.category;
	const entry =
		data.category === "music" && data.musicType
			? `${category} — ${MUSIC_TYPE_LABELS[data.musicType] ?? data.musicType}`
			: category;

	const rows: [string, string][] = [
		["Name", data.fullName],
		["Email", data.email],
		["Phone", data.phone],
		["Category", entry],
	];

	const subject = "You're registered for the DAM Street Battle";

	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:Helvetica,Arial,sans-serif;color:#111111;">
<div style="display:none;max-height:0;overflow:hidden;">Your DAM Street Battle registration is confirmed, ${escapeHtml(firstName)}. Here's what happens next.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">

<tr><td style="background:#0a0a0a;padding:36px 32px;text-align:center;">
<div style="font-size:56px;line-height:1;font-weight:800;letter-spacing:4px;color:#f2ead8;">D<span style="color:#c8102e;">A</span>M</div>
<div style="margin-top:10px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#f2ead8;opacity:0.75;">Dance · Art · Music</div>
</td></tr>

<tr><td style="padding:36px 32px 8px;">
<p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#b91c1c;">Registration confirmed</p>
<h1 style="margin:0 0 16px;font-size:26px;line-height:1.25;color:#111111;">You're in, ${escapeHtml(firstName)}!</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333333;">Thanks for registering for the <strong>DAM Street Battle</strong> — the discovery of new talent in dance, art and music. We've received your entry and our team will be in touch with the next steps, including the date, venue and what to prepare.</p>
</td></tr>

<tr><td style="padding:8px 32px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f3;border:1px solid #ece6d9;border-radius:8px;">
<tr><td style="padding:16px 20px 4px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#666666;">Your details</td></tr>
${rows
	.map(
		([label, value]) =>
			`<tr><td style="padding:6px 20px;font-size:14px;line-height:1.5;color:#111111;"><span style="color:#666666;">${label}:</span> ${escapeHtml(value)}</td></tr>`,
	)
	.join("\n")}
<tr><td style="padding:0 0 12px;"></td></tr>
</table>
<p style="margin:12px 0 0;font-size:13px;line-height:1.5;color:#666666;">Spotted a mistake? Just reply to this email and we'll fix it.</p>
</td></tr>

<tr><td style="padding:24px 32px 8px;">
<h2 style="margin:0 0 10px;font-size:17px;color:#111111;">What happens next</h2>
<ol style="margin:0;padding-left:20px;font-size:15px;line-height:1.7;color:#333333;">
<li>Follow <strong>@dam.talent</strong> on Instagram — announcements land there first.</li>
<li>Keep an eye on your inbox and phone; we'll contact you with event details.</li>
<li>Start preparing your best ${escapeHtml(category.toLowerCase())} piece.</li>
</ol>
</td></tr>

<tr><td align="center" style="padding:28px 32px 32px;">
<a href="${INSTAGRAM_URL}" style="display:inline-block;background:#b91c1c;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:8px;">Follow DAM on Instagram</a>
</td></tr>

<tr><td align="center" style="padding:8px 32px 28px;border-top:1px solid #ece6d9;">
<p style="margin:20px 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#666666;">An initiative of</p>
<a href="${SITE_URL}"><img src="${LOGO_URL}" width="180" height="84" alt="Inistic Multimedia Company" style="display:block;width:180px;height:auto;border:0;"></a>
</td></tr>

<tr><td style="background:#0a0a0a;padding:24px 32px;text-align:center;font-size:12px;line-height:1.6;color:#bdb6a6;">
<a href="${SITE_URL}" style="color:#f2ead8;">inisticventures.com</a><br>
Questions? Email <a href="mailto:${CONTACT_EMAIL}" style="color:#f2ead8;">${CONTACT_EMAIL}</a>.<br>
You're receiving this because you registered at ${SITE_URL.replace(/^https?:\/\//, "")}/dam/registration.
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

	const text = [
		`You're in, ${firstName}!`,
		"",
		"Thanks for registering for the DAM Street Battle — the discovery of new talent in dance, art and music. We've received your entry and our team will be in touch with the next steps, including the date, venue and what to prepare.",
		"",
		"Your details",
		...rows.map(([label, value]) => `${label}: ${value}`),
		"Spotted a mistake? Just reply to this email and we'll fix it.",
		"",
		"What happens next",
		"1. Follow @dam.talent on Instagram — announcements land there first.",
		"2. Keep an eye on your inbox and phone; we'll contact you with event details.",
		`3. Start preparing your best ${category.toLowerCase()} piece.`,
		"",
		`Instagram: ${INSTAGRAM_URL}`,
		`Questions? Email ${CONTACT_EMAIL}`,
		"",
		"DAM is an initiative of Inistic Ventures.",
	].join("\n");

	return { subject, html, text };
}
