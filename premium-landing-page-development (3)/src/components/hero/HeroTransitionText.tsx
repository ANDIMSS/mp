interface HeroTransitionTextProps {
  text: string;
  textRef: (el: HTMLParagraphElement | null) => void;
}

export function HeroTransitionText({ text, textRef }: HeroTransitionTextProps) {
  return (
    <p ref={textRef} className="hero-transition">
      <span className="hero-transition__line" aria-hidden="true" />
      <span className="hero-transition__text">{text}</span>
      <span className="hero-transition__line" aria-hidden="true" />
    </p>
  );
}
