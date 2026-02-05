import bg from "../../public/assets/home/bg5.png";
import Dance from "../../public/assets/home/dance1.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="flex flex-row items-center justify-between h-screen w-full bg-white"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-start h-full px-12 pb-25 justify-end w-190">
        <h1 className="text-[90px]/[100px] tracking-[-0.05em] font-bold text-black mb-4 font-mono">
          PIONEERING CREATIVE INFLUENCE.
        </h1>
        <p className="text-lg text-gray-900 tracking-[-0.03em] mb-8 font-mono font-medium">
          We don&apos;t just host events; we build the stage for a new era. From
          the grit of the workshop to the glow of the screen, we are the
          machinery behind the world&apos;s most influential voices.
        </p>
      </div>
      <div className="pr-12 pb-5 pt-15">
        <Image src={Dance} alt="dance" width={450} height={400} />
      </div>
    </section>
  );
}
