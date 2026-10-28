import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// The pages that render each Sanity document type.
const PATHS_BY_TYPE: Record<string, string[]> = {
	galleryAlbum: ["/gallery"],
	damEdition: ["/dam/gallery"],
	judge: ["/dam/judges"],
	teamMember: ["/dam/teams"],
	sponsor: ["/"],
	patron: ["/patrons"],
};

interface WebhookPayload {
	_type?: string;
}

export async function POST(request: NextRequest) {
	const secret = process.env.SANITY_REVALIDATE_SECRET;
	if (!secret) {
		return NextResponse.json(
			{ error: "SANITY_REVALIDATE_SECRET is not set" },
			{ status: 500 },
		);
	}

	try {
		// Verifies Sanity's signature, and waits for the published change to be readable.
		const { isValidSignature, body } = await parseBody<WebhookPayload>(
			request,
			secret,
			true,
		);

		if (!isValidSignature) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
		}

		const paths = body?._type ? PATHS_BY_TYPE[body._type] : undefined;
		if (!paths) {
			return NextResponse.json(
				{ error: `No pages render type "${body?._type}"` },
				{ status: 400 },
			);
		}

		for (const path of paths) revalidatePath(path);

		return NextResponse.json({ revalidated: paths });
	} catch (error) {
		console.error("Revalidation webhook error:", error);
		return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
	}
}
