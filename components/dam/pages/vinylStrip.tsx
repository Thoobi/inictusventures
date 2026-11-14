import Vinyl from "@/components/dam/vinyl";
import { CountUp, Reveal, SplitReveal, Stagger, StaggerItem } from "@/components/motion";

// DAM's prize pool by year, from the founder's profile.
const milestones = [
  {
    year: "2024",
    stage: "Official launch",
    amount: "₦30,000",
    note: "Cash gift to the winners of the first official DAM Talent Show.",
    card: "bg-black",
    disc: "#1c1c1c",
    label: "#b91c1c",
    labelText: "#ffffff",
    spin: "",
  },
  {
    year: "2025",
    stage: "Growing",
    amount: "₦100,000+",
    note: "Given out to winners, plus one award — and every year brings bigger rewards.",
    card: "bg-red-700",
    disc: "#111111",
    label: "#ffffff",
    labelText: "#b91c1c",
    spin: "[animation-direction:reverse]",
  },
];

export default function VinylStrip() {
  return (
    <section
      aria-labelledby="dam-growth-heading"
      className="px-12 max-md:px-5 py-24 max-md:py-14 font-mono bg-white"
    >
      <div className="flex flex-col gap-3 pb-12 max-md:pb-8">
        <Reveal as="span" y={16} className="text-sm max-md:text-xs font-bold tracking-[-0.02em] uppercase text-red-700">
          [ Growing every year ]
        </Reveal>
        <h2
          id="dam-growth-heading"
          className="text-8xl max-md:text-5xl tracking-[-0.05em] font-bold uppercase"
        >
          <SplitReveal text="Bigger stage." className="block" />
          <SplitReveal text="Bigger rewards." className="block text-red-700" delay={0.2} />
        </h2>
      </div>

      <Stagger as="ul" className="grid md:grid-cols-2 gap-4" stagger={0.15}>
        {milestones.map((m) => (
          <StaggerItem
            key={m.year}
            as="li"
            hoverLift
            className={`group relative flex flex-col gap-3 min-h-120 max-md:min-h-104 rounded-[15px] max-md:rounded-lg p-8 max-md:p-6 overflow-hidden text-white ${m.card}`}
          >
            <p className="relative z-10 text-sm font-bold uppercase text-white/70">
              {m.year} · {m.stage}
            </p>
            <p className="relative z-10 text-7xl max-xl:text-6xl max-md:text-5xl font-bold tracking-[-0.05em]">
              <CountUp value={m.amount} />
            </p>
            <p className="relative z-10 text-base max-md:text-sm font-medium text-white/80 max-w-xs">
              {m.note}
            </p>

            {/* Record slides further out of the card on hover */}
            <div className="absolute -bottom-[22%] -right-[18%] w-[80%] max-w-110 transition-transform duration-700 ease-out group-hover:-translate-x-6 group-hover:-translate-y-6">
              <Vinyl
                className={`w-full animate-vinyl ${m.spin}`}
                disc={m.disc}
                label={m.label}
                labelText={m.labelText}
              />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
