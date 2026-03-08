import Image from "next/image";

const vinyls = [
  {
    src: "/dam/03.png",
    title: "Listening Room",
    sub: "Every Friday · 7PM",
    bg: "#060a0b",
    anim: "slowspin 20s linear infinite",
  },
  {
    src: "/dam/06.png",
    title: "Late Night Sessions",
    sub: "Saturdays · 10PM — 2AM",
    bg: "#080604",
    anim: "slowspin 20s linear infinite reverse",
  },
];

export default function VinylStrip() {
  return (
    <section className="grid grid-cols-2 min-h-[60vh] max-md:grid-cols-1">
      {vinyls.map((v) => (
        <div
          key={v.title}
          className="relative flex items-center justify-center py-20 px-16 overflow-hidden"
          style={{ background: v.bg }}
        >
          {/* Spinning record */}
          <div className="relative w-[70%] max-w-95 aspect-square">
            <Image
              src={v.src}
              alt={v.title}
              fill
              className="rounded-full object-cover vinyl-record"
              style={{
                animation: v.anim,
                filter: "drop-shadow(0 0 60px rgba(0,0,0,0.9))",
              }}
            />
          </div>

          {/* Label overlay */}
          <div className="absolute bottom-10 left-10">
            <h3
              className="text-white tracking-widest"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "2rem" }}
            >
              {v.title}
            </h3>
            <p className="text-white/35 text-[0.6rem] tracking-[0.35em] uppercase mt-1">
              {v.sub}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
