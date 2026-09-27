import { useEffect } from "react";
import { Header } from "./components/Header";
import { CinematicHero } from "./components/hero/CinematicHero";
import { SocialProof } from "./components/sections/SocialProof";
import { Method } from "./components/sections/Method";
import { Showcase } from "./components/sections/Showcase";
import { Results } from "./components/sections/Results";
import { Testimonials } from "./components/sections/Testimonials";
import { Pricing } from "./components/sections/Pricing";
import { Faq } from "./components/sections/Faq";
import { Diagnostico } from "./components/sections/Diagnostico";
import { Footer } from "./components/Footer";
import { useRevealObserver } from "./hooks/useReveal";

export default function App() {
  useRevealObserver();

  /* Luz que segue o cursor dentro dos botões (CSS vars, sem rerender). */
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(".mp-btn");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <a
        href="#conteudo"
        className="mp-sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-snow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-midnight"
      >
        Ir para o conteúdo
      </a>

      <Header />

      <main id="top">
        <div id="conteudo" className="mp-sr-only">
          Conteúdo principal
        </div>

        <CinematicHero />
        <SocialProof />
        <Method />
        <Showcase />
        <Results />
        <Testimonials />
        <Pricing />
        <Faq />
        <Diagnostico />
      </main>

      <Footer />
    </>
  );
}
