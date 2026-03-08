const events = [
  {
    date: "MAR 14, 2026",
    title: "Bodies in Liminal Space",
    meta: "Main Stage · 8:00 PM",
    type: "Dance Performance",
    color: "#e05c2a",
    delay: "0s",
  },
  {
    date: "MAR 21, 2026",
    title: "Vinyl & Visuals Night",
    meta: "Gallery Hall · 7:00 PM",
    type: "Music + Art",
    color: "#d4a017",
    delay: "0.1s",
  },
  {
    date: "APR 03, 2026",
    title: "The Unfinished Frame",
    meta: "Gallery Wing B · All Day",
    type: "Exhibition Opening",
    color: "#4fb8c2",
    delay: "0.2s",
  },
  {
    date: "APR 12, 2026",
    title: "Frequency Workshop",
    meta: "Studio 3 · 10:00 AM",
    type: "Music Workshop",
    color: "#d4a017",
    delay: "0.05s",
  },
  {
    date: "APR 19, 2026",
    title: "Open Floor: Spring Edition",
    meta: "Main Stage · 6:00 PM",
    type: "Open Showcase",
    color: "#e05c2a",
    delay: "0.15s",
  },
  {
    date: "MAY 02, 2026",
    title: "DAM Collective Night",
    meta: "Full Venue · 9:00 PM",
    type: "Multidisciplinary",
    color: "#4fb8c2",
    delay: "0.25s",
  },
];

export default function Events() {
  return (
    <section className="bg-dam-cream text-dam-black py-28 px-16 max-md:px-5 max-md:py-5 relative overflow-hidden">
      {/* Ghost word */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0a0804]/4 whitespace-nowrap pointer-events-none select-none text-[18rem] max-md:text-[7rem]"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        EVENTS
      </span>

      <p className="text-dam-red text-[0.6rem] tracking-[0.5em] uppercase mb-4 reveal">
        / Upcoming
      </p>
      <h2
        className="mb-16 reveal"
        style={{
          fontFamily: "DM Serif Display, serif",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          lineHeight: 1.1,
        }}
      >
        What&apos;s On
        <br />
        at DAM
      </h2>

      <div className="grid grid-cols-3 gap-0.5 max-lg:grid-cols-1">
        {events.map((ev) => (
          <div
            key={ev.title}
            className="event-card bg-dam-black text-dam-cream p-10 max-md:py-5 max-md:px-0 relative overflow-hidden cursor-none reveal"
            style={{ transitionDelay: ev.delay }}
          >
            <p
              className="text-dam-red text-[0.9rem] tracking-[0.2em] mb-2"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {ev.date}
            </p>
            <h3
              className="mb-3 leading-snug"
              style={{
                fontFamily: "DM Serif Display, serif",
                fontSize: "1.6rem",
              }}
            >
              {ev.title}
            </h3>
            <p className="text-dam-cream/40 text-[0.65rem] tracking-[0.2em] uppercase mb-6">
              {ev.meta}
            </p>
            <span
              className="inline-block px-3 py-1 border text-[0.58rem] tracking-[0.3em] uppercase"
              style={{ borderColor: ev.color, color: ev.color }}
            >
              {ev.type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
