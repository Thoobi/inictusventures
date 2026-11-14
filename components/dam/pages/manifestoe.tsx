import { Reveal, SplitReveal } from "@/components/motion";

export default function Manifesto() {
  return (
    <section className="relative bg-black text-white px-12 max-md:px-5 py-32 max-md:py-20 overflow-hidden font-mono">
      <span
        aria-hidden="true"
        className="absolute -top-10 left-6 text-[320px] max-md:text-[200px] leading-none font-bold text-red-700/40 select-none pointer-events-none"
      >
        &ldquo;
      </span>

      <figure className="relative max-w-6xl mx-auto flex flex-col gap-10">
        <Reveal y={16}>
          <span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase text-red-500">
            [ The DAM manifesto ]
          </span>
        </Reveal>
        <blockquote className="text-6xl max-xl:text-5xl max-md:text-3xl font-bold tracking-[-0.04em] leading-[1.05]">
          <SplitReveal
            text="Art is not what you see, but what you make others feel."
            stagger={0.04}
          />{" "}
          <SplitReveal
            text="Dance is not movement — it is the conversation between the body and the music it hasn't heard yet."
            className="text-white/60"
            stagger={0.03}
            delay={0.4}
          />
        </blockquote>
        <Reveal delay={0.6}>
          <figcaption className="text-sm font-bold uppercase text-white/50">
            — The DAM Manifesto, {new Date().getFullYear()}
          </figcaption>
        </Reveal>
      </figure>
    </section>
  );
}
