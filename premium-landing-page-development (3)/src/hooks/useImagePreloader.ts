import { useEffect, useMemo, useState } from "react";
import type { ImageStatus } from "../components/hero/hero.types";

function waitForLoad(image: HTMLImageElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (image.complete) {
      if (image.naturalWidth > 0) resolve();
      else reject(new Error("Image failed"));
      return;
    }
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => reject(new Error("Image failed")), { once: true });
  });
}

async function preloadImage(url: string): Promise<void> {
  const image = new Image();
  image.decoding = "async";
  image.src = url;

  if (typeof image.decode === "function") {
    try {
      await image.decode();
      return;
    } catch {
      // decode pode falhar em alguns navegadores; cai para o evento load.
    }
  }
  await waitForLoad(image);
}

/**
 * Pré-carrega as imagens sem fetch nem canvas.
 * O estado só muda quando cada imagem termina (sucesso ou erro) — nunca por frame.
 */
export function useImagePreloader(urls: string[]): ImageStatus[] {
  const key = urls.join("|");
  const stableUrls = useMemo(() => key.split("|"), [key]);
  const [statuses, setStatuses] = useState<ImageStatus[]>(() =>
    stableUrls.map(() => "loading")
  );

  useEffect(() => {
    let cancelled = false;
    setStatuses(stableUrls.map(() => "loading"));

    stableUrls.forEach((url, index) => {
      preloadImage(url)
        .then(() => "loaded" as const)
        .catch(() => "error" as const)
        .then((status) => {
          if (cancelled) return;
          setStatuses((prev) => {
            const next = [...prev];
            next[index] = status;
            return next;
          });
        });
    });

    return () => {
      cancelled = true;
    };
  }, [stableUrls]);

  return statuses;
}
