import { useState } from "react";
import { ArrowRight, CalendarClock, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { DIAGNOSIS_STEPS, REVENUE_BANDS, SECTORS } from "../../data/site";
import { Ambient, Reveal } from "../ui";

type Status = "idle" | "sending" | "sent";

export function Diagnostico() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};

    const required = ["nome", "empresa", "email", "telefone"] as const;
    required.forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) next[field] = "Campo obrigatório.";
    });
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "E-mail inválido.";

    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>(`#${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }

    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  return (
    <section id="diagnostico" className="mp-section relative overflow-hidden bg-midnight">
      <Ambient variant="deep" />
      <span
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2 opacity-60"
        style={{ background: "linear-gradient(90deg,transparent,rgba(155,215,237,0.6),transparent)" }}
        aria-hidden="true"
      />
      <div className="mp-shell relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mp-eyebrow">Diagnóstico</p>
            <h2 className="mp-h2 mt-5">
              21 dias para sair da
              <br />
              <span className="mp-gradient-text">suspeita</span> e entrar
              <br />
              <span className="text-white/45">no número.</span>
            </h2>
            <p className="mp-lead mt-6 max-w-md">
              Conte onde a operação trava. Um sócio analisa a resposta antes de qualquer call — se a
              MP 365 não for o caminho certo para o seu momento, dizemos isso na primeira conversa.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ol className="mt-10 grid gap-6 border-t border-white/[0.07] pt-8">
              {DIAGNOSIS_STEPS.map((step) => (
                <li key={step.day} className="group flex gap-4">
                  <span className="mp-mono mt-0.5 shrink-0 rounded-lg border border-white/12 px-2.5 py-1.5 text-[0.72rem] font-semibold text-ice transition-colors duration-300 group-hover:border-ice/45">
                    {step.day}
                  </span>
                  <span>
                    <span className="block font-display text-[1rem] font-semibold tracking-[-0.02em] text-snow">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[0.87rem] leading-relaxed text-white/55">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-8 flex items-center gap-2.5 text-[0.79rem] text-white/42">
              <ShieldCheck size={15} className="text-ice/70" aria-hidden="true" />
              NDA assinado no primeiro contato. Dados usados apenas para o diagnóstico.
            </p>
          </Reveal>
        </div>

        {/* Formulário */}
        <Reveal delay={100} className="lg:col-span-7">
          <div className="mp-card relative overflow-hidden p-6 sm:p-9">
            <div
              className="pointer-events-none absolute -top-32 -left-20 h-64 w-64 rounded-full opacity-60"
              style={{ background: "radial-gradient(closest-side, rgba(40,120,154,0.4), transparent)" }}
              aria-hidden="true"
            />

            {status === "sent" ? (
              <div className="mp-anim-rise relative grid min-h-[520px] place-items-center text-center">
                <div className="max-w-sm">
                  <CheckCircle2 size={44} className="mx-auto text-ice" aria-hidden="true" />
                  <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.03em]">
                    Diagnóstico solicitado.
                  </h3>
                  <p className="mt-4 text-[0.94rem] leading-relaxed text-white/62">
                    Recebemos seus dados. Um sócio da MP 365 responde em até 1 dia útil com três
                    perguntas — e a agenda de 45 minutos já reservada.
                  </p>
                  <div className="mt-7 flex flex-col items-center gap-3">
                    <a href="#painel" className="mp-btn mp-btn--secondary mp-btn--sm">
                      Ver o painel enquanto isso
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-[0.8rem] text-white/40 underline underline-offset-4 transition-colors hover:text-white/70"
                    >
                      Enviar para outra empresa
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-[1.3rem] font-semibold tracking-[-0.025em]">
                    Solicitar diagnóstico
                  </h3>
                  <span className="flex items-center gap-2 text-[0.74rem] tracking-[0.1em] text-white/45 uppercase">
                    <CalendarClock size={14} aria-hidden="true" />
                    12 vagas por trimestre
                  </span>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field id="nome" label="Nome completo" errors={errors}>
                    <input id="nome" name="nome" className="mp-input" placeholder="Maria Andrade" autoComplete="name" aria-invalid={Boolean(errors.nome)} aria-describedby={errors.nome ? "nome-error" : undefined} />
                  </Field>
                  <Field id="empresa" label="Empresa" errors={errors}>
                    <input id="empresa" name="empresa" className="mp-input" placeholder="Andrade Indústria" autoComplete="organization" aria-invalid={Boolean(errors.empresa)} aria-describedby={errors.empresa ? "empresa-error" : undefined} />
                  </Field>
                  <Field id="email" label="E-mail corporativo" errors={errors}>
                    <input id="email" name="email" type="email" className="mp-input" placeholder="maria@empresa.com.br" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
                  </Field>
                  <Field id="telefone" label="WhatsApp" errors={errors}>
                    <input id="telefone" name="telefone" className="mp-input" placeholder="(11) 9 0000-0000" autoComplete="tel" aria-invalid={Boolean(errors.telefone)} aria-describedby={errors.telefone ? "telefone-error" : undefined} />
                  </Field>
                  <Field id="faturamento" label="Faixa de faturamento">
                    <select id="faturamento" name="faturamento" className="mp-input" defaultValue={REVENUE_BANDS[1]}>
                      {REVENUE_BANDS.map((band) => (
                        <option key={band}>{band}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="setor" label="Setor">
                    <select id="setor" name="setor" className="mp-input" defaultValue={SECTORS[0]}>
                      {SECTORS.map((sector) => (
                        <option key={sector}>{sector}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="bloqueio" label="O que mais trava o crescimento hoje? (opcional)">
                      <textarea
                        id="bloqueio"
                        name="bloqueio"
                        rows={4}
                        className="mp-input min-h-[124px] resize-y py-3"
                        placeholder="Ex.: vendemos mais e a margem cai; o time depende de mim para decidir; não sei o custo real por cliente…"
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button type="submit" className="mp-btn mp-btn--primary" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar solicitação
                        <ArrowRight size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-[0.76rem] leading-snug text-white/40">
                    Ao enviar você concorda com nossa política de privacidade.
                    <br className="hidden sm:block" /> Nada de spam: dois e-mails no máximo.
                  </p>
                </div>

                <p aria-live="polite" className="mp-sr-only">
                  {status === "sending" ? "Enviando formulário" : ""}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  errors,
  children,
}: {
  id: string;
  label: string;
  errors?: Record<string, string>;
  children: React.ReactNode;
}) {
  const error = errors?.[id];
  return (
    <div className="mp-field">
      <label htmlFor={id} className="mp-field__label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[0.76rem] text-[#ff9d9d]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
