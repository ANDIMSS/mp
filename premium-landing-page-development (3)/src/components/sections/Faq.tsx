import { useState } from "react";
import { MessageCircleQuestion, Plus } from "lucide-react";
import { FAQS } from "../../data/site";
import { Ambient, Reveal, SectionHeading } from "../ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mp-section relative overflow-hidden bg-[#050c13]">
      <Ambient />
      <div className="mp-shell relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title={
              <>
                As dúvidas que
                <br />
                <span className="text-white/45">todo sócio traz.</span>
              </>
            }
            lead="Se a sua pergunta não estiver aqui, ela provavelmente é sobre o desenho do seu caso — e é exatamente disso que tratamos na conversa de encaixe."
          />

          <Reveal delay={140}>
            <div className="mt-9 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <MessageCircleQuestion size={20} className="text-ice" aria-hidden="true" />
              <p className="mt-4 font-display text-[1.05rem] font-semibold tracking-[-0.02em]">
                Prefere conversar direto?
              </p>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-white/55">
                Um sócio da MP 365 responde em até 1 dia útil. Sem formulário de robô, sem fila de
                SDR.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a href="#diagnostico" className="mp-btn mp-btn--primary mp-btn--sm">
                  Agendar conversa
                </a>
                <a
                  href="mailto:contato@mp365.com.br"
                  className="mp-btn mp-btn--secondary mp-btn--sm"
                >
                  contato@mp365.com.br
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="mp-hairline">
            {FAQS.map((item, index) => {
              const isOpen = open === index;
              return (
                <li
                  key={item.q}
                  data-open={isOpen}
                  className="mp-faq__item reveal border-b border-white/[0.07]"
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span className="mp-mono mt-1 text-[0.72rem] text-white/32 transition-colors duration-300 group-hover:text-ice">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[1.05rem] font-medium leading-snug tracking-[-0.02em] text-snow transition-colors duration-300 sm:text-[1.15rem]">
                        {item.q}
                      </span>
                      <span
                        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                          isOpen
                            ? "rotate-45 border-transparent text-midnight"
                            : "border-white/15 text-white/60 group-hover:border-ice/50 group-hover:text-snow"
                        }`}
                        style={isOpen ? { backgroundImage: "var(--mp-gradient)" } : undefined}
                        aria-hidden="true"
                      >
                        <Plus size={15} strokeWidth={2.2} />
                      </span>
                    </button>
                  </h3>
                  <div className="mp-faq__panel" id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`}>
                    <div>
                      <p
                        className={`max-w-2xl pb-7 pl-[3.1rem] pr-12 text-[0.92rem] leading-relaxed text-white/62 transition-opacity duration-500 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
