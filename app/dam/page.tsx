// import Navbar from "@/components/dam/Navbar";
import Hero from "@/components/dam/pages/hero";
import Ticker from "@/components/dam/ticker";
import Intro from "@/components/dam/pages/intro";
import Pillars from "@/components/dam/pages/pillars";
import Events from "@/components/dam//pages/events";
import Manifesto from "@/components/dam/pages/manifestoe";
import VinylStrip from "@/components/dam/pages/vinylStrip";
import Cursor from "@/components/dam/cursor";
import ScrollReveal from "@/components/dam/scrollReveal";

export default function Home() {
  return (
    <main className="bg-dam-black min-h-screen">
      {/* <Cursor /> */}
      <ScrollReveal />
      <Hero />
      <Ticker />
      <Intro />
      <Pillars />
      <Events />
      <Manifesto />
      <VinylStrip />
    </main>
  );
}
