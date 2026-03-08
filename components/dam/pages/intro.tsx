import Image from "next/image";

const stats = [
  { num: "120+", label: "Artists" },
  { num: "36", label: "Events / yr" },
  { num: "8", label: "Cities" },
];

export default function Intro() {
  return (
    <section className="grid grid-cols-2 min-h-[80vh] overflow-hidden max-lg:grid-cols-1">
      {/* Visual */}
      <div className="relative bg-[#0f0c09] overflow-hidden min-h-100">
        <Image
          src="/dam/01.jpg"
          alt="Orchestra"
          width={900}
          height={300}
          className="absolute bottom-[-5%] left-[0%] w-[110%] opacity-[0.15] invert pointer-events-none"
        />
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <Image
            src="/dam/07.png"
            alt="Vintage TVs"
            width={400}
            height={700}
            className="w-[55%] max-w-85 grayscale-[0.3] contrast-110 opacity-85"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center px-16 max-md:px-5 py-20 border-l border-dam-cream/10 reveal">
        <p className="text-dam-red text-[0.6rem] tracking-[0.5em] uppercase mb-8">
          / What is DAM
        </p>

        <h2
          className="text-dam-cream mb-8"
          style={{
            fontFamily: "DM Serif Display, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            lineHeight: 1.15,
          }}
        >
          A stage for every{" "}
          <em
            className="text-dam-gold not-italic"
            style={{ fontStyle: "italic" }}
          >
            bold, raw, authentic
          </em>{" "}
          creative voice.
        </h2>

        <p className="text-dam-cream/60 text-[0.82rem] leading-[1.9] max-w-[38ch] max-md:w-full">
          DAM is not a festival. Not a platform. Not a school.
          <br />
          <br />
          DAM is an ecosystem — a living, breathing convergence of dancers,
          visual artists, and musicians who refuse to be boxed in. We curate
          events, residencies, and collaborations that push the boundaries of
          what&apos;s possible when three disciplines meet.
        </p>

        <div className="flex gap-12 mt-14 pt-10 border-t border-dam-cream/10">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="text-dam-cream leading-none"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "3rem",
                }}
              >
                {s.num}
              </p>
              <p className="text-dam-cream/40 text-[0.6rem] tracking-[0.3em] uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
