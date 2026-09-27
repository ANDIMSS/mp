import { useState } from "react";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

const BRAND_PATHS: Record<string, string> = {
  LinkedIn:
    "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.24 8.32h4.5V24H.24V8.32Zm7.5 0h4.31v2.14h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.9c0-1.88-.03-4.3-2.61-4.3-2.61 0-3.01 2.04-3.01 4.15V24h-4.5V8.32Z",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.71-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.93 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16Zm0 5.23A4.61 4.61 0 1 0 16.61 12 4.6 4.6 0 0 0 12 7.39Zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 2.99Zm5.88-7.79a1.08 1.08 0 1 1-1.08-1.08 1.08 1.08 0 0 1 1.08 1.07Z",
  YouTube:
    "M23.5 6.9a3 3 0 0 0-2.11-2.13C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.39.52A3 3 0 0 0 .5 6.9 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.1 3 3 0 0 0 2.11 2.13c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.1ZM9.6 15.57V8.43L15.82 12Z",
};

function BrandIcon({ name }: { name: keyof typeof BRAND_PATHS }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRAND_PATHS[name]} />
    </svg>
  );
}
import { Ambient } from "./ui";
import { BrandLogo } from "./BrandLogo";

const PARTNERS = [
  {
    initials: "MP",
    name: "Marcos Prado",
    role: "Sócio · Estratégia e M&A",
    bio: "18 anos em reestruturação. Ex-CFO de grupo industrial, 3 vendas de controle próprio.",
  },
  {
    initials: "PA",
    name: "Paula Andrade",
    role: "Sócia · Operação e Pessoas",
    bio: "Engenheira de produção, mestre em gestão. Conduziu 60+ rituais de gestão em saúde e agro.",
  },
  {
    initials: "RT",
    name: "Rafael Tavares",
    role: "Sócio · Dados e Automação",
    bio: "Arquiteto de dados. Desenha as integrações do Painel Neural com SAP, TOTVS e Omie.",
  },
];

const COLUMNS = [
  {
    title: "Método",
    links: [
      { label: "Fases do MP 365", href: "#metodo" },
      { label: "As 6 lentes", href: "#metodo" },
      { label: "Painel Neural", href: "#painel" },
      { label: "Cases e resultados", href: "#resultados" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Quem conduz", href: "#sobre" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Planos", href: "#planos" },
      { label: "Perguntas frequentes", href: "#faq" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Diagnóstico em 21 dias", href: "#diagnostico" },
      { label: "Guia dos 6 pilares", href: "#metodo" },
      { label: "Modelo de ritual de gestão", href: "#painel" },
      { label: "Calculadora de margem", href: "#resultados" },
    ],
  },
];

export function Footer() {
  const [emailState, setEmailState] = useState<"idle" | "ok" | "error">("idle");

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#050c13]">
      <Ambient variant="warm" />

      {/* Marquee institucional */}
      <div className="mp-marquee-mask relative border-b border-white/[0.07] py-6">
        <div className="mp-marquee gap-10 pr-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-10 font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em] whitespace-nowrap text-white/12"
            >
              Método que constrói patrimônio
              <span className="text-ice/35">·</span>
              Todos os dias
              <span className="text-violet/35">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Sobre */}
      <div id="sobre" className="mp-section relative pb-0">
        <div className="mp-shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mp-eyebrow">Quem conduz</p>
              <h2 className="mp-h2 mt-5 max-w-xl">
                Sócios no projeto, <span className="text-white/45">não estagiários na conta.</span>
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-5">
              {[
                { value: "2016", label: "ano de fundação" },
                { value: "11", label: "setores atendidos" },
                { value: "9", label: "cidades com squads" },
              ].map((stat) => (
                <li key={stat.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <p className="font-display text-[1.5rem] font-semibold leading-none tracking-[-0.03em]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[0.76rem] text-white/45">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="group bg-[#08121b] p-6 transition-colors duration-500 hover:bg-[#0b1a26]">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl font-display text-[0.8rem] font-semibold text-midnight transition-transform duration-500 group-hover:-translate-y-0.5"
                  style={{ background: "var(--mp-gradient)" }}
                  aria-hidden="true"
                >
                  {partner.initials}
                </span>
                <p className="mt-5 font-display text-[1.02rem] font-semibold tracking-[-0.02em]">{partner.name}</p>
                <p className="mt-1 text-[0.78rem] tracking-[0.04em] text-ice/75 uppercase">{partner.role}</p>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-white/52">{partner.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assinatura do rodapé */}
      <div className="mp-section relative">
        <div className="mp-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="inline-flex items-center no-underline" aria-label="MP 365 — voltar ao início">
              <BrandLogo variant="footer" />
            </a>
            <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed text-white/55">
              Agente Neural Empresarial. Estruturamos empresas de médio porte para operar, crescer e
              construir patrimônio — 365 dias por ano.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const value = new FormData(event.currentTarget).get("newsletter");
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value ?? ""));
                setEmailState(ok ? "ok" : "error");
                if (ok) event.currentTarget.reset();
              }}
              className="mt-7 max-w-sm"
            >
              <label htmlFor="newsletter" className="mp-field__label">
                Boletim “Números de segunda”
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="email"
                  className="mp-input"
                  placeholder="seu@email.com.br"
                  aria-invalid={emailState === "error"}
                />
                <button type="submit" className="mp-btn mp-btn--primary min-h-[52px] px-4" aria-label="Assinar boletim">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
              <p
                aria-live="polite"
                className={`mt-2 text-[0.76rem] transition-opacity duration-300 ${
                  emailState === "idle" ? "text-white/40" : emailState === "ok" ? "text-ice" : "text-[#ff9d9d]"
                }`}
              >
                {emailState === "idle"
                  ? "Uma análise por mês. Sete minutos de leitura."
                  : emailState === "ok"
                    ? "Pronto. Você recebe a próxima edição na segunda-feira."
                    : "Confira o e-mail digitado e tente novamente."}
              </p>
            </form>

            <div className="mt-7 flex gap-2.5">
              {(["LinkedIn", "Instagram", "YouTube"] as const).map((label) => (
                <a
                  key={label}
                  href="#sobre"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-ice/45 hover:text-snow"
                >
                  <BrandIcon name={label} />
                </a>
              ))}
              <a
                href="mailto:contato@mp365.com.br"
                aria-label="E-mail"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-ice/45 hover:text-snow"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6" aria-label="Rodapé">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  {column.title}
                </p>
                <ul className="mt-4 grid gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.89rem] text-white/62 no-underline transition-colors duration-300 hover:text-snow"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-70"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mp-shell mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-7 pb-2">
          <p className="text-[0.76rem] text-white/38">
            © {new Date().getFullYear()} MP 365 Consultoria Empresarial Ltda. · CNPJ 00.000.000/0001-00 ·
            São Paulo, Brasil
          </p>
          <div className="flex items-center gap-6">
            <a href="#faq" className="text-[0.76rem] text-white/38 no-underline transition-colors hover:text-white/75">
              Privacidade & LGPD
            </a>
            <a href="#top" className="flex items-center gap-2 text-[0.76rem] text-white/45 no-underline transition-colors hover:text-snow">
              Voltar ao topo
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/12">
                <ArrowUp size={13} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
