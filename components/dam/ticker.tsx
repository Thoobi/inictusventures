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
    <div className="bg-red-800 overflow-hidden py-3 whitespace-nowrap">
      <div
        className="inline-block animate-ticker"
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          fontSize: "1.1rem",
          letterSpacing: "0.05em",
          fontWeight: "semibold",
        }}
      >
        {repeated.map((word, i) => (
          <span key={i} className="text-white">
            {word}
            <span className="mx-8 text-white/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
