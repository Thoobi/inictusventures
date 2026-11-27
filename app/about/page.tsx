import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/custom/button";
import { DAM_REGISTRATION_OPEN } from "@/lib/dam";
import JsonLd from "@/components/shared/jsonLd";
import { CountUp, ImageReveal, Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/motion";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import FounderPortrait from "../../public/assets/about/sunday-iniobong.jpg";

export const metadata: Metadata = pageMetadata({
	title: "About Us",
	description:
		"Meet Sunday Iniobong, founder of Inistic Multimedia Company and the DAM Talent Show — a media entrepreneur, poet, artist and creative director with over 14 years in entertainment, media production and talent development.",
	path: "/about",
});

const quickFacts = [
	{ label: "Experience", value: "14+ years" },
	{ label: "Inistic since", value: "2011" },
	{ label: "CAC registered", value: "2015" },
	{ label: "DAM launched", value: "2024" },
];

const timeline = [
	{ year: "2011", text: "Starts operating as Inistic Global Entertainment." },
	{ year: "2013", text: "Span Fest." },
	{ year: "2014", text: "Art Approach." },
	{
		year: "2015",
		text: "Registers Inistic Multimedia Company with the Corporate Affairs Commission (CAC).",
	},
	{ year: "2017", text: "Media coverage for Mr Tourism Nigeria; Art Approach returns." },
	{ year: "2021", text: "Professional Amateur Medal Award." },
	{
		year: "2022",
		text: "DAM Talent Show is birthed. International Dance Day. Soccer Queen Medals Awards.",
	},
	{
		year: "2024",
		text: "DAM Talent Show officially launches with a ₦30,000 cash gift. International Dance Day.",
	},
	{
		year: "2025",
		text: "DAM gives over ₦100,000 to winners plus an award. International Dance Day.",
	},
];

const services = [
	"Total advert promotions for brands",
	"Event packaging & management",
	"Artist promotion",
	"Event coverage & media production",
];

const partners = [
	"Ijodee Dance Company",
	"SPAN — Society for the Performing Arts of Nigeria, Theatre Dance Company",
	"Royal Heart Ambassador International",
];

const background = [
	{
		label: "Work Experience",
		items: [
			"Founder & CEO — Inistic Multimedia Company",
			"Cinematographer — OETV",
			"Editor — AWA TV",
			"Technical Manager — Atelefest",
			"Media Manager — Yoruba General Assembly",
		],
	},
	{
		label: "Education & Training",
		items: [
			"Human Resources Management — Certified",
			"Project Management — Certified",
			"Film Training — Disciples Film and Television Institute",
			"Advanced Media Training — Priesthood Media",
		],
	},
	{
		label: "Craft & Skills",
		items: [
			"Event Management",
			"Cinematography",
			"Video Editing",
			"Stage Theatre Performance",
			"Poetry & Art",
		],
	},
];

const works = [
	{
		label: "Stage Plays Produced",
		items: ["Pains of Motherhood", "Tears in the Rain"],
	},
	{
		label: "Media Coverage & Crew",
		items: [
			"Mr Tourism Nigeria 2017",
			"Crew for Kocksure Event",
			"Jimbay Production",
		],
	},
	{
		label: "Key Projects",
		items: [
			"International Dance Day — 2022, 2024 & 2025",
			"Atelefest",
			"Art Approach — 2014 & 2017",
			"Span Fest — 2013",
			"The Element H Fashion Show",
			"Royal Heart Ambassador International",
		],
	},
];

const awards = [
	{ title: "Best Team Member", by: "Royal Heart Ambassador (RHA)" },
	{ title: "Special Recognition", by: "Royal Heart Ambassador (RHA)" },
	{ title: "Professional Amateur Medal Award", by: "2021" },
	{ title: "Soccer Queen Medals Awards", by: "2022" },
	{ title: "Effective Member", by: "Message of Hope" },
	{ title: "Effective Member", by: "Success & I" },
];

const damGrowth = [
	{ year: "2022", value: "Birthed", note: "The idea takes shape" },
	{ year: "2024", value: "₦30,000", note: "Cash gift at the official launch" },
	{ year: "2025", value: "₦100,000+", note: "To winners, plus one award" },
];

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "AboutPage",
	"@id": `${SITE_URL}/about#page`,
	url: `${SITE_URL}/about`,
	name: "About Inistic Ventures",
	about: { "@id": `${SITE_URL}/#organization` },
	mainEntity: {
		"@type": "Person",
		"@id": `${SITE_URL}/about#founder`,
		name: "Sunday Iniobong",
		jobTitle: "Founder & CEO",
		image: `${SITE_URL}/assets/about/sunday-iniobong.jpg`,
		nationality: "Nigerian",
		worksFor: { "@id": `${SITE_URL}/#organization` },
		knowsAbout: [
			"Event Management",
			"Cinematography",
			"Video Editing",
			"Stage Theatre",
			"Talent Development",
		],
	},
};

function Eyebrow({ children, className = "text-red-700" }: { children: string; className?: string }) {
	return (
		<Reveal as="span" y={16} className={`text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase ${className}`}>
			[ {children} ]
		</Reveal>
	);
}

export default function About() {
	return (
		<div className="font-mono bg-white">
			<JsonLd data={jsonLd} />

			{/* Founder intro */}
			<section
				aria-labelledby="founder-heading"
				className="px-12 max-md:px-5 pt-40 max-md:pt-30 pb-20 max-md:pb-10"
			>
				<div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 max-lg:gap-10 items-end">
					<div className="flex flex-col gap-6 max-lg:order-2">
						<Eyebrow>The Founder</Eyebrow>
						<h1
							id="founder-heading"
							className="text-[110px]/[100px] max-xl:text-8xl max-md:text-6xl tracking-[-0.05em] font-bold uppercase"
						>
							<SplitReveal text="Sunday" onMount delay={0.1} className="block" />
							<SplitReveal text="Iniobong" onMount delay={0.25} className="block text-red-700" />
						</h1>
						<Reveal as="p" y={20} delay={0.5} className="text-lg max-md:text-base font-bold tracking-[-0.02em]">
							Founder & CEO, Inistic Multimedia Company
							<br />
							Founder, DAM Talent Show
						</Reveal>
						<Reveal as="p" y={20} delay={0.6} className="text-lg max-md:text-base font-medium text-gray-800 max-w-2xl">
							A media entrepreneur, poet, artist, stage theatre performer and
							creative director with over 14 years of experience in
							entertainment, media production and talent development. Sunday
							is from Nsit Ubom Local Government Area of Akwa Ibom State,
							Nigeria.
						</Reveal>

						<Stagger as="dl" delay={0.7} className="grid grid-cols-4 max-md:grid-cols-2 border-t border-gray-300 mt-4">
							{quickFacts.map((fact) => (
								<StaggerItem key={fact.label} className="flex flex-col-reverse gap-1 pt-5 pr-4">
									<dt className="text-xs font-bold uppercase tracking-[-0.02em] text-gray-600">
										{fact.label}
									</dt>
									<dd className="text-4xl max-md:text-3xl font-bold tracking-[-0.05em]">
										{fact.value}
									</dd>
								</StaggerItem>
							))}
						</Stagger>
					</div>

					<div className="relative max-lg:order-1 max-lg:max-w-md w-full lg:justify-self-end">
						<Reveal
							x={-40}
							y={-40}
							delay={0.6}
							className="absolute -inset-3 translate-x-6 translate-y-6 max-md:translate-x-3 max-md:translate-y-3"
						>
							<div aria-hidden="true" className="size-full bg-red-700 rounded-[15px]" />
						</Reveal>
						<ImageReveal onMount delay={0.2} className="relative rounded-[15px] overflow-hidden">
						<Image
							src={FounderPortrait}
							alt="Portrait of Sunday Iniobong, founder of Inistic Multimedia Company"
							priority
							placeholder="blur"
							sizes="(min-width: 1024px) 40vw, (min-width: 768px) 28rem, 90vw"
							className="w-full h-auto object-cover"
						/>
						</ImageReveal>
					</div>
				</div>
			</section>

			{/* Vision & mission */}
			<section aria-labelledby="vision-heading" className="bg-black text-white px-12 max-md:px-5 py-24 max-md:py-14">
				<div className="max-w-7xl mx-auto flex flex-col gap-14 max-md:gap-10">
					<div className="flex flex-col gap-3">
						<Eyebrow className="text-red-500">What drives him</Eyebrow>
						<h2 id="vision-heading" className="sr-only">
							Vision and mission
						</h2>
					</div>
					<Stagger className="grid lg:grid-cols-2 gap-16 max-lg:gap-12" stagger={0.2}>
						<StaggerItem className="flex flex-col gap-5 border-t border-white/30 pt-8">
							<h3 className="text-6xl max-md:text-4xl font-bold tracking-[-0.05em] uppercase text-red-500">
								<SplitReveal text="Vision" by="char" />
							</h3>
							<p className="text-3xl max-md:text-xl font-semibold tracking-[-0.03em]">
								To discover the best talents and give them a platform to grow,
								be seen, and be celebrated.
							</p>
						</StaggerItem>
						<StaggerItem className="flex flex-col gap-5 border-t border-white/30 pt-8">
							<h3 className="text-6xl max-md:text-4xl font-bold tracking-[-0.05em] uppercase text-red-500">
								<SplitReveal text="Mission" by="char" />
							</h3>
							<p className="text-3xl max-md:text-xl font-semibold tracking-[-0.03em]">
								To impact people and celebrate creativity in Dance, Art and
								Music — rewarding talent with cash prizes, gifts and awards that
								grow bigger every year.
							</p>
						</StaggerItem>
					</Stagger>
				</div>
			</section>

			{/* Timeline */}
			<section aria-labelledby="journey-heading" className="px-12 max-md:px-5 py-24 max-md:py-14">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-16 max-lg:gap-8">
					<div className="flex flex-col gap-3 lg:sticky lg:top-32 self-start">
						<Eyebrow>Since 2011</Eyebrow>
						<h2
							id="journey-heading"
							className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase text-red-700"
						>
							<SplitReveal text="The Journey" />
						</h2>
					</div>
					<Stagger as="ol" className="flex flex-col" stagger={0.06}>
						{timeline.map((entry) => (
							<StaggerItem
								as="li"
								key={entry.year}
								className="grid grid-cols-[7rem_1fr] max-md:grid-cols-[4.5rem_1fr] gap-6 max-md:gap-4 border-b border-gray-300 py-6"
							>
								<span className="text-4xl max-md:text-2xl font-bold tracking-[-0.05em] text-red-700">
									{entry.year}
								</span>
								<p className="text-lg max-md:text-base font-medium text-gray-800 self-center">
									{entry.text}
								</p>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</section>

			{/* Inistic Multimedia */}
			<section aria-labelledby="company-heading" className="bg-[#fbfbfb] px-12 max-md:px-5 py-24 max-md:py-14">
				<div className="max-w-7xl mx-auto flex flex-col gap-12 max-md:gap-8">
					<div className="flex flex-col gap-3 max-w-4xl">
						<Eyebrow className="text-gray-600">The Company</Eyebrow>
						<h2
							id="company-heading"
							className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase text-red-700"
						>
							<SplitReveal text="Inistic Multimedia" />
						</h2>
						<p className="text-lg max-md:text-base font-medium text-gray-800 mt-2">
							Operational since 2011 as Inistic Global Entertainment and
							registered with the Corporate Affairs Commission (CAC) in 2015,
							Inistic Multimedia Company is a full media company with a proven
							track record working with bigger companies and theatre groups.
						</p>
					</div>

					<Stagger as="ul" className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4" stagger={0.1}>
						{services.map((service, index) => (
							<StaggerItem
								as="li"
								hoverLift
								key={service}
								className="flex flex-col justify-between gap-10 rounded-[15px] max-md:rounded-lg bg-red-700 text-white px-5 py-6 min-h-52 max-md:min-h-36"
							>
								<span className="text-sm font-bold">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="text-2xl max-md:text-xl font-bold uppercase tracking-[-0.03em]">
									{service}
								</span>
							</StaggerItem>
						))}
					</Stagger>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-bold uppercase tracking-[-0.02em] text-gray-600">
							Worked with
						</h3>
						<Stagger as="ul" className="flex flex-col">
							{partners.map((partner) => (
								<StaggerItem
									as="li"
									key={partner}
									className="text-3xl max-md:text-xl font-bold tracking-[-0.03em] border-b border-gray-300 py-4"
								>
									{partner}
								</StaggerItem>
							))}
						</Stagger>
					</div>
				</div>
			</section>

			{/* Background */}
			<section aria-labelledby="background-heading" className="px-12 max-md:px-5 py-24 max-md:py-14">
				<div className="max-w-7xl mx-auto flex flex-col gap-12 max-md:gap-8">
					<div className="flex flex-col gap-3">
						<Eyebrow>Experience, Training & Skills</Eyebrow>
						<h2
							id="background-heading"
							className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase text-red-700"
						>
							<SplitReveal text="Background" />
						</h2>
					</div>
					<Stagger className="grid lg:grid-cols-3 gap-10" stagger={0.12}>
						{background.map((group) => (
							<StaggerItem key={group.label} className="flex flex-col gap-4 border-t-2 border-black pt-5">
								<h3 className="text-2xl font-bold uppercase tracking-[-0.03em]">{group.label}</h3>
								<ul className="flex flex-col gap-3">
									{group.items.map((item) => (
										<li key={item} className="text-base font-medium text-gray-800">
											{item}
										</li>
									))}
								</ul>
							</StaggerItem>
						))}
					</Stagger>

					<Stagger className="grid lg:grid-cols-3 gap-10 pt-8" stagger={0.12}>
						{works.map((group) => (
							<StaggerItem key={group.label} className="flex flex-col gap-4 border-t-2 border-red-700 pt-5">
								<h3 className="text-2xl font-bold uppercase tracking-[-0.03em] text-red-700">
									{group.label}
								</h3>
								<ul className="flex flex-col gap-3">
									{group.items.map((item) => (
										<li key={item} className="text-base font-medium text-gray-800">
											{item}
										</li>
									))}
								</ul>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</section>

			{/* Awards */}
			<section aria-labelledby="awards-heading" className="bg-black text-white px-12 max-md:px-5 py-24 max-md:py-14">
				<div className="max-w-7xl mx-auto flex flex-col gap-12 max-md:gap-8">
					<div className="flex flex-col gap-3">
						<Eyebrow className="text-red-500">Recognition</Eyebrow>
						<h2
							id="awards-heading"
							className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase"
						>
							<SplitReveal text="Awards" />
						</h2>
					</div>
					<Stagger as="ul" className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/20 border border-white/20 rounded-[15px] overflow-hidden" stagger={0.08}>
						{awards.map((award) => (
							<StaggerItem as="li" key={`${award.title}-${award.by}`} className="bg-black flex flex-col gap-2 p-8 max-md:p-6 transition-colors duration-300 hover:bg-red-700">
								<span className="text-2xl max-md:text-xl font-bold uppercase tracking-[-0.03em]">
									{award.title}
								</span>
								<span className="text-sm font-medium text-white/70">{award.by}</span>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</section>

			{/* DAM Talent Show */}
			<section aria-labelledby="dam-heading" className="px-12 max-md:px-5 py-24 max-md:py-14">
				<div className="max-w-7xl mx-auto flex flex-col gap-12 max-md:gap-8">
					<div className="grid lg:grid-cols-2 gap-10 items-end">
						<div className="flex flex-col gap-3">
							<Eyebrow>The DAM Project</Eyebrow>
							<h2
								id="dam-heading"
								className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase text-red-700"
							>
								<SplitReveal text="DAM Talent Show" />
							</h2>
						</div>
						<Reveal as="p" delay={0.2} className="text-lg max-md:text-base font-medium text-gray-800">
							Birthed in 2022 and officially launched in 2024 as a branch of
							Inistic Multimedia Company, DAM celebrates creativity in Dance,
							Art and Music. The show showcases arts and crafts and encourages
							talent with cash prizes, gifts and awards — and every year brings
							new adjustments and bigger rewards to bring out the best of
							talent.
						</Reveal>
					</div>

					<Stagger as="ol" className="grid md:grid-cols-3 gap-4" stagger={0.15}>
						{damGrowth.map((step) => (
							<StaggerItem
								as="li"
								hoverLift
								key={step.year}
								className="flex flex-col gap-3 rounded-[15px] max-md:rounded-lg bg-gray-100 px-6 py-8"
							>
								<span className="text-sm font-bold text-gray-600">{step.year}</span>
								<span className="text-5xl max-md:text-4xl font-bold tracking-[-0.05em] text-red-700">
									<CountUp value={step.value} />
								</span>
								<span className="text-base font-medium text-gray-800">{step.note}</span>
							</StaggerItem>
						))}
					</Stagger>

					<Reveal className="flex flex-wrap gap-4 justify-center">
						<Button
							title="Explore DAM"
							href="/dam"
							className="bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:from-black hover:to-red-700 hover:scale-105 transition-all duration-300 ease-out"
						/>
						{DAM_REGISTRATION_OPEN && (
							<Button
								title="Register for DAM"
								href="/dam/registration"
								className="border-2 border-black text-lg font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-out"
							/>
						)}
					</Reveal>
				</div>
			</section>
		</div>
	);
}
