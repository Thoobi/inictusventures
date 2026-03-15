export default function Vision() {
  const VisionData = [
    {
      id: 1,
      label: "Cultural Influence",
      content:
        "To be the leading multimedia platform that celebrates and promotes creativity across all kinds of expression, from television, radio to theater, craft, and fashion.",
      image: "",
    },
    {
      id: 2,
      label: "Innovation and Creativity",
      content:
        "To redefine the entertainment landscape by pioneering innovative multimedia solutions that inspire, engage, and connect audiences globally.",
      image: "",
    },
    {
      id: 3,
      label: "Community",
      content:
        "To foster a vibrant community of artists, creators,  enthusiasts, providing a platform for diverse voices and celebrating the power of storytelling in all its forms such as films, music, Craft and dance.",
      image: "",
    },
  ];

  return (
    <div className="flex flex-col items-start px-12 max-md:w-full py-20 max-md:px-5 max-md:py-10 font-mono bg-linear">
      <span className="text-sm max-md:text-xs font-bold tracking-[-0.02em] text-red-700 mb-3 max-md:mb-0 uppercase">
        [ WHERE WE ARE GOING ]
      </span>
      <div className="w-full flex flex-row gap-10 max-md:gap-5 py-10 max-md:py-5 max-md:flex-col">
        <div className="w-2/6 max-md:w-full flex flex-col justify-start items-start">
          <h1 className="text-8xl max-md:text-6xl tracking-[-0.05em] font-bold text-red-700 mb-4 max-md:mb-2 max-md:w-1/2">
            OUR VISION
          </h1>
          <p className="text-base max-md:text-sm font-medium text-gray-800 mb-10 max-md:mb-8">
            At inistic Ventures, our vision is to be the leading multimedia
            platform that celebrates and promotes creativity across all kinds of
            expression, from television, radio to theater, craft, and fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 w-2/3 max-md:w-full px-5 gap-10">
          {VisionData.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col group gap-8 border-b border-b-gray-400 py-10 max-md:py-4 cursor-pointer px-6 -mx-6 transition-all duration-300 max-md:px-0"
              >
                <h2 className="text-[40px] max-md:text-3xl tracking-[-0.03em] uppercase font-bold group-hover:text-opacity-80 transition-all duration-300">
                  {item.label}
                </h2>
                <p className="text-lg text-black max-h-0 group-hover:max-h-96 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
