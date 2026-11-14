import Bg from "../../public/assets/home/partner.jpg";
import Image from "next/image";
import { Parallax, Reveal, SplitReveal } from "@/components/motion";

export default function Hero() {
  return (
    <section className="relative flex flex-row items-center justify-between h-screen w-full bg-black overflow-hidden">
      {/* Decorative background, loaded with priority because it's the LCP image */}
      <Parallax className="absolute inset-0" distance={200}>
        <Image
          src={Bg}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center scale-110"
        />
      </Parallax>
      {/* Darkens the bottom so the white headline keeps its contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
      />
      <div className="relative flex flex-col items-center h-full px-12 pb-25 max-md:px-5 justify-end w-190 max-md:w-full">
        <h1 className="text-[90px]/[100px] max-md:text-6xl tracking-[-0.05em] font-bold text-white mb-4 font-mono">
          <SplitReveal text="PIONEERING CREATIVE INFLUENCE." onMount delay={0.2} />
        </h1>
        <Reveal as="p" y={20} delay={0.7} className="text-lg max-md:text-sm text-white tracking-[-0.03em] mb-8 font-mono font-medium">
          We don&apos;t just host events; we build the stage for a new era. From
          the grit of the workshop to the glow of the screen, we are the
          machinery behind the world&apos;s most influential voices.
        </Reveal>
      </div>
    </section>
  );
}
