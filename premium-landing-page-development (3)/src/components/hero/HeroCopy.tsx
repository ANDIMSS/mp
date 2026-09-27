import type { HeroCta, HeroScene } from "./hero.types";
import { splitAccent } from "../../utils/heroMath";

interface HeroCtasProps {
  primary: HeroCta;
  secondary: HeroCta;
  className?: string;
}

export function HeroCtas({ primary, secondary, className = "" }: HeroCtasProps) {
  return (
    <div className={`hero-ctas ${className}`.trim()}>
      <a className="mp-btn mp-btn--primary" href={primary.href}>
        {primary.label}
      </a>
      <a className="mp-btn mp-btn--secondary" href={secondary.href}>
        {secondary.label}
      </a>
    </div>
  );
}

interface HeroCopyProps {
  scene: HeroScene;
  index: number;
  total: number;
  copyRef: (el: HTMLDivElement | null) => void;
}

function Headline({ text, accent }: { text: string; accent?: string }) {
  const parts = splitAccent(text, accent);
  if (!parts) return <>{text}</>;
  return (
    <>
      {parts.before}
      <span className="mp-gradient-text">{parts.accent}</span>
      {parts.after}
    </>
  );
}

function Keywords({ scene }: { scene: HeroScene }) {
  if (!scene.keywords?.length) return null;

  if (scene.keywordStyle === "initials") {
    return (
      <ul className="hero-copy__pda" aria-label="Método PDA">
        {scene.keywords.map((word) => (
          <li key={word}>
            <span className="hero-copy__pda-letter" aria-hidden="true">
              {word.charAt(0)}
            </span>
            <span className="hero-copy__pda-word">{word}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="hero-copy__tags">
      {scene.keywords.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );
}

export function HeroCopy({ scene, index, total, copyRef }: HeroCopyProps) {
  const number = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <div
      ref={copyRef}
      className={`hero-copy hero-copy--h-${scene.textPosition} hero-copy--v-${scene.verticalPosition}`}
    >
      <article className="hero-copy__inner" aria-labelledby={`hero-chapter-${scene.id}`}>
        <p className="hero-copy__eyebrow">
          <span className="hero-copy__index">
            {number}
            <span aria-hidden="true"> / {totalLabel}</span>
          </span>
          <span className="hero-copy__rule" aria-hidden="true" />
          <span>{scene.chapter}</span>
        </p>
        <h2 id={`hero-chapter-${scene.id}`} className="hero-copy__headline">
          <Headline text={scene.headline} accent={scene.accent} />
        </h2>
        <p className="hero-copy__description">{scene.description}</p>
        <Keywords scene={scene} />
      </article>
    </div>
  );
}
