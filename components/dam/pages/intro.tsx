import Image from "next/image";
import Link from "next/link";
import { CountUp, Parallax, Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/motion";

// Facts from the founder's profile.
const stats = [
  { num: "2022", label: "Birthed", static: true },
  { num: "₦100,000+", label: "Prizes in 2025" },
  { num: "3", label: "Disciplines" },
];

export default function Intro() {
  return (
    <section
      aria-labelledby="dam-intro-heading"
      className="grid lg:grid-cols-2 gap-16 max-lg:gap-10 items-center px-12 max-md:px-5 py-24 max-md:py-14 font-mono bg-white"
    >
      {/* Visual */}
      <Reveal y={60} className="relative">
        <Parallax className="relative aspect-4/5 max-lg:aspect-square rounded-[15px] overflow-hidden bg-gray-100" distance={-60}>
          <Image
            src="/dam/01.jpg"
            alt=""
            width={736}
            height={210}
            className="absolute -bottom-[2%] left-0 w-full opacity-15 pointer-events-none"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <Image
              src="/dam/07.png"
              alt=""
              width={375}
              height={666}
              className="w-[50%] max-w-72 h-auto"
            />
          </div>
        </Parallax>
        <span
          aria-hidden="true"
          className="absolute -bottom-4 -right-4 max-md:-right-2 bg-red-700 text-white text-sm font-bold uppercase px-4 py-2 rounded-lg rotate-3"
        >
          Since 2022
        </span>
      </Reveal>

      {/* Text */}
      <div className="flex flex-col gap-6">
        <Reveal y={16}>
          <span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase text-red-700">
            [ What is DAM ]
          </span>
        </Reveal>

        <h2
          id="dam-intro-heading"
          className="text-6xl max-xl:text-5xl max-md:text-4xl tracking-[-0.05em] font-bold uppercase"
        >
          <SplitReveal text="A stage for every" />{" "}
          <SplitReveal text="bold, raw, authentic" className="text-red-700" delay={0.2} />{" "}
          <SplitReveal text="creative voice." delay={0.4} />
        </h2>

        <Reveal delay={0.2}>
          <div className="flex flex-col gap-4 text-lg max-md:text-base font-medium text-gray-800 max-w-xl">
            <p>
              Birthed in 2022 and officially launched in 2024 as a branch of
              Inistic Multimedia Company, DAM exists to impact people and
              celebrate creativity in Dance, Art and Music.
            </p>
            <p>
              The show showcases arts and crafts and encourages talent with cash
              prizes, gifts and awards — committed to discovering the best
              talents and giving them a platform to grow, be seen, and be
              celebrated.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 self-start pt-2 text-base font-bold text-black"
            >
              <span className="text-gray-600 font-medium">Founded by</span>
              <span className="underline decoration-red-700 decoration-2 underline-offset-4">
                Sunday Iniobong
              </span>
              <span aria-hidden="true" className="text-red-700 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Wraps instead of fixed columns, so long values like ₦100,000+ never collide */}
        <Stagger as="dl" className="flex flex-wrap gap-x-12 gap-y-2 border-t border-gray-300 mt-4" delay={0.2}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col-reverse gap-1 pt-5">
              <dt className="text-xs font-bold uppercase text-gray-600">{s.label}</dt>
              <dd className="text-5xl max-xl:text-4xl font-bold tracking-[-0.05em] whitespace-nowrap">
                {"static" in s ? s.num : <CountUp value={s.num} />}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
