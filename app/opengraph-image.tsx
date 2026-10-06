import { ImageResponse } from "next/og";

export const alt =
	"Inistic Ventures — multimedia, talent management and theatre production";
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
					justifyContent: "space-between",
					padding: 80,
					background: "#b91c1c",
					color: "#ffffff",
				}}
			>
				<div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.85 }}>
					INISTIC VENTURES
				</div>
				<div
					style={{
						fontSize: 104,
						fontWeight: 700,
						lineHeight: 1,
						letterSpacing: -4,
					}}
				>
					PIONEERING CREATIVE INFLUENCE.
				</div>
				<div style={{ fontSize: 30, opacity: 0.9 }}>
					Talent Management · Film & TV · Stage · Theatre Education
				</div>
			</div>
		),
		size,
	);
}
