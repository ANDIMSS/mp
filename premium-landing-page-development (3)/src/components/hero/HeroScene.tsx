import type { SyntheticEvent } from "react";
import type { HeroScene as HeroSceneData } from "./hero.types";

interface HeroSceneProps {
  scene: HeroSceneData;
  src: string;
  index: number;
  layerRef: (el: HTMLDivElement | null) => void;
  imageRef: (el: HTMLImageElement | null) => void;
  onImageSettled: () => void;
}

export function HeroScene({
  scene,
  src,
  index,
  layerRef,
  imageRef,
  onImageSettled,
}: HeroSceneProps) {
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    // Fallback: o layer mantém o fundo #071019 e a experiência continua.
    event.currentTarget.parentElement?.classList.add("is-error");
    onImageSettled();
  };

  return (
    <div
      ref={layerRef}
      className="hero-scene"
      style={{ zIndex: index + 1 }}
      data-direction={scene.direction}
      aria-hidden="true"
    >
      <img
        ref={imageRef}
        className="hero-scene__img"
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        loading="eager"
        fetchPriority={index === 0 ? "high" : "auto"}
        onLoad={onImageSettled}
        onError={handleError}
      />
      <span className="hero-scene__grade" aria-hidden="true" />
    </div>
  );
}
