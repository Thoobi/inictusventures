import { Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/motion";

const pillars = [
  {
    label: "Cultural Influence",
    content:
      "Celebrating and promoting creativity across every kind of expression — television, radio, theatre, craft and fashion.",
  },
  {
    label: "Innovation & Creativity",
    content:
      "Redefining the entertainment landscape with multimedia solutions that inspire, engage and connect audiences globally.",
  },
  {
    label: "Community",
    content:
      "A vibrant home for artists, creators and enthusiasts — giving diverse voices a platform and celebrating storytelling in film, music, craft and dance.",
  },
];

export default function Vision() {
  return (
    <section
      aria-labelledby="vision-heading"
      className="px-12 max-md:px-5 py-28 max-md:py-16 font-mono bg-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 max-md:gap-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:items-end">
          <div className="flex flex-col gap-3">
            <Reveal as="span" y={16} className="text-sm max-md:text-xs font-bold tracking-[-0.02em] text-red-700 uppercase">
              [ Where we are going ]
            </Reveal>
            <h2
              id="vision-heading"
              className="text-8xl max-md:text-6xl tracking-[-0.05em] font-bold text-red-700 uppercase"
            >
              <SplitReveal text="Our" className="block" />
              <SplitReveal text="Vision" className="block" delay={0.15} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="text-4xl max-xl:text-3xl max-md:text-2xl font-semibold tracking-[-0.04em] leading-tight">
              To be the leading multimedia platform that celebrates and
              promotes creativity{" "}
              <span className="text-gray-400">
                across all kinds of expression, from television and radio to
                theatre, craft and fashion.
              </span>
            </p>
          </Reveal>
        </div>

        <Stagger as="ol" className="flex flex-col border-t border-gray-300" stagger={0.12}>
          {pillars.map((pillar, index) => (
            <StaggerItem
              key={pillar.label}
              as="li"
              className="group relative isolate grid md:grid-cols-[5rem_1fr_1.2fr] gap-x-8 gap-y-3 items-baseline border-b border-gray-300 py-10 max-md:py-7 overflow-hidden"
            >
              {/* Red wash that sweeps up behind the row on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-red-700 transition-transform duration-500 ease-out group-hover:scale-y-100"
              />
              <span className="text-sm font-bold text-red-700 transition-colors duration-300 group-hover:text-white md:pl-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[40px]/[1.05] max-md:text-3xl tracking-[-0.04em] uppercase font-bold transition-all duration-300 group-hover:text-white md:group-hover:translate-x-3">
                {pillar.label}
              </h3>
              <p className="text-lg max-md:text-base font-medium text-gray-700 transition-colors duration-300 group-hover:text-white md:pr-4">
                {pillar.content}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
