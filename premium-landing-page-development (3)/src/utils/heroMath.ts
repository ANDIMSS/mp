import type { HeroDirection, HeroTimelineTimings } from "../components/hero/hero.types";

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const lerp = (from: number, to: number, t: number): number =>
  from + (to - from) * t;

/** Deslocamento máximo possível; nunca negativo. */
export const getMaxMovement = (renderedImageWidth: number, viewportWidth: number): number =>
  Math.max(renderedImageWidth - viewportWidth, 0);

export interface PanRange {
  from: number;
  to: number;
}

/**
 * Converte a direção de LEITURA VISUAL em valores de translateX.
 * view-left-to-right: o visitante vê da esquerda → direita (img vai de 0 a -max).
 * view-right-to-left: o visitante vê da direita → esquerda (img vai de -max a 0).
 */
export const getPanRange = (
  direction: HeroDirection,
  maxMovement: number,
  reducedMotion: boolean
): PanRange => {
  if (reducedMotion) {
    const center = -maxMovement / 2;
    return { from: center, to: center };
  }
  return direction === "view-left-to-right"
    ? { from: 0, to: -maxMovement }
    : { from: -maxMovement, to: 0 };
};

export interface SceneTiming {
  start: number;
  end: number;
  /** Início do pan/entrada (sobreposto ao fim da cena anterior). */
  panStart: number;
  /** Início do crossfade de saída. */
  fadeOutStart: number;
}

export const buildSceneTimings = (count: number, t: HeroTimelineTimings): SceneTiming[] =>
  Array.from({ length: count }, (_, i) => {
    const start = t.intro + i * t.scene;
    const end = start + t.scene;
    return {
      start,
      end,
      panStart: i === 0 ? 0 : start - t.overlap,
      fadeOutStart: end - t.overlap,
    };
  });

export const getTotalDuration = (count: number, t: HeroTimelineTimings): number =>
  t.intro + count * t.scene + t.tail;

export const getActiveIndex = (time: number, count: number, t: HeroTimelineTimings): number =>
  clamp(Math.floor((time - t.intro + t.overlap / 2) / t.scene), 0, count - 1);

/** Divide a headline para envolver a palavra de destaque. */
export const splitAccent = (
  text: string,
  accent?: string
): { before: string; accent: string; after: string } | null => {
  if (!accent) return null;
  const index = text.lastIndexOf(accent);
  if (index < 0) return null;
  return {
    before: text.slice(0, index),
    accent,
    after: text.slice(index + accent.length),
  };
};
