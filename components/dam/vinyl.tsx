/**
 * A DAM-branded vinyl record drawn in CSS: grooves, a light sheen and a
 * centre label. Decorative only. Add `animate-vinyl` to spin it.
 */
export default function Vinyl({
	className = "",
	disc = "#111111",
	label = "#b91c1c",
	labelText = "#ffffff",
}: {
	className?: string;
	/** Record colour. */
	disc?: string;
	/** Centre label colour. */
	label?: string;
	labelText?: string;
}) {
	return (
		<div
			aria-hidden="true"
			className={`relative aspect-square rounded-full shadow-2xl ${className}`}
			style={{
				backgroundColor: disc,
				// Fine grooves, darker toward the edge
				backgroundImage: `repeating-radial-gradient(circle at center, rgba(255,255,255,0.07) 0 1px, transparent 1px 4px), radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.35) 100%)`,
			}}
		>
			{/* Light catching the grooves */}
			<div
				className="absolute inset-0 rounded-full"
				style={{
					background:
						"conic-gradient(from 30deg, transparent 0deg, rgba(255,255,255,0.18) 25deg, transparent 60deg, transparent 180deg, rgba(255,255,255,0.12) 205deg, transparent 240deg)",
				}}
			/>
			{/* Run-out groove ring */}
			<div className="absolute inset-[30%] rounded-full border border-white/10" />

			{/* Centre label; text scales with the label's own width */}
			<div
				className="@container absolute inset-[33%] rounded-full font-mono text-center"
				style={{ backgroundColor: label, color: labelText }}
			>
				<span className="absolute inset-x-0 top-[16%] font-bold tracking-[-0.05em] leading-none text-[24cqi]">
					DAM
				</span>
				<span className="absolute left-1/2 top-1/2 size-[8%] -translate-1/2 rounded-full bg-white" />
				<span className="absolute inset-x-0 bottom-[22%] font-bold uppercase leading-tight opacity-80 text-[6.5cqi]">
					Dance · Art · Music
				</span>
			</div>
		</div>
	);
}
