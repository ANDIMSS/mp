import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* Fundo ambiente: grade fina + brilhos radiais lentos + grão. */
export function Ambient({ variant = "default" }: { variant?: "default" | "deep" | "warm" }) {
  const glow =
    variant === "deep"
      ? "radial-gradient(58% 46% at 12% 0%, rgba(18,61,85,0.75), transparent 70%)"
      : variant === "warm"
        ? "radial-gradient(52% 40% at 88% 8%, rgba(116,59,160,0.28), transparent 72%)"
        : "radial-gradient(60% 42% at 78% 0%, rgba(40,120,154,0.28), transparent 72%)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: glow }} />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,209,216,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,209,216,0.14) 1px, transparent 1px)",
          backgroundSize: "78px 78px",
          maskImage: "radial-gradient(80% 60% at 50% 25%, #000 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(80% 60% at 50% 25%, #000 20%, transparent 85%)",
        }}
      />
      <div
        className="absolute bottom-[-33%] left-1/2 h-[70vh] w-[130vw] -translate-x-1/2 rounded-[50%] opacity-40"
        style={{
          background: "radial-gradient(closest-side, rgba(116,59,160,0.22), transparent)",
          animation: "mp-drift 26s ease-in-out infinite",
        }}
      />
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, lead, aside, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-12 lg:items-end",
        aside ? "lg:gap-12" : "lg:grid-cols-8",
        className
      )}
    >
      <div className="lg:col-span-7">
        <p className="mp-eyebrow reveal">{eyebrow}</p>
        <h2 className="mp-h2 mt-5" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
          {title}
        </h2>
        {lead ? (
          <div className="reveal mt-6 max-w-2xl" style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <p className="mp-lead">{lead}</p>
          </div>
        ) : null}
      </div>
      {aside ? (
        <div
          className="reveal lg:col-span-5 lg:justify-self-end"
          style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
        >
          {aside}
        </div>
      ) : null}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("mp-mono", className)}
      data-count={value}
      data-decimals={decimals}
      data-prefix={prefix}
      data-suffix={suffix}
    >
      {prefix}
      {value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
