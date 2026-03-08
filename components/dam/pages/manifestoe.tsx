export default function Manifesto() {
  return (
    <section className="py-40 px-16 text-center relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(192,40,26,0.08) 0%, transparent 70%)",
        }}
      />

      <blockquote
        className="manifesto-quote relative inline-block text-dam-cream mx-auto reveal"
        style={{
          fontFamily: "DM Serif Display, serif",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
          lineHeight: 1.3,
          maxWidth: "900px",
        }}
      >
        Art is not what you see, but what you make others feel. Dance is not
        movement — it is the conversation between the body and the music it
        hasn&apos;t heard yet.
      </blockquote>

      <p className="text-dam-cream/30 text-[0.65rem] tracking-[0.4em] uppercase mt-10 reveal relative z-10">
        — The DAM Manifesto, {new Date().getFullYear()}
      </p>
    </section>
  );
}
