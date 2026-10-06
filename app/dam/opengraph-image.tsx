import { ImageResponse } from "next/og";

export const alt = "DAM — Dance, Art & Music by Inistic Ventures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: 80,
					background: "#0a0a0a",
					color: "#f2ead8",
				}}
			>
				<div style={{ display: "flex", fontSize: 260, fontWeight: 700, lineHeight: 1 }}>
					D<span style={{ color: "#c8102e" }}>A</span>M
				</div>
				<div style={{ fontSize: 44, marginTop: 24 }}>Dance · Art · Music</div>
				<div style={{ fontSize: 26, marginTop: 40, opacity: 0.6 }}>
					BY INISTIC VENTURES
				</div>
			</div>
		),
		size,
	);
}
