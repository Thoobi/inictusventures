import Image from "next/image";
import Button from "../custom/button";
import Partner1 from "../../public/assets/home/part.jpg";

export default function Manifesteos() {
  return (
    <div className="flex flex-col items-end py-20 max-md:py-10 max-md:w-full font-mono bg-linear">
      <span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] text-gray-400 mb-3 uppercase px-12 max-md:px-5">
        [ Collaborations ]
      </span>
      <div className="w-2/5 max-md:w-[80%] flex flex-col justify-start items-start px-12 max-md:px-5">
        <h1 className="text-8xl max-md:text-6xl text-right tracking-[-0.05em] font-bold text-red-700 mb-4">
          WORK WITH US
        </h1>
      </div>
      <div className="flex flex-col gap-10 max-md:gap-8 pb-20 pt-10 max-md:pt-5 max-md:pb-5 px-5">
        <Image
          src={Partner1}
          alt="partner"
          width={900}
          height={400}
          className="h-auto w-full max-md:h-50 object-cover rounded-lg"
          priority
        />
        <div className="text-5xl max-md:text-xl text-gray-500 font-medium px-5 max-md:px-0 tracking-[-0.01em]">
          We don&apos;t collaborate with everyone. We partner with the
          relentless. Whether you&apos;re a brand looking for cultural
          relevance, an artist ready for the global stage, or an investor
          backing the next multimedia titan—Inistic is the engine. We provide
          the infrastructure; you provide the fire.
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button
            title="Partner with us"
            className="bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 max-md:py-3 max-md:px-5 px-8 rounded-lg hover:from-black hover:to-red-700 hover:scale-105 transition-all duration-300 ease-out max-md:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
