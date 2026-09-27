import type { HeroCta, HeroDeviceConfig, HeroScene } from "./hero.types";

export const heroScenes: HeroScene[] = [
  {
    id: 1,
    desktopSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-1-l1VrFmmcnUIAcqfI.webp",
    mobileSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-1-l1VrFmmcnUIAcqfI.webp",
    direction: "view-left-to-right",
    chapter: "Problema",
    headline: "Toda empresa sente os sintomas. Poucas encontram a causa.",
    description: "A MP 365 começa entendendo onde o crescimento está quebrando.",
    transitionText: "Primeiro, enxergamos.",
    textPosition: "left",
    verticalPosition: "center",
    accent: "causa.",
  },
  {
    id: 2,
    desktopSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-2-fd9ejMXG7M1DNbq3.webp",
    mobileSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-2-fd9ejMXG7M1DNbq3.webp",
    direction: "view-right-to-left",
    chapter: "Sistema",
    headline: "Nenhum problema existe sozinho.",
    description:
      "Mercado, vendas, pessoas, processos, entrega e caixa fazem parte do mesmo organismo.",
    transitionText: "Depois, entendemos.",
    textPosition: "left",
    verticalPosition: "center",
    accent: "sozinho.",
  },
  {
    id: 3,
    desktopSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-3-IxTffUdbD5j17OSD.webp",
    mobileSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-3-IxTffUdbD5j17OSD.webp",
    direction: "view-left-to-right",
    chapter: "Método",
    headline: "Perceber. Decidir. Agir.",
    description: "Transformamos dados e problemas em decisões executáveis em 30 dias.",
    transitionText: "Então, estruturamos.",
    textPosition: "left",
    verticalPosition: "center",
    keywords: ["Perceber", "Decidir", "Agir"],
    keywordStyle: "initials",
  },
  {
    id: 4,
    desktopSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-4-tZrGWiB4DP7ZLA7w.webp",
    mobileSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-4-tZrGWiB4DP7ZLA7w.webp",
    direction: "view-right-to-left",
    chapter: "Transformação",
    headline: "O improviso termina quando o método começa.",
    description:
      "Criamos processos, responsáveis, padrões e indicadores para a empresa funcionar melhor — sem depender de heróis.",
    transitionText: "E fazemos evoluir.",
    textPosition: "right",
    verticalPosition: "center",
    accent: "método",
    keywords: ["Processos", "Responsáveis", "Padrões", "Indicadores", "Execução"],
    keywordStyle: "tags",
  },
  {
    id: 5,
    desktopSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-5-L0YN3NizBZGrR5uP.webp",
    mobileSrc: "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/2-5-L0YN3NizBZGrR5uP.webp",
    direction: "view-left-to-right",
    chapter: "Patrimônio",
    headline: "Crescer é importante. Construir valor é maior.",
    description: "Empresas estruturadas transformam resultado em patrimônio — e em opção de saída.",
    transitionText: "",
    textPosition: "left",
    verticalPosition: "center",
    accent: "valor",
  },
];

export const HERO_CTAS: { primary: HeroCta; secondary: HeroCta } = {
  primary: { label: "Diagnosticar minha empresa", href: "#diagnostico" },
  secondary: { label: "Conhecer o método", href: "#metodo" },
};

export const MOBILE_BREAKPOINT = 768;

/** Distância de scroll da Hero (× altura da viewport). */
export const HERO_SCROLL_DISTANCE = 6.5;
export const HERO_SCROLL_DISTANCE_MOBILE = 4.8;

/** Fração de cada capítulo dedicada ao crossfade. */
export const TRANSITION_OVERLAP = 0.15;
export const TRANSITION_OVERLAP_MOBILE = 0.12;

export const HERO_DEVICE_CONFIG: Record<"desktop" | "mobile", HeroDeviceConfig> = {
  desktop: {
    scrollDistance: HERO_SCROLL_DISTANCE,
    scrub: 0.8,
    overlap: TRANSITION_OVERLAP,
    enterScale: 1.015,
    exitScale: 1.01,
  },
  mobile: {
    scrollDistance: HERO_SCROLL_DISTANCE_MOBILE,
    scrub: 0.5,
    overlap: TRANSITION_OVERLAP_MOBILE,
    enterScale: 1.006,
    exitScale: 1.004,
  },
};

/** Unidades abstratas da timeline (1 capítulo = 1 unidade). */
export const HERO_TIMELINE = {
  intro: 0.25,
  scene: 1,
  tail: 0.3,
  copyIn: 0.12,
  copyOut: 0.1,
  copyLead: 0.04,
  transitionFade: 0.05,
  /** Parte final da cena 5 em que o pan desacelera. */
  finalSettle: 0.22,
  finalSettleDistance: 0.15,
  finalCopyOut: 0.6,
  signatureIn: 0.72,
  signatureDuration: 0.15,
} as const;

export const HERO_REVEAL = {
  duration: 1.3,
  fromScale: 1.05,
  fromBrightness: 0.25,
  fromBlur: 3,
  copyDelay: 0.55,
} as const;

/** Após este tempo a Hero aparece mesmo se alguma foto travar na rede. */
export const HERO_REVEAL_TIMEOUT = 3200;
