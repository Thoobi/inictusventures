import Image from "next/image";

const pillars = [
  {
    letter: "D",
    label: "Dance",
    tag: "The body as language",
    accent: "pillar-dance",
    img: "/dam/01.jpg",
    imgClass: "invert opacity-80",
    desc: "From classical ballet to street movement, from contemporary performance to traditional ceremony — DAM celebrates every form of the human body in motion. We host open residencies, workshops, and showcase nights year-round.",
    delay: "0s",
  },
  {
    letter: "A",
    label: "Art",
    tag: "Vision made tangible",
    accent: "pillar-art",
    img: "/dam/05.png",
    imgClass: "opacity-75",
    desc: "Our gallery rotates every six weeks with works that challenge, provoke, and invite dialogue. Installations, photography, mixed media, and live art performances blur the line between art-making and art-watching.",
    delay: "0.15s",
  },
  {
    letter: "M",
    label: "Music",
    tag: "Sound as architecture",
    accent: "pillar-music",
    img: "/dam/04.png",
    imgClass: "",
    desc: "Live sets, vinyl listening sessions, experimental composition, and genre-defying concerts. DAM's music programme runs weekly — from intimate acoustic evenings to all-night, full-venue sonic experiences.",
    delay: "0.3s",
  },
];

export default function Pillars() {
  return (
    <section className="pb-32">
      {/* Header */}
      <div className="flex items-end max-md:items-start justify-between px-16 max-md:w-full max-md:px-5 pt-24 max-md:pt-10 pb-16 border-b border-dam-cream/[0.08] reveal max-md:flex-col max-md:gap-6">
        <h2
          className="text-dam-cream leading-none"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
          }}
        >
          Three
          <br />
          Disciplines.
          <br />
          One Stage.
        </h2>
        <p className="text-dam-cream/40 text-[0.72rem] tracking-wider leading-[1.7] max-w-[30ch] max-md:max-w-full">
          Each pillar stands alone as a discipline. Together, they create
          something entirely new — an art form without a name.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 max-lg:grid-cols-1">
        {pillars.map((p) => (
          <div
            key={p.letter}
            className={`pillar-card ${p.accent} relative px-14 max-md:px-5 py-16 border-r border-dam-cream/[0.08] last:border-r-0 overflow-hidden reveal max-lg:border-r-0 max-lg:border-b`}
            style={{ transitionDelay: p.delay }}
          >
            {/* Ghost letter */}
            <span
              className="absolute top-4 right-6 text-dam-cream/[0.05] leading-none select-none pointer-events-none"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "6rem" }}
            >
              {p.letter}
            </span>

            <div className="w-20 h-20 mb-8 relative">
              <Image
                src={p.img}
                alt={p.label}
                fill
                className={`object-cover rounded ${p.imgClass}`}
              />
            </div>

            <p
              className="text-dam-cream leading-none mb-2"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "3rem" }}
            >
              {p.label}
            </p>

            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase mb-6"
              style={{
                color:
                  p.accent === "pillar-dance"
                    ? "#e05c2a"
                    : p.accent === "pillar-art"
                      ? "#4fb8c2"
                      : "#d4a017",
              }}
            >
              {p.tag}
            </p>

            <p className="text-dam-cream/50 text-[0.78rem] leading-[1.85]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
