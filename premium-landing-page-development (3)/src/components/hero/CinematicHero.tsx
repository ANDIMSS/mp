import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  HERO_CTAS,
  HERO_DEVICE_CONFIG,
  HERO_REVEAL,
  HERO_REVEAL_TIMEOUT,
  HERO_TIMELINE,
  MOBILE_BREAKPOINT,
  heroScenes,
} from "./hero.data";
import type { HeroTimelineTimings } from "./hero.types";
import { HeroScene } from "./HeroScene";
import { HeroCopy, HeroCtas } from "./HeroCopy";
import { HeroTransitionText } from "./HeroTransitionText";
import { HeroProgress } from "./HeroProgress";
import { BrandLogo } from "../BrandLogo";
import { useImagePreloader } from "../../hooks/useImagePreloader";
import { useMediaQuery, useReducedMotion } from "../../hooks/useReducedMotion";
import {
  buildSceneTimings,
  getActiveIndex,
  getMaxMovement,
  getPanRange,
  getTotalDuration,
  lerp,
} from "../../utils/heroMath";
import "./CinematicHero.css";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const allDesktopSources = heroScenes.map((scene) => scene.desktopSrc);

export function CinematicHero() {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  const reducedMotion = useReducedMotion();

  const sources = useMemo(
    () =>
      heroScenes.map((scene) => (isMobile && scene.mobileSrc ? scene.mobileSrc : scene.desktopSrc)),
    [isMobile]
  );
  const statuses = useImagePreloader(isMobile ? sources : allDesktopSources);

  // Rede lenta não deixa o visitante diante de um preto infinito.
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setTimedOut(true), HERO_REVEAL_TIMEOUT);
    return () => window.clearTimeout(id);
  }, []);
  const firstSettled = statuses[0] !== "loading" || timedOut;

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLSpanElement>(null);

  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const progressItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const reducedRef = useRef(reducedMotion);
  reducedRef.current = reducedMotion;

  const refreshFrame = useRef<number | null>(null);
  const scheduleRefresh = useCallback(() => {
    if (refreshFrame.current !== null) cancelAnimationFrame(refreshFrame.current);
    refreshFrame.current = requestAnimationFrame(() => {
      refreshFrame.current = null;
      ScrollTrigger.refresh();
    });
  }, []);

  const setActiveChapter = useCallback((index: number) => {
    if (index === activeIndexRef.current) return;
    activeIndexRef.current = index;
    progressItemRefs.current.forEach((item, i) => {
      item?.classList.toggle("is-active", i === index);
    });
  }, []);

  /* ---------- Reveal inicial ("o renascer") ---------- */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const intro = introRef.current;
    if (!firstSettled || !stage || !intro) return;

    sectionRef.current?.classList.add("is-ready");
    const revealItems = intro.querySelectorAll("[data-reveal]");

    const ctx = gsap.context(() => {
      if (reducedRef.current) {
        gsap.fromTo(stage, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
        gsap.fromTo(revealItems, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.05 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        stage,
        {
          autoAlpha: 0,
          scale: HERO_REVEAL.fromScale,
          filter: `brightness(${HERO_REVEAL.fromBrightness}) blur(${HERO_REVEAL.fromBlur}px)`,
        },
        {
          autoAlpha: 1,
          scale: 1,
          filter: "brightness(1) blur(0px)",
          duration: HERO_REVEAL.duration,
          ease: "power2.inOut",
          clearProps: "filter,transform",
        }
      ).fromTo(
        revealItems,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, clearProps: "transform" },
        HERO_REVEAL.copyDelay
      );
    });

    return () => ctx.revert();
  }, [firstSettled]);

  /* ---------- Timeline principal scroll-driven ---------- */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const device = isMobile ? HERO_DEVICE_CONFIG.mobile : HERO_DEVICE_CONFIG.desktop;
    const timings: HeroTimelineTimings = {
      intro: HERO_TIMELINE.intro,
      scene: HERO_TIMELINE.scene,
      overlap: device.overlap,
      tail: HERO_TIMELINE.tail,
    };
    const count = heroScenes.length;
    const sceneTimings = buildSceneTimings(count, timings);
    const total = getTotalDuration(count, timings);
    const enterScale = reducedMotion ? 1 : device.enterScale;
    const exitScale = reducedMotion ? 1 : device.exitScale;
    const blurFrom = reducedMotion ? "blur(0px)" : "blur(4px)";

    const panRange = (index: number) => {
      const img = imageRefs.current[index];
      const max = img ? getMaxMovement(img.offsetWidth, pin.clientWidth) : 0;
      return getPanRange(heroScenes[index].direction, max, reducedMotion);
    };

    const ctx = gsap.context(() => {
      const layers = layerRefs.current;
      const overlays = overlayRefs.current;

      gsap.set(layers, { autoAlpha: (i: number) => (i === 0 ? 1 : 0), scale: 1 });
      gsap.set(overlays, { opacity: (i: number) => (i === 0 ? 1 : 0) });
      gsap.set(copyRefs.current, { autoAlpha: 0, y: 30 });
      gsap.set(transitionRefs.current.filter(Boolean), { autoAlpha: 0, y: 12 });
      gsap.set(signatureRef.current, { autoAlpha: 0, y: 30 });

      const onUpdate = (self: ScrollTrigger) =>
        setActiveChapter(getActiveIndex(self.progress * total, count, timings));

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * device.scrollDistance,
          pin,
          scrub: device.scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate,
          onRefresh: onUpdate,
        },
      });

      // Progresso global (também garante a duração total da timeline)
      tl.fromTo(progressFillRef.current, { scaleX: 0 }, { scaleX: 1, duration: total }, 0);

      // Saída da abertura
      tl.to(indicatorRef.current, { autoAlpha: 0, duration: 0.06 }, 0);
      tl.fromTo(
        introRef.current,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -12, duration: timings.intro * 0.8, ease: "power1.in" },
        0
      );

      heroScenes.forEach((scene, i) => {
        const t = sceneTimings[i];
        const isLast = i === count - 1;
        const layer = layers[i];
        const overlay = overlays[i];
        const img = imageRefs.current[i];
        const copy = copyRefs.current[i];
        const transition = transitionRefs.current[i];

        /* Pan horizontal */
        if (img) {
          const panDuration = t.end - t.panStart;
          if (!isLast) {
            tl.fromTo(
              img,
              { x: () => panRange(i).from },
              { x: () => panRange(i).to, duration: panDuration },
              t.panStart
            );
          } else {
            // Cena final: pan contínuo seguido de desaceleração/estabilização
            const settle = HERO_TIMELINE.finalSettle;
            const split = 1 - HERO_TIMELINE.finalSettleDistance;
            const linearDur = panDuration * (1 - settle);
            tl.fromTo(
              img,
              { x: () => panRange(i).from },
              { x: () => lerp(panRange(i).from, panRange(i).to, split), duration: linearDur },
              t.panStart
            );
            tl.fromTo(
              img,
              { x: () => lerp(panRange(i).from, panRange(i).to, split) },
              {
                x: () => panRange(i).to,
                duration: panDuration * settle,
                ease: "sine.out",
                immediateRender: false,
              },
              t.panStart + linearDur
            );
          }
        }

        /* Crossfade — entrada */
        if (i > 0 && layer) {
          tl.fromTo(
            layer,
            { autoAlpha: 0, scale: enterScale },
            { autoAlpha: 1, scale: 1, duration: timings.overlap, ease: "power1.out" },
            t.panStart
          );
          if (overlay) {
            tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: timings.overlap }, t.panStart);
          }
        }

        /* Crossfade — saída */
        if (!isLast && layer) {
          tl.fromTo(
            layer,
            { autoAlpha: 1, scale: 1 },
            {
              autoAlpha: 0,
              scale: exitScale,
              duration: timings.overlap,
              ease: "power2.in",
              immediateRender: false,
            },
            t.fadeOutStart
          );
          if (overlay) {
            tl.fromTo(
              overlay,
              { opacity: 1 },
              { opacity: 0, duration: timings.overlap, immediateRender: false },
              t.fadeOutStart
            );
          }
        }

        /* Copy do capítulo */
        if (copy) {
          const inAt = t.start + (i === 0 ? 0.02 : HERO_TIMELINE.copyLead);
          const outAt = isLast
            ? t.start + HERO_TIMELINE.finalCopyOut
            : t.fadeOutStart - HERO_TIMELINE.copyIn;

          tl.fromTo(
            copy,
            { autoAlpha: 0, y: 30, filter: blurFrom },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: HERO_TIMELINE.copyIn, ease: "power2.out" },
            inAt
          );
          tl.fromTo(
            copy,
            { autoAlpha: 1, y: 0 },
            {
              autoAlpha: 0,
              y: -12,
              duration: HERO_TIMELINE.copyOut,
              ease: "power1.in",
              immediateRender: false,
            },
            outAt
          );
        }

        /* Microfrase de transição */
        if (transition && scene.transitionText) {
          tl.fromTo(
            transition,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: HERO_TIMELINE.transitionFade, ease: "power1.out" },
            t.fadeOutStart - 0.02
          );
          tl.fromTo(
            transition,
            { autoAlpha: 1, y: 0 },
            {
              autoAlpha: 0,
              y: -8,
              duration: HERO_TIMELINE.transitionFade,
              ease: "power1.in",
              immediateRender: false,
            },
            t.end + 0.03
          );
        }

        /* Assinatura institucional */
        if (isLast && signatureRef.current) {
          tl.fromTo(
            signatureRef.current,
            { autoAlpha: 0, y: 30, filter: blurFrom },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: HERO_TIMELINE.signatureDuration,
              ease: "power2.out",
            },
            t.start + HERO_TIMELINE.signatureIn
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, reducedMotion, setActiveChapter]);

  /* ---------- Resize, orientação e fontes ---------- */
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    let lastWidth = pin.clientWidth;
    const observer = new ResizeObserver(() => {
      if (pin.clientWidth !== lastWidth) {
        lastWidth = pin.clientWidth;
        scheduleRefresh();
      }
    });
    observer.observe(pin);
    window.addEventListener("orientationchange", scheduleRefresh);
    document.fonts?.ready.then(scheduleRefresh).catch(() => undefined);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", scheduleRefresh);
      if (refreshFrame.current !== null) cancelAnimationFrame(refreshFrame.current);
    };
  }, [scheduleRefresh]);

  return (
    <section
      ref={sectionRef}
      className="cinematic-hero"
      aria-label="MP 365 — Método que constrói patrimônio"
    >
      <div ref={pinRef} className="hero-pin">
        {!firstSettled && (
          <div className="hero-loader" role="status" aria-label="Carregando">
            <span className="hero-loader__bar" />
          </div>
        )}

        <div ref={stageRef} className="hero-stage">
          {heroScenes.map((scene, i) => (
            <HeroScene
              key={scene.id}
              scene={scene}
              src={sources[i]}
              index={i}
              layerRef={(el) => {
                layerRefs.current[i] = el;
              }}
              imageRef={(el) => {
                imageRefs.current[i] = el;
              }}
              onImageSettled={scheduleRefresh}
            />
          ))}
        </div>

        <div className="hero-overlay-layer" aria-hidden="true">
          {heroScenes.map((scene, i) => (
            <div
              key={scene.id}
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className={`hero-overlay hero-overlay--${scene.textPosition}`}
            />
          ))}
          <div className="hero-overlay hero-overlay--tint" />
          <div className="hero-overlay hero-overlay--vignette" />
        </div>

        <div className="hero-copy-layer">
          {/* Abertura */}
          <div ref={introRef} className="hero-intro">
            <div className="hero-intro__inner">
              <div className="hero-intro__logo" data-reveal>
                <BrandLogo variant="hero" />
              </div>
              <p className="hero-intro__eyebrow" data-reveal>
                <span className="mp-live-dot" aria-hidden="true" />
                Agente Neural Empresarial
              </p>
              <h1 className="hero-intro__title" data-reveal>
                <span className="hero-intro__line">Sua empresa cresceu.</span>
                <span className="hero-intro__line">
                  Sua <span className="mp-gradient-text">estrutura</span> acompanhou?
                </span>
              </h1>
              <p className="hero-intro__support" data-reveal>
                Estruturamos empresas de médio porte para operar, crescer e construir patrimônio —
                com método, dados e disciplina de execução.
              </p>
              <div data-reveal>
                <HeroCtas primary={HERO_CTAS.primary} secondary={HERO_CTAS.secondary} />
              </div>
            </div>
            <div ref={indicatorRef} className="hero-scroll-indicator" data-reveal>
              <span className="hero-scroll-indicator__label">Role para explorar</span>
              <span className="hero-scroll-indicator__line" aria-hidden="true" />
            </div>
          </div>

          {/* Capítulos */}
          {heroScenes.map((scene, i) => (
            <HeroCopy
              key={scene.id}
              scene={scene}
              index={i}
              total={heroScenes.length}
              copyRef={(el) => {
                copyRefs.current[i] = el;
              }}
            />
          ))}

          {/* Assinatura */}
          <div ref={signatureRef} className="hero-signature">
            <div className="hero-signature__inner">
              <div className="hero-signature__brand">
                <BrandLogo variant="hero" />
              </div>
              <h2 className="hero-signature__slogan">
                Método que constrói patrimônio.
                <span className="hero-signature__accent"> Todos os dias.</span>
              </h2>
              <p className="hero-signature__support">
                Diagnóstico em 21 dias, painel neural sempre aberto e um time sênior ao lado do seu
                na execução.
              </p>
              <HeroCtas primary={HERO_CTAS.primary} secondary={HERO_CTAS.secondary} />
            </div>
          </div>
        </div>

        <div className="hero-transition-layer" aria-hidden="true">
          {heroScenes.map((scene, i) =>
            scene.transitionText ? (
              <HeroTransitionText
                key={scene.id}
                text={scene.transitionText}
                textRef={(el) => {
                  transitionRefs.current[i] = el;
                }}
              />
            ) : null
          )}
        </div>

        <HeroProgress
          scenes={heroScenes}
          itemRef={(index) => (el) => {
            progressItemRefs.current[index] = el;
          }}
          fillRef={(el) => {
            progressFillRef.current = el;
          }}
        />
      </div>
    </section>
  );
}
