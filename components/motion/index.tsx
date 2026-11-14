"use client";

import {
	animate,
	motion,
	MotionConfig,
	useInView,
	useReducedMotion,
	useScroll,
	useTransform,
	type Variants,
} from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

/** Shared easing: a quick start that settles softly. */
export const EASE = [0.22, 1, 0.36, 1] as const;

// Fire when an element is 10% up from the bottom of the screen. (An "amount"
// threshold can never be met by elements taller than the viewport.)
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Honors the OS "reduce motion" setting for every animation below:
 * transforms are skipped and only opacity fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type Tag = "div" | "section" | "ul" | "ol" | "li" | "p" | "span" | "dl";

interface RevealProps {
	children?: ReactNode;
	className?: string;
	as?: Tag;
	delay?: number;
	/** Distance in px the element rises from. */
	y?: number;
	x?: number;
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ children, className, as = "div", delay = 0, y = 40, x = 0 }: RevealProps) {
	const Component = motion[as] as typeof motion.div;
	return (
		<Component
			className={className}
			initial={{ opacity: 0, y, x }}
			whileInView={{ opacity: 1, y: 0, x: 0 }}
			viewport={VIEWPORT}
			transition={{ duration: 0.8, ease: EASE, delay }}
		>
			{children}
		</Component>
	);
}

const staggerContainer = (stagger: number, delay: number): Variants => ({
	hidden: {},
	show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const staggerItem: Variants = {
	hidden: { opacity: 0, y: 32 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Reveals its StaggerItem children one after another. */
export function Stagger({
	children,
	className,
	as = "div",
	stagger = 0.08,
	delay = 0,
}: RevealProps & { stagger?: number }) {
	const Component = motion[as] as typeof motion.div;
	return (
		<Component
			className={className}
			variants={staggerContainer(stagger, delay)}
			initial="hidden"
			whileInView="show"
			// Fire once the top of the group is on screen; an "amount" threshold
			// never fires for groups taller than the viewport (e.g. the gallery).
			viewport={{ once: true, margin: "0px 0px -15% 0px" }}
		>
			{children}
		</Component>
	);
}

export function StaggerItem({
	children,
	className,
	as = "div",
	hoverLift = false,
}: {
	children?: ReactNode;
	className?: string;
	as?: Tag;
	/** Nudges the item up on hover. */
	hoverLift?: boolean;
}) {
	const Component = motion[as] as typeof motion.div;
	return (
		<Component
			className={className}
			variants={staggerItem}
			whileHover={hoverLift ? { y: -6, transition: { duration: 0.25 } } : undefined}
		>
			{children}
		</Component>
	);
}

/**
 * Slides each word (or letter) up from behind a mask. Screen readers get the
 * plain text; the animated pieces are hidden from them.
 */
export function SplitReveal({
	text,
	className,
	by = "word",
	delay = 0,
	stagger,
	onMount = false,
}: {
	text: string;
	className?: string;
	by?: "word" | "char";
	delay?: number;
	stagger?: number;
	/** Play on page load instead of on scroll (for above-the-fold headings). */
	onMount?: boolean;
}) {
	const pieces = by === "word" ? text.split(" ") : Array.from(text);
	const step = stagger ?? (by === "word" ? 0.08 : 0.04);
	const trigger = onMount
		? { animate: "show" as const }
		: { whileInView: "show" as const, viewport: VIEWPORT };

	return (
		<span className={className}>
			<span className="sr-only">{text}</span>
			<motion.span
				aria-hidden="true"
				initial="hidden"
				{...trigger}
				variants={staggerContainer(step, delay)}
			>
				{pieces.map((piece, i) => (
					// The space sits outside the mask so lines can break between words.
					<Fragment key={i}>
						{by === "word" && i > 0 ? " " : null}
						<span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
							<motion.span
								className="inline-block"
								variants={{
									hidden: { y: "110%" },
									show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
								}}
							>
								{piece}
							</motion.span>
						</span>
					</Fragment>
				))}
			</motion.span>
		</span>
	);
}

/** Wipes an image in from the bottom, then lets it settle from a slight zoom. */
export function ImageReveal({
	children,
	className,
	delay = 0,
	onMount = false,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	onMount?: boolean;
}) {
	const trigger = onMount
		? { animate: "show" as const }
		: { whileInView: "show" as const, viewport: VIEWPORT };
	return (
		<motion.div
			className={className}
			initial="hidden"
			{...trigger}
			variants={{
				hidden: { clipPath: "inset(100% 0% 0% 0%)" },
				show: {
					clipPath: "inset(0% 0% 0% 0%)",
					transition: { duration: 1.1, ease: EASE, delay },
				},
			}}
		>
			<motion.div
				variants={{
					hidden: { scale: 1.15 },
					show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay } },
				}}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

/** Moves its content slower than the page scroll, for a parallax feel. */
export function Parallax({
	children,
	className,
	distance = 120,
}: {
	children: ReactNode;
	className?: string;
	/** How far (px) the content drifts while its section passes the viewport. */
	distance?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
	const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
	const reduce = useReducedMotion();

	return (
		<div ref={ref} className={className}>
			<motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
				{children}
			</motion.div>
		</div>
	);
}

/**
 * Counts up to the number inside `value` (e.g. "₦100,000+") when it scrolls
 * into view, keeping any prefix/suffix. Non-numeric values render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.6 });
	const reduce = useReducedMotion();
	const match = value.match(/^(\D*)([\d,]+)(.*)$/);
	const target = match ? Number(match[2].replace(/,/g, "")) : 0;
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!target || !inView || reduce) return;
		const controls = animate(0, target, {
			duration: 1.6,
			ease: EASE,
			onUpdate: (latest) => setCurrent(Math.round(latest)),
		});
		return () => controls.stop();
	}, [inView, reduce, target]);

	if (!match) return <span className={className}>{value}</span>;

	const shown = reduce || !inView ? (reduce ? target : 0) : current;
	return (
		<span ref={ref} className={className}>
			<span className="sr-only">{value}</span>
			<span aria-hidden="true" className="tabular-nums">
				{match[1]}
				{match[2].includes(",") ? shown.toLocaleString("en-US") : shown}
				{match[3]}
			</span>
		</span>
	);
}

/**
 * Pops an element in on load, then lets it bob gently forever.
 * Used for the decorative pieces of a collage.
 */
export function Float({
	children,
	className,
	delay = 0,
	distance = 14,
	duration = 5,
	rotate = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	distance?: number;
	duration?: number;
	/** Resting tilt in degrees. */
	rotate?: number;
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, scale: 0.6, rotate: rotate - 20 }}
			animate={{ opacity: 1, scale: 1, rotate }}
			transition={{ duration: 1, ease: EASE, delay }}
		>
			<motion.div
				animate={{ y: [0, -distance, 0] }}
				transition={{ duration, ease: "easeInOut", repeat: Infinity, delay: delay + 1 }}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

/** A line that draws itself across from the left. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
	return (
		<motion.span
			aria-hidden="true"
			className={`block origin-left ${className ?? ""}`}
			initial={{ scaleX: 0 }}
			whileInView={{ scaleX: 1 }}
			viewport={VIEWPORT}
			transition={{ duration: 1, ease: EASE, delay }}
		/>
	);
}
