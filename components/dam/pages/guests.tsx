import Image, { type StaticImageData } from "next/image";
import { ImageReveal, Reveal, SplitReveal } from "@/components/motion";
import SpecialGuestPhoto from "../../../public/assets/dam-guests/special-guest.jpg";
import GuestArtistPhoto from "../../../public/assets/dam-guests/guest-artist.jpg";

interface Guest {
	role: string;
	/** Leave empty to show the role only. */
	name: string;
	title?: string;
	photo: StaticImageData;
	/** Crops the photo; the special guest's flyer has a name banner at the bottom. */
	imageClass: string;
	accent: string;
}

const guests: Guest[] = [
	{
		role: "Special Guest of the Day",
		name: "Hon. (Comr.) Ege Olusegun Adebisi",
		title: "Member, Lagos State House of Assembly · Ojo Constituency 01",
		photo: SpecialGuestPhoto,
		imageClass: "aspect-6/7 object-cover object-top",
		accent: "bg-red-700",
	},
	{
		role: "Guest Artist",
		name: "", // TODO: add the guest artist's name
		photo: GuestArtistPhoto,
		imageClass: "aspect-6/7 object-cover object-center",
		accent: "bg-black",
	},
];

export default function Guests() {
	return (
		<section aria-labelledby="dam-guests-heading" className="px-12 max-md:px-5 py-24 max-md:py-14 font-mono bg-white">
			<div className="flex flex-col gap-3 pb-12 max-md:pb-8">
				<Reveal as="span" y={16} className="text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase text-red-700">
					[ On the day ]
				</Reveal>
				<h2 id="dam-guests-heading" className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase">
					<SplitReveal text="Our" className="block" />
					<SplitReveal text="Guests." className="block text-red-700" delay={0.15} />
				</h2>
			</div>

			<ul className="flex flex-wrap justify-center gap-x-16 gap-y-12">
				{guests.map((guest, i) => (
					<li key={guest.role} className="group flex flex-col gap-5 w-full max-w-sm">
						<div className="relative">
							<Reveal
								x={i ? 30 : -30}
								y={30}
								delay={0.3}
								className={`absolute inset-0 translate-x-4 translate-y-4 rounded-[15px] ${guest.accent}`}
							/>
							<ImageReveal delay={i * 0.15} className="relative rounded-[15px] overflow-hidden bg-gray-100">
								<Image
									src={guest.photo}
									alt={guest.name ? `${guest.name}, ${guest.role}` : guest.role}
									placeholder="blur"
									// The special guest photo is only 389px wide, so cards stay near that size to keep it sharp.
									sizes="384px"
									quality={95}
									className={`w-full transition-transform duration-700 ease-out group-hover:scale-105 ${guest.imageClass}`}
								/>
							</ImageReveal>
							<span className={`absolute top-4 left-4 ${guest.accent} text-white text-xs font-bold uppercase px-3 py-2 rounded-lg`}>
								{guest.role}
							</span>
						</div>
						<Reveal delay={0.2} className="flex flex-col gap-1 pt-2">
							{guest.name ? (
								<h3 className="text-2xl font-bold uppercase tracking-[-0.04em]">{guest.name}</h3>
							) : (
								<h3 className="text-2xl font-bold uppercase tracking-[-0.04em]">{guest.role}</h3>
							)}
							{guest.title && <p className="text-base max-md:text-sm font-medium text-gray-700">{guest.title}</p>}
						</Reveal>
					</li>
				))}
			</ul>
		</section>
	);
}
