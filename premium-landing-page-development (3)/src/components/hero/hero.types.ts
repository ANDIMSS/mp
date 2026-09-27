export type HeroDirection = "view-left-to-right" | "view-right-to-left";

export type HeroHorizontalPosition = "left" | "center" | "right";

export type HeroVerticalPosition = "top" | "center" | "bottom";

export type HeroKeywordStyle = "initials" | "tags";

export interface HeroScene {
  id: number;
  desktopSrc: string;
  mobileSrc?: string;
  direction: HeroDirection;
  chapter: string;
  headline: string;
  description: string;
  /** Microfrase exibida entre capítulos. */
  transitionText?: string;
  textPosition: HeroHorizontalPosition;
  verticalPosition: HeroVerticalPosition;
  /** Palavra da headline destacada com o gradiente MP 365 (opcional). */
  accent?: string;
  /** Termos discretos exibidos sob a descrição (PDA, pilares etc.). */
  keywords?: string[];
  keywordStyle?: HeroKeywordStyle;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroDeviceConfig {
  /** Distância de scroll da Hero em múltiplos da altura da viewport. */
  scrollDistance: number;
  scrub: number;
  /** Fração de cada capítulo usada no crossfade. */
  overlap: number;
  enterScale: number;
  exitScale: number;
}

export interface HeroTimelineTimings {
  intro: number;
  scene: number;
  overlap: number;
  tail: number;
}

export type ImageStatus = "loading" | "loaded" | "error";
