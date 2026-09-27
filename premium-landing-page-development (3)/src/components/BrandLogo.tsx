import { useState } from "react";

const LOGO_URL = "https://assets.zyrosite.com/EdFKTcLdQSxzGH5L/1-crlVJ0Jb36M9rm41.png";

type BrandLogoProps = {
  variant?: "header" | "hero" | "footer";
};

export function BrandLogo({ variant = "header" }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`brand-logo brand-logo--${variant} brand-logo--fallback`}>
        MP <span className="mp-gradient-text">365</span>
      </span>
    );
  }

  return (
    <img
      className={`brand-logo brand-logo--${variant}`}
      src={LOGO_URL}
      alt="MP 365"
      loading={variant === "footer" ? "lazy" : "eager"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}