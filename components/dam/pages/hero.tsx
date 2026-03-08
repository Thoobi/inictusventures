import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-2 relative overflow-hidden max-md:grid-cols-1">
      {/* LEFT */}
      <div className="flex flex-col justify-center pb-20 pt-36 px-16 max-md:px-5 relative z-10">
        <p
          className="text-dam-red text-[0.65rem] tracking-[0.4em] uppercase mb-6"
          style={{ animation: "fadeup 0.8s 0.2s ease both" }}
        >
          Where Bodies, Visions &amp; Sound Collide
        </p>

        <h1
          className="leading-[0.88] text-dam-cream"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(7rem, 14vw, 14rem)",
            letterSpacing: "-0.02em",
            animation: "fadeup 0.9s 0.35s ease both",
          }}
        >
          D<span className="text-dam-red">A</span>M
        </h1>

        <p
          className="text-dam-gold mt-8"
          style={{
            fontFamily: "DM Serif Display, serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            animation: "fadeup 0.9s 0.5s ease both",
          }}
        >
          Dance · Art · Music
        </p>

        <div
          className="flex gap-6 max-md:gap-4 items-center mt-12"
          style={{ animation: "fadeup 0.9s 0.65s ease both" }}
        >
          {/* <Link
            href="/dam/registration"
            className="bg-dam-red text-dam-white px-10 py-4  max-md:px-3 max-md:py-2 text-[0.7rem] tracking-[0.2em] uppercase no-underline hover:bg-dam-cream hover:text-dam-black transition-colors"
          >
            Join the Movement
          </Link> */}
          <Link
            href="/dam/gallery"
            className="border border-dam-cream/30 text-dam-cream px-10 max-md:px-3 max-md:py-2 py-4 text-[0.7rem] tracking-[0.2em] uppercase no-underline hover:border-dam-cream hover:text-dam-gold transition-colors"
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* RIGHT — collage */}
      <div className="relative overflow-hidden min-h-100">
        {/* Cranberries vinyl — main centrepiece */}
        <div
          className="absolute rounded-full"
          style={{
            width: "72%",
            top: "50%",
            left: "50%",
            transform: "translate(-45%, -50%)",
            animation: "vinyl 1.2s 0.5s ease both",
            filter: "drop-shadow(0 0 50px rgba(192,40,26,0.35))",
          }}
        >
          <Image
            src="/dam/03.png"
            alt="Vinyl Record"
            width={600}
            height={600}
            className="w-full rounded-full animate-vinyl"
            priority
          />
        </div>

        {/* Microphone */}
        <div
          className="absolute"
          style={{
            width: "32%",
            bottom: "10%",
            right: "4%",
            transform: "rotate(-8deg)",
            animation: "fadeup 0.8s 1s ease both",
            filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))",
          }}
        >
          <Image
            src="/dam/02.png"
            alt="Microphone"
            width={300}
            height={300}
            className="w-full"
          />
        </div>

        {/* Music note */}
        <div
          className="absolute"
          style={{
            width: "18%",
            top: "14%",
            left: "4%",
            transform: "rotate(12deg)",
            animation: "fadeup 0.8s 1.2s ease both",
          }}
        >
          <Image
            src="/dam/04.png"
            alt="Music Note"
            width={200}
            height={200}
            className="w-full"
          />
        </div>

        {/* Film strip */}
        <div
          className="relative"
          style={{
            width: "26%",
            top: "-100%",
            left: "0%",
            transform: "rotate(5deg)",
            animation: "fadeup 0.8s 0.9s ease both",
            filter: "drop-shadow(0 5px 20px rgba(0,0,0,0.5))",
            opacity: 0.85,
          }}
        >
          <Image
            src="/dam/05.png"
            alt="Film Strip"
            width={300}
            height={500}
            className="w-full rounded"
          />
        </div>

        {/* Orchestra ghost */}
        {/* <Image
          src="/dam/01.png"
          alt=""
          width={1200}
          height={300}
          aria-hidden
          className="absolute bottom-0 w-[160%] left-[-30%] opacity-[0.06] pointer-events-none invert"
        /> */}
      </div>
    </section>
  );
}
