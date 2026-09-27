import { useEffect, useRef } from "react";
import { LOGOS, METRICS } from "../../data/site";
import { Counter } from "../ui";

function useAnimatedNumbers() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;

    const animate = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      const decimals = Number(el.dataset.decimals ?? 0);
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      const start = performance.now();
      const duration = 1500;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${prefix}${(to * eased).toLocaleString("pt-BR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.55 }
    );

    // Zera o número antes de entrar em cena, para o contador ter efeito.
    nodes.forEach((node) => {
      const decimals = Number(node.dataset.decimals ?? 0);
      node.textContent = `${node.dataset.prefix ?? ""}${(0).toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${node.dataset.suffix ?? ""}`;
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function SocialProof() {
  const metricsRef = useAnimatedNumbers();
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section id="confianca" className="mp-section mp-noise relative border-y border-white/[0.07] bg-[#050d14]">
      <div className="mp-shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <p className="reveal mp-eyebrow lg:col-span-4">
            Confiança de quem já passou pelo diagnóstico
          </p>
          <div className="reveal mp-marquee-mask lg:col-span-8" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="mp-marquee gap-14 pr-14">
              {loop.map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="flex shrink-0 items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-platinum/60 transition-colors duration-300 hover:text-snow"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden="true" className="opacity-70">
                    <path d="M6.5 0 8 5l5 1.5L8 8 6.5 13 5 8 0 6.5 5 5z" fill="url(#lg)" />
                    <defs>
                      <linearGradient id="lg" x1="0" x2="13" y1="0" y2="13">
                        <stop stopColor="#28789a" />
                        <stop offset="1" stopColor="#b25ada" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={metricsRef}
          className="mt-14 grid gap-x-8 gap-y-10 border-t border-white/[0.07] pt-11 sm:grid-cols-2 lg:grid-cols-4"
        >
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className="reveal relative pl-5 sm:pl-6"
              style={{ "--reveal-delay": `${180 + index * 90}ms` } as React.CSSProperties}
            >
              <span
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px"
                style={{ background: "linear-gradient(180deg, rgba(155,215,237,0.65), transparent)" }}
                aria-hidden="true"
              />
              <div className="font-display text-[clamp(2.1rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.035em]">
                <Counter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                />
              </div>
              <p className="mt-3 max-w-[15rem] text-[0.86rem] leading-snug text-white/55">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
