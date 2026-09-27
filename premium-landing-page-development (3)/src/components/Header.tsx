import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HERO_CTAS } from "./hero/hero.data";
import { BrandLogo } from "./BrandLogo";

const NAV_ITEMS = [
  { label: "Método", id: "metodo" },
  { label: "Painel", id: "painel" },
  { label: "Resultados", id: "resultados" },
  { label: "Planos", id: "planos" },
  { label: "FAQ", id: "faq" },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("");

  /* Scroll: estado React só muda ao cruzar o limiar; barra via transform puro. */
  useEffect(() => {
    let scrolled = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const next = window.scrollY > 8;
      if (next !== scrolled) {
        scrolled = next;
        headerRef.current?.classList.toggle("is-scrolled", next);
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${ratio})`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Seção atual do menu */
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="MP 365 — início">
          <BrandLogo />
        </a>

        <nav className="site-header__nav" aria-label="Navegação principal">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} data-current={current === item.id}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <a className="mp-btn mp-btn--primary mp-btn--sm site-header__cta" href={HERO_CTAS.primary.href}>
            Diagnóstico
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-snow transition-colors hover:border-ice/50 hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="mp-sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <span ref={progressRef} className="site-header__progress" aria-hidden="true" />

      <div id="menu-mobile" className={`mp-drawer ${open ? "is-open" : ""}`} inert={!open}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <a
          className="mp-btn mp-btn--primary"
          style={{ width: "100%" }}
          href={HERO_CTAS.primary.href}
          onClick={() => setOpen(false)}
        >
          {HERO_CTAS.primary.label}
        </a>
      </div>
    </header>
  );
}
