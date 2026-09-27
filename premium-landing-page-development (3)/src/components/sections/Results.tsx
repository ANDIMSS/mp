import { useState } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import { BEFORE_AFTER, BENEFITS } from "../../data/site";
import { Ambient, Reveal, SectionHeading } from "../ui";

const CASES = [
  {
    company: "Vertice Log",
    sector: "Logística · 180 pessoas",
    headline: "De 4% a 11% de margem em 9 meses",
    detail: "Reprecificação por cliente, fim de 3 rotas deficitárias e SLA de docas.",
    from: "4,1%",
    to: "11,2%",
  },
  {
    company: "Ferraz & Cia",
    sector: "Indústria · R$ 62 mi/ano",
    headline: "R$ 4,1 mi de custo estrutural removidos",
    detail: "Base zero no administrativo, consolidação de 2 CDs e terceirização de manutenção.",
    from: "R$ 18,9 mi",
    to: "R$ 14,8 mi",
  },
  {
    company: "Vitalis Clin",
    sector: "Saúde · 14 unidades",
    headline: "38% mais produtividade por hora de equipe",
    detail: "Escala por demanda de agenda, protocolo clínico único e ritos por unidade.",
    from: "3,1 atend./h",
    to: "4,3 atend./h",
  },
];

export function Results() {
  const [view, setView] = useState<"antes" | "depois">("depois");

  return (
    <section id="resultados" className="mp-section relative overflow-hidden bg-midnight">
      <Ambient variant="warm" />
      <div className="mp-shell relative">
        <SectionHeading
          eyebrow="Benefícios"
          title={
            <>
              O que muda quando a empresa
              <br />
              <span className="text-white/45">para de improvisar.</span>
            </>
          }
          lead="Ganho de margem não vem de corte cego nem de aumento de preço. Vem de decisão tomada cedo, com dado certo e responsável definido."
        />

        {/* Antes / Depois */}
        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
              <div
                role="group"
                aria-label="Comparar operação antes e depois do método"
                className="inline-flex rounded-xl border border-white/10 bg-midnight p-1"
              >
                {(["antes", "depois"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={view === option}
                    onClick={() => setView(option)}
                    className={`rounded-lg px-4 py-2 text-[0.82rem] font-semibold tracking-[0.02em] transition-all duration-300 ${
                      view === option
                        ? option === "depois"
                          ? "bg-[#0f2836] text-ice"
                          : "bg-white/[0.08] text-snow"
                        : "text-white/45 hover:text-white/75"
                    }`}
                  >
                    {option === "antes" ? "Antes" : "Depois"}
                  </button>
                ))}
              </div>

              <h3 className="mt-6 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.025em]">
                {view === "antes" ? (
                  <>A rotina que consome o sócio</>
                ) : (
                  <>
                    A rotina que <span className="mp-gradient-text">trabalha sozinha</span>
                  </>
                )}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-white/55">
                {view === "antes"
                  ? "Tudo depende de você: as informações chegam tarde, as prioridades mudam na segunda-feira e o time espera a decisão para agir."
                  : "Cada área sabe o número do dia, o critério da decisão e o prazo. Você entra no que é estratégico — o resto roda no padrão."}
              </p>

              <ul className="mt-6 grid gap-2.5">
                {BEFORE_AFTER.map((row, index) => (
                  <li
                    key={row.before}
                    className="mp-anim-rise flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 text-[0.89rem] leading-snug transition-colors duration-300 hover:border-white/[0.09] hover:bg-white/[0.03]"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: view === "depois" ? "#6fe0a8" : "rgba(240,180,106,0.9)",
                        boxShadow:
                          view === "depois"
                            ? "0 0 10px rgba(111,224,168,0.6)"
                            : "0 0 10px rgba(240,180,106,0.45)",
                      }}
                      aria-hidden="true"
                    />
                    <span className={view === "depois" ? "text-white/80" : "text-white/55"}>
                      {view === "depois" ? row.after : row.before}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Bento de benefícios */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {BENEFITS.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                delay={index * 90}
                className={benefit.span === "lg" ? "sm:col-span-2" : ""}
              >
                <article className="mp-card group flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
                  <div>
                    <p className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-none tracking-[-0.04em]">
                      <span className="mp-gradient-text">{benefit.stat}</span>
                    </p>
                    <p className="mt-2.5 text-[0.76rem] tracking-[0.06em] text-white/45 uppercase">
                      {benefit.statLabel}
                    </p>
                  </div>
                  <div>
                    <h3 className="mp-h3">{benefit.title}</h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-white/58">{benefit.body}</p>
                  </div>
                  <span
                    className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 opacity-90 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundImage: "var(--mp-gradient)" }}
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Cases */}
        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.07] pt-10">
              <h3 className="mp-h3 flex items-center gap-2.5">
                <Building2 size={17} className="text-ice" aria-hidden="true" />
                Cases em três números
              </h3>
              <p className="text-[0.85rem] text-white/45">
                Projetos concluídos em 2023–2025, com resultado auditado pelos clientes.
              </p>
            </div>
          </Reveal>

          <ul className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] lg:grid-cols-3">
            {CASES.map((item, index) => (
              <li key={item.company} className="reveal group relative bg-[#08121b]" style={{ "--reveal-delay": `${index * 110}ms` } as React.CSSProperties}>
                <div className="flex h-full flex-col gap-5 p-6 transition-colors duration-500 group-hover:bg-[#0b1a26] sm:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-[0.95rem] font-semibold text-snow">{item.company}</span>
                    <span className="text-[0.72rem] tracking-[0.08em] text-white/40 uppercase">{item.sector.split("·")[0]}</span>
                  </div>
                  <p className="text-[0.82rem] leading-snug text-white/45">{item.sector}</p>

                  <div className="mt-auto flex items-center gap-3 border-t border-white/[0.07] pt-5">
                    <span className="font-mono text-[0.9rem] text-white/40 line-through decoration-white/25">
                      {item.from}
                    </span>
                    <ArrowRight size={14} className="text-ice transition-transform duration-400 group-hover:translate-x-1" aria-hidden="true" />
                    <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ice">
                      {item.to}
                    </span>
                  </div>
                  <p className="text-[0.92rem] font-medium leading-snug text-white/80">{item.headline}</p>
                  <p className="text-[0.84rem] leading-relaxed text-white/50">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
