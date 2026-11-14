import Image from "next/image";
import Button from "@/components/custom/button";
import { Float, Reveal, SplitReveal } from "@/components/motion";
import Vinyl from "@/components/dam/vinyl";

// The upcoming event leads the page, so its details live in the hero.
const event = {
	date: "NOV 21, 2026",
	title: "Talent Show",
	venue: "Gijasec School",
	time: "10:00 AM",
};

export default function Hero() {
	return (
		<section className="relative min-h-screen grid lg:grid-cols-[1.1fr_1fr] items-center gap-10 px-12 max-md:px-5 pt-36 max-md:pt-28 pb-20 max-md:pb-12 overflow-hidden font-mono bg-white">
			<div className="relative z-10 flex flex-col gap-6 max-md:gap-4">
				<Reveal y={16}>
					<span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase text-gray-600">
						[ Where bodies, visions &amp; sound collide ]
					</span>
				</Reveal>

				<Reveal y={16} delay={0.1}>
					<p className="inline-flex items-center gap-3 text-lg max-md:text-base font-bold tracking-[-0.02em] text-red-700">
						<span aria-hidden="true" className="relative flex size-2.5">
							<span className="absolute inline-flex size-full rounded-full bg-red-700 opacity-60 animate-ping" />
							<span className="relative inline-flex size-2.5 rounded-full bg-red-700" />
						</span>
						Next up · {event.date}
					</p>
				</Reveal>

				<h1 className="text-[120px]/[105px] max-xl:text-8xl max-md:text-6xl tracking-[-0.05em] font-bold uppercase">
					<SplitReveal text="DAM" by="char" onMount delay={0.15} className="block text-red-700" />
					<SplitReveal text={event.title} onMount delay={0.35} className="block" />
					<span className="sr-only"> — Dance, Art &amp; Music</span>
				</h1>

				<Reveal y={20} delay={0.6}>
					<dl className="flex flex-wrap gap-x-10 gap-y-3 border-t border-gray-300 pt-5 max-w-xl">
						{[
							{ label: "Venue", value: event.venue },
							{ label: "Time", value: event.time },
							{ label: "Disciplines", value: "Dance · Art · Music" },
						].map((item) => (
							<div key={item.label} className="flex flex-col-reverse gap-1">
								<dt className="text-xs font-bold uppercase text-gray-600">{item.label}</dt>
								<dd className="text-lg max-md:text-base font-bold tracking-[-0.02em]">{item.value}</dd>
							</div>
						))}
					</dl>
				</Reveal>

				<Reveal y={20} delay={0.75} className="flex flex-wrap gap-4 pt-2">
					<Button
						title="Register now"
						href="/dam/registration"
						className="bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:from-black hover:to-red-700 hover:scale-105 transition-all duration-300 ease-out"
					/>
					<Button
						title="Meet the judges"
						href="/dam/judges"
						className="border-2 border-black text-lg font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-out"
					/>
				</Reveal>
			</div>

			{/* Collage (decorative) */}
			<div aria-hidden="true" className="relative w-full max-w-160 mx-auto aspect-square max-lg:max-w-md">
				<Float className="absolute inset-[6%]" delay={0.3} distance={8} duration={7}>
					<div className="rounded-full drop-shadow-[0_30px_60px_rgba(185,28,28,0.35)]">
						<Vinyl className="w-full animate-vinyl" />
					</div>
				</Float>

				<Float className="absolute w-[30%] -bottom-[2%] right-0" delay={0.8} rotate={-10} distance={18}>
					<Image src="/dam/02.png" alt="" width={300} height={300} className="w-full h-auto drop-shadow-xl" />
				</Float>

				<Float className="absolute w-[20%] top-0 left-0" delay={1} rotate={12} distance={12} duration={4}>
					<Image src="/dam/04.png" alt="" width={200} height={200} className="w-full h-auto" />
				</Float>

				<Float className="absolute w-[22%] top-[4%] right-[2%]" delay={1.15} rotate={6} distance={10} duration={6}>
					<span className="flex aspect-square items-center justify-center rounded-full bg-red-700 text-white text-center text-sm max-md:text-[10px] font-bold uppercase leading-tight p-3">
						Cash
						<br />
						prizes &amp;
						<br />
						awards
					</span>
				</Float>
			</div>
		</section>
	);
}
