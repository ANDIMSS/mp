import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/site";
import { Ambient, Reveal } from "../ui";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % count), 7600);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="depoimentos"
      className="mp-section relative overflow-hidden border-y border-white/[0.06] bg-[#050c13]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Ambient />
      <div className="mp-shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="mp-eyebrow">Depoimentos</p>
            <h2 className="mp-h2 mt-5">
              Quem trocou o
              <br />
              <span className="text-white/45">“achismo”</span> pelo
              <br />
              método.
            </h2>
            <p className="mp-support mt-6 max-w-sm">
              Cinco empresários, cinco setores, o mesmo padrão de resultado: decisão mais rápida,
              margem maior e dono menos necessário no dia a dia.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Depoimento anterior"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-ice/50 hover:text-snow"
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Próximo depoimento"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-ice/50 hover:text-snow"
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
              <span className="mp-mono ml-2 text-[0.8rem] text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-8">
            <div
              ref={regionRef}
              role="group"
              aria-roledescription="carrossel"
              aria-label="Depoimentos de clientes MP 365"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  go(index + 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  go(index - 1);
                }
              }}
              className="mp-card relative overflow-hidden p-7 sm:p-10"
            >
              <Quote size={54} className="absolute -top-1 right-6 text-white/[0.05]" aria-hidden="true" />

              <div key={active.name} className="mp-anim-rise">
                <blockquote className="relative">
                  <p className="font-display text-[clamp(1.25rem,2.3vw,1.85rem)] font-medium leading-[1.35] tracking-[-0.02em] text-snow">
                    “{active.quote}”
                  </p>
                </blockquote>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/[0.07] pt-6">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[0.85rem] font-semibold text-midnight"
                    style={{ background: "var(--mp-gradient)" }}
                    aria-hidden="true"
                  >
                    {active.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold text-snow">{active.name}</span>
                    <span className="block text-[0.83rem] text-white/50">
                      {active.role} · {active.sector}
                    </span>
                  </span>
                  <span className="mp-tag ml-auto normal-case tracking-normal text-ice">
                    {active.metric}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex gap-2" role="tablist" aria-label="Selecionar depoimento">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.name}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Depoimento de ${item.name}`}
                    onClick={() => go(i)}
                    className="group py-2"
                  >
                    <span
                      className={`block h-[3px] rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-16 bg-white/80"
                          : "w-8 bg-white/18 group-hover:bg-white/40 group-focus-visible:bg-white/40"
                      }`}
                      style={i === index ? { backgroundImage: "var(--mp-gradient)" } : undefined}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
