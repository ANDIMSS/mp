import { useMemo, useState } from "react";
import type { ChartArea, ChartConfiguration, ScriptableContext } from "chart.js";
import { Activity, LineChart, TriangleAlert, Wallet } from "lucide-react";
import { NeuralChart } from "../charts/NeuralChart";
import { Ambient, Reveal, SectionHeading } from "../ui";

type TabKey = "receita" | "funil" | "pilares" | "caixa";

const TABS: { key: TabKey; label: string; icon: typeof Activity }[] = [
  { key: "receita", label: "Receita & margem", icon: LineChart },
  { key: "funil", label: "Funil comercial", icon: Activity },
  { key: "pilares", label: "Saúde dos pilares", icon: Wallet },
  { key: "caixa", label: "Caixa 13 semanas", icon: TriangleAlert },
];

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const RECEITA = [3.1, 3.4, 3.2, 3.8, 4.1, 4.0, 4.6, 4.4, 5.0, 5.4, 5.9, 6.3];
const MARGEM = [4.1, 4.4, 3.9, 5.2, 6.0, 6.4, 7.1, 7.4, 8.6, 9.2, 10.4, 11.2];
const PLANO = [3.4, 3.6, 3.9, 4.1, 4.4, 4.8, 5.0, 5.3, 5.6, 6.0, 6.3, 6.6];

const AXIS = {
  grid: { color: "rgba(200,209,216,0.08)", drawTicks: false },
  border: { display: false },
  ticks: { padding: 8 },
};

function gradientFill(
  context: { chart?: { ctx: CanvasRenderingContext2D; chartArea?: ChartArea } },
  rgb: string
) {
  const chart = context.chart;
  const chartArea = chart?.chartArea;
  if (!chart || !chartArea) return `rgba(${rgb},0.18)`;
  const g = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  g.addColorStop(0, `rgba(${rgb},0.42)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  return g;
}

const KPIS: Record<TabKey, { label: string; value: string; delta: string; positive?: boolean }[]> = {
  receita: [
    { label: "Receita 12m", value: "R$ 58,2 mi", delta: "+18,4% vs. ano anterior", positive: true },
    { label: "Margem de contribuição", value: "11,2%", delta: "+7,1 pts desde a linha de base", positive: true },
    { label: "Ticket médio", value: "R$ 46,8 mil", delta: "+4,2% no trimestre", positive: true },
  ],
  funil: [
    { label: "Leads qualificados", value: "480", delta: "-12% de volume, +21% de valor", positive: true },
    { label: "Conversão proposta → aceite", value: "42,7%", delta: "+9,6 pts com o novo script", positive: true },
    { label: "Ciclo médio", value: "23 dias", delta: "-11 dias desde a fase Agir", positive: true },
  ],
  pilares: [
    { label: "Score consolidado", value: "78 / 100", delta: "de 41 na entrada", positive: true },
    { label: "Pilar mais frágil", value: "Pessoas", delta: "62 — plano de sucessão em curso" },
    { label: "Pilar mais forte", value: "Entrega", delta: "OTIF 96,4% no último trimestre", positive: true },
  ],
  caixa: [
    { label: "Saldo projetado (13s)", value: "R$ 9,4 mi", delta: "runway 7,2 meses", positive: true },
    { label: "Capital de giro", value: "R$ 4,1 mi", delta: "-R$ 620 mil liberados no ciclo", positive: true },
    { label: "Cobrança vencida", value: "R$ 318 mil", delta: "2,4% da carteira" },
  ],
};

const INSIGHTS: Record<TabKey, { tone: "warn" | "good"; text: string }[]> = {
  receita: [
    { tone: "warn", text: "Cliente B12 representa 14% da receita com margem de 2,1% — renegociar ou reprecificar até o trimestre." },
    { tone: "good", text: "Alta de margem veio de mix, não de preço: 3 linhas acima de R$ 60 mil ganharam espaço." },
  ],
  funil: [
    { tone: "warn", text: "Perda concentrada entre proposta e negociação (57,3%) — gargalo de follow-up na semana 2." },
    { tone: "good", text: "Propostas com o novo formato técnico fecham 2,3x mais rápido no segmento industrial." },
  ],
  pilares: [
    { tone: "warn", text: "Pilar Pessoas: nenhuma linha de sucesso para 3 posições críticas. Risco operacional alto." },
    { tone: "good", text: "Processos subiu de 38 para 74 com os SLAs internos publicados no painel." },
  ],
  caixa: [
    { tone: "warn", text: "Semana 8 tem colisão de folha, 13º e importação: R$ 1,9 mi em 5 dias úteis." },
    { tone: "good", text: "Antecipar 22% da carteira com o banco atual custa menos que o atraso médio de fornecedores." },
  ],
};

export function Showcase() {
  const [tab, setTab] = useState<TabKey>("receita");

  const config = useMemo<ChartConfiguration>(() => {
    if (tab === "receita") {
      return {
        type: "bar",
        data: {
          labels: MONTHS,
          datasets: [
            {
              type: "bar",
              label: "Receita (R$ mi)",
              data: RECEITA,
              backgroundColor: "rgba(40,120,154,0.55)",
              hoverBackgroundColor: "rgba(155,215,237,0.9)",
              borderRadius: 5,
              borderSkipped: false,
              barPercentage: 0.62,
              categoryPercentage: 0.8,
              yAxisID: "y",
            },
            {
              type: "line",
              label: "Margem (%)",
              data: MARGEM,
              borderColor: "#b25ada",
              backgroundColor: "#b25ada",
              borderWidth: 2,
              tension: 0.42,
              pointRadius: 0,
              pointHoverRadius: 5,
              yAxisID: "y1",
            },
            {
              type: "line",
              label: "Plano",
              data: PLANO,
              borderColor: "rgba(200,209,216,0.35)",
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              tension: 0.4,
              yAxisID: "y",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 7, padding: 18 } },
            tooltip: {
              backgroundColor: "rgba(7,16,25,0.94)",
              borderColor: "rgba(155,215,237,0.25)",
              borderWidth: 1,
              padding: 12,
              titleFont: { family: "Sora", size: 12 },
            },
          },
          scales: {
            x: AXIS,
            y: { ...AXIS, position: "left", grid: AXIS.grid, ticks: { ...AXIS.ticks, callback: (v) => `${v} mi` } },
            y1: { ...AXIS, position: "right", grid: { display: false }, ticks: { ...AXIS.ticks, callback: (v) => `${v}%` } },
          },
        },
      };
    }

    if (tab === "funil") {
      return {
        type: "bar",
        data: {
          labels: ["Leads qualificados", "Proposta enviada", "Em negociação", "Fechamento", "Recompra 12m"],
          datasets: [
            {
              label: "Etapa atual",
              data: [480, 212, 96, 41, 27],
              backgroundColor: ["rgba(155,215,237,0.75)", "rgba(120,190,220,0.62)", "rgba(80,140,190,0.6)", "rgba(116,59,160,0.7)", "rgba(178,90,218,0.72)"],
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.72,
            },
            {
              label: "Antes do método",
              data: [512, 148, 62, 19, 11],
              backgroundColor: "rgba(200,209,216,0.14)",
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.72,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 7, padding: 18 } },
            tooltip: { backgroundColor: "rgba(7,16,25,0.94)", borderColor: "rgba(155,215,237,0.25)", borderWidth: 1, padding: 12 },
          },
          scales: {
            x: { ...AXIS, ticks: { ...AXIS.ticks } },
            y: { ...AXIS, grid: { display: false }, ticks: { ...AXIS.ticks, font: { size: 10.5 } } },
          },
        },
      };
    }

    if (tab === "pilares") {
      return {
        type: "radar",
        data: {
          labels: ["Mercado", "Vendas", "Pessoas", "Processos", "Entrega", "Caixa"],
          datasets: [
            {
              label: "Linha de base",
              data: [52, 44, 39, 38, 55, 30],
              borderColor: "rgba(200,209,216,0.34)",
              backgroundColor: "rgba(200,209,216,0.06)",
              pointRadius: 0,
              borderWidth: 1.5,
            },
            {
              label: "Hoje",
              data: [74, 82, 62, 74, 88, 71],
              borderColor: "#9bd7ed",
              backgroundColor: "rgba(40,120,154,0.26)",
              pointBackgroundColor: "#9bd7ed",
              pointRadius: 3,
              pointHoverRadius: 6,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 7, padding: 18 } },
            tooltip: { backgroundColor: "rgba(7,16,25,0.94)", borderColor: "rgba(155,215,237,0.25)", borderWidth: 1, padding: 12 },
          },
          scales: {
            r: {
              min: 0,
              max: 100,
              angleLines: { color: "rgba(200,209,216,0.1)" },
              grid: { color: "rgba(200,209,216,0.12)" },
              pointLabels: { color: "rgba(245,248,250,0.72)", font: { size: 11 } },
              ticks: { display: false },
            },
          },
        },
      };
    }

    return {
      type: "line",
      data: {
        labels: Array.from({ length: 13 }, (_, i) => `S${i + 1}`),
        datasets: [
          {
            label: "Caixa projetado",
            data: [6.2, 6.6, 6.1, 6.9, 7.4, 6.8, 7.9, 7.1, 8.3, 8.8, 8.4, 9.1, 9.4],
            borderColor: "#9bd7ed",
            borderWidth: 2.4,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: true,
            backgroundColor: (chart: ScriptableContext<"line">) => gradientFill(chart, "155,215,237"),
          },
          {
            label: "Piso de segurança",
            data: Array.from({ length: 13 }, () => 6.4),
            borderColor: "rgba(255,140,140,0.7)",
            borderDash: [6, 6],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 7, padding: 18 } },
          tooltip: {
            backgroundColor: "rgba(7,16,25,0.94)",
            borderColor: "rgba(155,215,237,0.25)",
            borderWidth: 1,
            padding: 12,
            callbacks: { label: (item) => ` ${item.dataset.label}: R$ ${item.formattedValue} mi` },
          },
        },
        scales: {
          x: AXIS,
          y: { ...AXIS, ticks: { ...AXIS.ticks, callback: (v) => `R$ ${v} mi` } },
        },
      },
    };
  }, [tab]);

  const activeTab = TABS.find((item) => item.key === tab)!;

  return (
    <section id="painel" className="mp-section relative overflow-hidden bg-[#050c13]">
      <Ambient variant="deep" />
      <div className="mp-shell relative">
        <SectionHeading
          eyebrow="Painel Neural"
          title={
            <>
              Um agente que lê sua empresa
              <br />
              <span className="text-white/45">enquanto você dorme.</span>
            </>
          }
          lead="O MP 365 Intelligence consolida ERP, CRM e People Analytics, aplica o método sobre os dados e devolve o que importa: desvio, causa provável e decisão sugerida — antes do próximo mês fechar."
        />

        <Reveal delay={80}>
          <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            {/* Narrativa */}
            <div className="lg:col-span-4">
              <ul className="grid gap-5">
                {[
                  { icon: LineChart, title: "Coleta sem planilha", body: "Integração nativa com SAP, TOTVS, Omie e Bling — ou importação assistida em 4 cliques." },
                  { icon: Activity, title: "Leitura pelo método", body: "Cada série temporal passa pelos seis pilares e por 34 regras de desvio calibradas por setor." },
                  { icon: Wallet, title: "Decisão sugerida", body: "O alerta vem com custo de oportunidade, dono e prazo sugeridos. Nada de gráfico órfão." },
                  { icon: TriangleAlert, title: "Vigilância contínua", body: "Resumo semanal no seu e-mail e sinalização imediata quando o caixa cruza o piso." },
                ].map((item) => (
                  <li key={item.title} className="group flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-ice transition-all duration-400 group-hover:border-ice/45 group-hover:bg-ice/10">
                      <item.icon size={16} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-[0.98rem] font-semibold tracking-[-0.01em] text-snow">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.88rem] leading-relaxed text-white/55">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-white/45 uppercase">
                  Amostra de painel
                </p>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-white/62">
                  Dados abaixo são de um cliente fictício do setor industrial — o mesmo formato que o
                  conselho recebe toda segunda, 7h.
                </p>
              </div>
            </div>

            {/* Painel */}
            <div className="lg:col-span-8">
              <div className="mp-card overflow-hidden">
                {/* chrome */}
                <div className="flex items-center gap-4 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3 sm:px-5">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <span className="hidden truncate rounded-md border border-white/[0.07] bg-midnight px-2.5 py-1 font-mono text-[0.68rem] text-white/45 sm:block">
                    painel.mp365.com.br/conselho
                  </span>
                  <span className="ml-auto flex items-center gap-2 text-[0.7rem] tracking-[0.1em] text-white/45 uppercase">
                    <span className="mp-live-dot" aria-hidden="true" />
                    sincronizado há 12s
                  </span>
                </div>

                {/* tabs */}
                <div
                  role="tablist"
                  aria-label="Visões do painel"
                  className="flex gap-1 overflow-x-auto border-b border-white/[0.07] px-2 py-2 sm:px-3"
                >
                  {TABS.map((item) => {
                    const isActive = item.key === tab;
                    return (
                      <button
                        key={item.key}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setTab(item.key)}
                        className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-[0.82rem] font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-white/[0.07] text-snow shadow-[inset_0_-1px_0_rgba(155,215,237,0.6)]"
                            : "text-white/50 hover:bg-white/[0.035] hover:text-white/80"
                        }`}
                      >
                        <item.icon size={14} aria-hidden="true" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* body */}
                <div key={tab} className="mp-anim-rise p-4 sm:p-6">
                  <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-3">
                    {KPIS[tab].map((kpi, index) => (
                      <div key={kpi.label} className="bg-[#08121b] px-4 py-3.5">
                        <p className="text-[0.68rem] tracking-[0.1em] text-white/42 uppercase">{kpi.label}</p>
                        <p className="mt-1.5 font-display text-[1.35rem] font-semibold leading-none tracking-[-0.02em]">
                          {kpi.value}
                        </p>
                        <p
                          className={`mt-2 flex items-center gap-1.5 text-[0.74rem] ${
                            kpi.positive ? "text-[#6fe0a8]" : "text-white/50"
                          }`}
                          style={{ animationDelay: `${index * 80}ms` }}
                        >
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: kpi.positive ? "#6fe0a8" : "rgba(200,209,216,0.5)" }}
                            aria-hidden="true"
                          />
                          {kpi.delta}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#08121b] p-3 sm:p-4">
                    <NeuralChart
                      config={config}
                      label={`Gráfico do painel: ${activeTab.label}`}
                      height={300}
                    />
                  </div>

                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {INSIGHTS[tab].map((insight) => (
                      <li
                        key={insight.text}
                        className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-[0.84rem] leading-snug text-white/68 transition-colors duration-300 hover:border-white/15"
                      >
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{
                            background: insight.tone === "warn" ? "#f0b46a" : "#6fe0a8",
                            boxShadow:
                              insight.tone === "warn"
                                ? "0 0 12px rgba(240,180,106,0.8)"
                                : "0 0 12px rgba(111,224,168,0.7)",
                          }}
                          aria-hidden="true"
                        />
                        {insight.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
