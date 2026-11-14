const items = [
  "DANCE",
  "ART",
  "MUSIC",
  "MOVEMENT",
  "CREATION",
  "EXPRESSION",
  "SOUND",
  "VISION",
  "RHYTHM",
  "CULTURE",
];

export default function Ticker() {
  const repeated = [...items, ...items];

  return (
    <div aria-hidden="true" className="bg-red-700 overflow-hidden py-4 whitespace-nowrap font-mono -rotate-1 scale-[1.02]">
      <div className="inline-block animate-ticker text-2xl max-md:text-lg font-bold tracking-[-0.03em]">
        {repeated.map((word, i) => (
          <span key={i} className="text-white">
            {word}
            <span className="mx-8 text-white/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
