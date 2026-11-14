import Image from "next/image";
import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/motion";

const pillars = [
  {
    letter: "D",
    label: "Dance",
    tag: "The body as language",
    img: "/dam/01.jpg",
    desc: "From street movement to traditional and contemporary styles, dancers take the DAM stage to show what they can do — and compete for cash prizes, gifts and awards.",
  },
  {
    letter: "A",
    label: "Art",
    tag: "Vision made tangible",
    img: "/dam/05.png",
    desc: "Arts and crafts are showcased alongside the performances, giving painters, illustrators and makers a stage to be seen and celebrated for their work.",
  },
  {
    letter: "M",
    label: "Music",
    tag: "Sound as architecture",
    img: "/dam/04.png",
    desc: "Singers, rappers and instrumentalists bring their sound to the show. The best performances are rewarded — and every year the prizes get bigger.",
  },
];

export default function Pillars() {
  return (
    <section
      aria-labelledby="dam-pillars-heading"
      className="px-12 max-md:px-5 py-24 max-md:py-14 font-mono bg-[#fbfbfb]"
    >
      <div className="flex lg:flex-row flex-col lg:items-end justify-between gap-6 pb-14 max-md:pb-8">
        <div className="flex flex-col gap-3">
          <Reveal y={16}>
            <span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase text-gray-600">
              [ The three pillars ]
            </span>
          </Reveal>
          <h2
            id="dam-pillars-heading"
            className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase text-red-700"
          >
            <SplitReveal text="Three disciplines." className="block" />
            <SplitReveal text="One stage." className="block text-black" delay={0.2} />
          </h2>
        </div>
        <Reveal delay={0.2} className="max-w-sm">
          <p className="text-lg max-md:text-base font-medium text-gray-800">
            Each pillar stands alone as a discipline. Together, they create
            something entirely new — an art form without a name.
          </p>
        </Reveal>
      </div>

      <Stagger as="ul" className="grid lg:grid-cols-3 gap-4" stagger={0.15}>
        {pillars.map((p) => (
          <StaggerItem
            key={p.letter}
            as="li"
            hoverLift
            className="group relative flex flex-col gap-5 rounded-[15px] max-md:rounded-lg bg-white border border-gray-200 px-8 max-md:px-5 py-10 max-md:py-8 overflow-hidden transition-colors duration-300 hover:bg-red-700 hover:border-red-700"
          >
            <span
              aria-hidden="true"
              className="absolute -top-6 right-2 text-[180px] leading-none font-bold tracking-[-0.05em] text-gray-100 transition-colors duration-300 group-hover:text-white/10 select-none pointer-events-none"
            >
              {p.letter}
            </span>

            <div className="relative size-20 rounded-lg overflow-hidden bg-gray-100">
              <Image src={p.img} alt="" fill sizes="80px" className="object-cover" />
            </div>

            <div className="relative flex flex-col gap-1">
              <h3 className="text-5xl max-md:text-4xl font-bold uppercase tracking-[-0.05em] transition-colors duration-300 group-hover:text-white">
                {p.label}
              </h3>
              <p className="text-sm font-bold uppercase tracking-[-0.02em] text-red-700 transition-colors duration-300 group-hover:text-white/80">
                {p.tag}
              </p>
            </div>

            <p className="relative text-base max-md:text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-white">
              {p.desc}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
