import { useRef, useState } from "react";
import { ArrowRight, Check, Radar } from "lucide-react";
import { LENSES, METHOD_STEPS } from "../../data/site";
import { Ambient, Reveal, SectionHeading } from "../ui";

export function Method() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = METHOD_STEPS[active];

  const move = (next: number) => {
    const clamped = (next + METHOD_STEPS.length) % METHOD_STEPS.length;
    setActive(clamped);
    tabRefs.current[clamped]?.focus();
  };

  return (
    <section id="metodo" className="mp-section relative overflow-hidden bg-midnight">
      <Ambient />
      <div className="mp-shell relative">
        <SectionHeading
          eyebrow="O método MP 365"
          title={
            <>
              Perceber. Decidir. Agir.
              <br />
              <span className="text-white/45">Repetir por 365 dias.</span>
            </>
          }
          lead="Quatro fases encadeadas, com prazo, dono e número em cada uma. O mesmo método que já rodou em 147 empresas — adaptado ao seu setor, ao seu caixa e ao seu time."
          aside={
            <a
              href="#diagnostico"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-medium text-snow transition-all duration-300 hover:border-ice/50 hover:bg-white/[0.04]"
            >
              Começar pela fase 01
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          }
        />

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Fases */}
          <Reveal className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Fases do método"
              aria-orientation="vertical"
              className="relative grid gap-1.5"
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  move(active + 1);
                } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  move(active - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  move(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  move(METHOD_STEPS.length - 1);
                }
              }}
            >
              <span
                className="pointer-events-none absolute left-[30px] top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-ice/45 via-grape/40 to-transparent sm:block"
                aria-hidden="true"
              />
              {METHOD_STEPS.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.key}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    role="tab"
                    id={`method-tab-${item.key}`}
                    aria-selected={isActive}
                    aria-controls={`method-panel-${item.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={`group relative flex items-start gap-4 rounded-2xl px-3 py-4 text-left transition-all duration-400 ${
                      isActive ? "bg-white/[0.055]" : "hover:bg-white/[0.025]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full border font-display text-[0.7rem] font-semibold transition-all duration-400 ${
                        isActive
                          ? "border-transparent text-midnight"
                          : "border-white/20 text-white/55 group-hover:border-ice/50"
                      }`}
                      style={isActive ? { background: "var(--mp-gradient)" } : undefined}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-display text-[1.15rem] font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                          isActive ? "text-snow" : "text-white/70 group-hover:text-snow"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[0.8rem] tracking-[0.09em] text-white/42 uppercase">
                        {item.duration}
                      </span>
                      <span
                        className={`mt-2.5 block overflow-hidden text-[0.86rem] leading-relaxed text-white/55 transition-all duration-500 ${
                          isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0 sm:max-h-0"
                        }`}
                      >
                        {item.summary.split(". ")[0]}.
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Painel */}
          <Reveal delay={120} className="lg:col-span-8">
            <div
              key={step.key}
              role="tabpanel"
              id={`method-panel-${step.key}`}
              aria-labelledby={`method-tab-${step.key}`}
              className="mp-card mp-anim-rise h-full p-7 sm:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="mp-tag">{step.phase}</span>
                <span className="mp-tag">{step.duration}</span>
                <span className="ml-auto hidden items-center gap-2 text-[0.72rem] tracking-[0.16em] text-white/40 uppercase sm:flex">
                  <Radar size={13} /> Etapa do ciclo contínuo
                </span>
              </div>

              <h3 className="mt-6 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">
                {step.title}
                <span className="text-white/35"> — </span>
                <span className="mp-gradient-text">
                  {step.key === "perceber"
                    ? "a empresa medida, não opinionada"
                    : step.key === "decidir"
                      ? "cenários com preço e prazo"
                      : step.key === "agir"
                        ? "implantação junto com o time"
                        : "o método se retroalimenta"}
                </span>
              </h3>

              <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-white/68">{step.summary}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-5">
                <div className="sm:col-span-3">
                  <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-ice uppercase">
                    O que fazemos
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {step.deliverables.map((item, i) => (
                      <li
                        key={item}
                        className="mp-anim-rise flex gap-3 text-[0.92rem] leading-snug text-white/78"
                        style={{ animationDelay: `${140 + i * 90}ms` }}
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-ice" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/45 uppercase">
                    Você recebe
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.outputs.map((item) => (
                      <li key={item} className="mp-tag normal-case tracking-normal">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* As 6 lentes */}
        <Reveal delay={80}>
          <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-white/[0.07] pt-10">
            <h3 className="mp-h3">Seis lentes, um só organismo</h3>
            <p className="max-w-md text-[0.88rem] text-white/50">
              Nenhum pilar é analisado sozinho: o score de cada um pondera os outros cinco — é por
              isso que o diagnóstico raramente confirma a suspeita inicial.
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {LENSES.map((lens) => (
            <li key={lens.name} className="group relative bg-midnight">
              <div className="flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-500 group-hover:bg-[#0b1a26]">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[1.12rem] font-semibold tracking-[-0.02em] text-snow">
                    {lens.name}
                  </span>
                  <span className="font-mono text-[0.68rem] tracking-[0.1em] text-white/35 transition-colors duration-500 group-hover:text-ice">
                    {lens.metric}
                  </span>
                </div>
                <p className="text-[0.88rem] leading-snug text-white/55">{lens.note}</p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundImage: "var(--mp-gradient)" }} aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
