import { useState } from "react";
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { PLANS, PLAN_FAQ } from "../../data/site";
import { Ambient, Reveal, SectionHeading } from "../ui";

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const GUARANTEES = [
  { icon: Clock3, title: "Payback médio de 7 meses", body: "Ganho de margem e caixa do ciclo 1 costuma cobrir o investimento do ano inteiro." },
  { icon: ShieldCheck, title: "Saída a qualquer momento", body: "Sem fidelidade automática. 30 dias de aviso e todo o conhecimento fica com a empresa." },
  { icon: BadgeCheck, title: "Honorário atrelado à meta", body: "Até 20% do valor é variável: se o número pactuado não sai, essa parte não é faturada." },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const featured = PLANS.find((plan) => plan.featured)!;
  const others = PLANS.filter((plan) => !plan.featured);

  const price = (monthly: number) => (annual ? Math.round(monthly * 0.85) : monthly);

  return (
    <section id="planos" className="mp-section relative overflow-hidden bg-midnight">
      <Ambient variant="deep" />
      <div className="mp-shell relative">
        <SectionHeading
          eyebrow="Planos"
          title={
            <>
              Comece pelo raio-X.
              <br />
              <span className="text-white/45">Escale quando fizer sentido.</span>
            </>
          }
          lead="Três formatos de trabalho, o mesmo time sênior. A maioria começa pelo Diagnóstico e migra para o Escala na devolutiva — por isso ele já vem embutido no ciclo anual."
          aside={
            <div
              role="group"
              aria-label="Periodicidade da cobrança"
              className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1"
            >
              {[
                { key: false, label: "Mensal" },
                { key: true, label: "Anual" },
              ].map((option) => (
                <button
                  key={String(option.key)}
                  type="button"
                  aria-pressed={annual === option.key}
                  onClick={() => setAnnual(option.key)}
                  className={`rounded-lg px-4 py-2 text-[0.84rem] font-medium transition-all duration-300 ${
                    annual === option.key
                      ? "bg-white/[0.09] text-snow"
                      : "text-white/45 hover:text-white/75"
                  }`}
                >
                  {option.label}
                  {option.key ? (
                    <span className="mp-gradient-text ml-1.5 text-[0.72rem] font-semibold">−15%</span>
                  ) : null}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {/* Destaque */}
          <Reveal className="lg:col-span-5">
            <article
              className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-ice/25 p-7 sm:p-9"
              style={{
                background:
                  "linear-gradient(168deg, rgba(40,120,154,0.20), rgba(7,16,25,0.6) 46%, rgba(116,59,160,0.18))",
                boxShadow: "0 40px 90px -60px rgba(155,215,237,0.65)",
              }}
            >
              <span
                className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-70"
                style={{ background: "radial-gradient(closest-side, rgba(178,90,218,0.35), transparent)" }}
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-semibold tracking-[0.08em] text-midnight uppercase"
                  style={{ background: "var(--mp-gradient)" }}
                >
                  <Sparkles size={12} aria-hidden="true" />
                  {featured.badge}
                </span>
              </div>

              <h3 className="relative mt-6 font-display text-[2rem] font-semibold leading-none tracking-[-0.035em]">
                {featured.name}
              </h3>
              <p className="relative mt-3 text-[0.94rem] leading-snug text-white/62">{featured.tagline}</p>

              <div className="relative mt-8 flex items-end gap-2">
                <span className="font-display text-[clamp(2.3rem,4.6vw,3.1rem)] font-semibold leading-none tracking-[-0.04em]">
                  {brl(price(featured.monthly))}
                </span>
                <span className="pb-1 text-[0.84rem] text-white/45">/mês</span>
              </div>
              <p className="relative mt-2.5 text-[0.79rem] text-white/45">
                {annual
                  ? `Cobrança anual · ${brl(price(featured.monthly) * 12)} no ano · escopo ${featured.scope}`
                  : `Sem fidelidade · escopo ${featured.scope}`}
              </p>

              <ul className="relative mt-8 grid gap-3 border-t border-white/[0.1] pt-7">
                {featured.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9rem] leading-snug text-white/78">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative mt-9 grid gap-2.5">
                <a href="#diagnostico" className="mp-btn mp-btn--primary w-full">
                  Falar sobre o Escala
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                {PLAN_FAQ.map((note) => (
                  <p key={note} className="text-[0.76rem] leading-snug text-white/42">
                    {note}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Demais planos */}
          <div className="grid gap-5 lg:col-span-7 lg:content-start lg:gap-6">
            {others.map((plan, index) => (
              <Reveal key={plan.name} delay={120 + index * 110}>
                <article className="mp-card group grid gap-6 p-7 sm:grid-cols-12 sm:items-start sm:p-8">
                  <div className="sm:col-span-5">
                    <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">{plan.name}</h3>
                    <p className="mt-2.5 text-[0.88rem] leading-snug text-white/55">{plan.tagline}</p>
                    <div className="mt-6 flex items-end gap-1.5">
                      <span className="font-display text-[1.9rem] font-semibold leading-none tracking-[-0.035em]">
                        {brl(price(plan.monthly))}
                      </span>
                      <span className="pb-0.5 text-[0.78rem] text-white/42">/mês</span>
                    </div>
                    <p className="mt-2 text-[0.76rem] text-white/42">{plan.scope}</p>
                    <a
                      href="#diagnostico"
                      className="mt-6 inline-flex items-center gap-2 text-[0.86rem] font-semibold text-ice transition-all duration-300 hover:gap-3"
                    >
                      Solicitar proposta
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                  <ul className="grid gap-2.5 sm:col-span-7 sm:border-l sm:border-white/[0.08] sm:pl-7">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.86rem] leading-snug text-white/65">
                        <Check />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}

            <Reveal delay={340}>
              <ul className="grid gap-4 sm:grid-cols-3">
                {GUARANTEES.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 transition-colors duration-400 hover:border-ice/25 hover:bg-white/[0.04]"
                  >
                    <item.icon size={17} className="text-ice" aria-hidden="true" />
                    <p className="mt-3.5 font-display text-[0.94rem] font-semibold leading-snug tracking-[-0.015em]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[0.8rem] leading-snug text-white/50">{item.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
      <path
        d="M2.5 8 6 11.5 12.5 4"
        stroke="url(#cg)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="cg" x1="2" y1="4" x2="13" y2="11">
          <stop stopColor="#9bd7ed" />
          <stop offset="1" stopColor="#b25ada" />
        </linearGradient>
      </defs>
    </svg>
  );
}
