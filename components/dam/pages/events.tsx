const events = [
  {
    date: "NOV 21, 2026",
    title: "DAM Talent Show",
    meta: "Gijasec School · 10:00 AM",
    type: "Dance · Art · Music",
    color: "#e05c2a",
    delay: "0s",
  },
];

export default function Events() {
  return (
    <section className="bg-dam-cream text-dam-black py-28 px-16 max-md:px-5 max-md:py-5 relative overflow-hidden">
      {/* Ghost word: generated content so it stays out of the a11y tree */}
      <span
        aria-hidden="true"
        data-word="EVENTS"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0a0804]/4 whitespace-nowrap pointer-events-none select-none text-[18rem] max-md:text-[7rem] before:content-[attr(data-word)]"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      />

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

      <div className="grid grid-cols-1 max-w-xl">
        {events.map((ev) => (
          <div
            key={ev.title}
            className="event-card bg-dam-black text-dam-cream p-10 max-md:p-6 relative overflow-hidden reveal"
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
