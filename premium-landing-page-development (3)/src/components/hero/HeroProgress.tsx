import type { HeroScene } from "./hero.types";

interface HeroProgressProps {
  scenes: HeroScene[];
  itemRef: (index: number) => (el: HTMLLIElement | null) => void;
  fillRef: (el: HTMLSpanElement | null) => void;
}

/** Indicador discreto e não interativo, para não parecer controle de slider. */
export function HeroProgress({ scenes, itemRef, fillRef }: HeroProgressProps) {
  return (
    <div className="hero-progress" aria-hidden="true">
      <ol className="hero-progress__list">
        {scenes.map((scene, index) => (
          <li
            key={scene.id}
            ref={itemRef(index)}
            className={`hero-progress__item${index === 0 ? " is-active" : ""}`}
          >
            <span className="hero-progress__num">{String(index + 1).padStart(2, "0")}</span>
            <span className="hero-progress__label">{scene.chapter}</span>
          </li>
        ))}
      </ol>
      <span className="hero-progress__track">
        <span ref={fillRef} className="hero-progress__fill" />
      </span>
    </div>
  );
}
