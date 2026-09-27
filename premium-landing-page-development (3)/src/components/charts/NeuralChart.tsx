import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js";

Chart.defaults.font.family = '"Inter", system-ui, sans-serif';
Chart.defaults.font.size = 11;
Chart.defaults.color = "rgba(200,209,216,0.62)";

interface NeuralChartProps {
  config: ChartConfiguration;
  label: string;
  height?: number;
}

/**
 * Instância Chart.js montada por aba e destruída no cleanup —
 * sem listeners órfãos e sem duplicação de canvas em StrictMode.
 */
export function NeuralChart({ config, label, height = 292 }: NeuralChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chart = new Chart(canvas, {
      ...config,
      options: {
        ...(config.options ?? {}),
        animation: reduced ? false : { duration: 900, easing: "easeOutQuart" },
      },
    });

    return () => chart.destroy();
  }, [config]);

  return (
    <div style={{ height }} className="relative">
      <canvas ref={canvasRef} role="img" aria-label={label} />
    </div>
  );
}
