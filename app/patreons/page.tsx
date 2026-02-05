export default function Patreons() {
  return (
    <section className="flex flex-col pt-40">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-end mb-10 flex flex-col gap-1">
          <h1 className="text-5xl font-bold font-mono">Patreons</h1>
          <p className="text-base text-gray-700 font-mono">
            Explore the collection of artworks and creations from our talented
            artists.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4 mb-16">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-gray-200 ${
                index % 7 === 0
                  ? "col-span-2 row-span-3"
                  : index % 5 === 0
                    ? "col-span-2 row-span-3"
                    : index % 3 === 0
                      ? "col-span-2 row-span-3"
                      : "col-span-2 row-span-3"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
