export const NAV_ANCHORS = {
  diagnosticar: "#diagnostico",
  metodo: "#metodo",
};

/* ---------------- Prova social ---------------- */
export const LOGOS = [
  "Vertice Log",
  "Nordec Group",
  "Vitalis Clin",
  "AgroLume",
  "Maré Alimentos",
  "Ferraz & Cia",
  "Optima Tech",
  "Cortex Saúde",
];

export const METRICS = [
  { value: 147, suffix: "", prefix: "", label: "empresas reestruturadas desde 2016", decimals: 0 },
  { value: 2.4, prefix: "R$ ", suffix: " bi", label: "de receita sob método MP 365", decimals: 1 },
  { value: 31, prefix: "+", suffix: "%", label: "de margem média em 24 meses", decimals: 0 },
  { value: 94, suffix: "%", label: "renovam a parceria após o 1º ano", decimals: 0 },
];

/* ---------------- Método ---------------- */
export interface MethodStep {
  key: string;
  phase: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  outputs: string[];
}

export const METHOD_STEPS: MethodStep[] = [
  {
    key: "perceber",
    phase: "01",
    title: "Perceber",
    duration: "Dias 1–7",
    summary:
      "Conectamos ERP, CRM, financeiro e People Analytics em um único painel. Antes de qualquer recomendação, a empresa é medida — não opinionada.",
    deliverables: [
      "Entrevistas com sócios e líderes (6 sessões)",
      "Coleta e saneamento de dados dos últimos 24 meses",
      "Mapa de fluxo de valor das 3 cadeias críticas",
    ],
    outputs: ["Linha de base numérica", "Inventário de riscos", "Hipóteses priorizadas"],
  },
  {
    key: "decidir",
    phase: "02",
    title: "Decidir",
    duration: "Dias 8–21",
    summary:
      "Cada hipótese vira cenário com impacto em receita, margem e caixa. O conselho recebe um documento de 12 páginas com o que fazer, o que parar e o que escalar.",
    deliverables: [
      "Diagnóstico dos 6 pilares com score de 0 a 100",
      "Simulação de cenários (base, tração, agressivo)",
      "Decisões com dono, prazo e custo de oportunidade",
    ],
    outputs: ["Plano diretor de 24 meses", "Matriz de prioridades", "Orçamento base-zero"],
  },
  {
    key: "agir",
    phase: "03",
    title: "Agir",
    duration: "Trimestre 1",
    summary:
      "Implantamos ritos, processos e indicadores junto com o time. A MP 365 executa ao lado — não entrega PowerPoint e sai pela porta.",
    deliverables: [
      "Ritual de gestão semanal (metas, blocos, pautas padrão)",
      "Organograma com papéis, responsabilidades e critérios de promoção",
      "Automação de rotinas operacionais e comerciais",
    ],
    outputs: ["Painel neural ativo", "SLAs internos", "Base de conhecimento viva"],
  },
  {
    key: "evoluir",
    phase: "04",
    title: "Evoluir",
    duration: "365 dias",
    summary:
      "O método se retroalimenta: o agente neural compara o previsto com o realizado, sinaliza desvios cedo e recalibra a rota a cada ciclo.",
    deliverables: [
      "Revisão mensal de indicadores com o sócio responsável",
      "Trimestre estratégico com re-priorização de apostas",
      "Relatório de valor patrimonial para sócios e investidores",
    ],
    outputs: ["Score evolutivo", "Runway de caixa", "Dossiê de valuation"],
  },
];

export const LENSES = [
  { name: "Mercado", note: "Posição, preço e demanda", metric: "share 24m" },
  { name: "Vendas", note: "Funil, conversão e ticket", metric: "CAC · LTV" },
  { name: "Pessoas", note: "Papéis, clima e produtividade", metric: "R$/head" },
  { name: "Processos", note: "Ciclo, retrabalho e padrão", metric: "lead time" },
  { name: "Entrega", note: "Qualidade, prazo e custo", metric: "OTIF" },
  { name: "Caixa", note: "Margem, capital de giro, runway", metric: "EBITDA" },
];

/* ---------------- Benefícios ---------------- */
export const BEFORE_AFTER = [
  { before: "Decisão por intuição na segunda-feira", after: "Decisão por indicador com cenário modelado" },
  { before: "Dono apagando incêndio todo dia", after: "Ritual semanal com donos e prazos definidos" },
  { before: "Planilhas paralelas e versões divergentes", after: "Fonte única de verdade integrada ao ERP" },
  { before: "Crescimento que consome caixa", after: "Crescimento calçado em margem e giro" },
  { before: "Time chave insubstituível (e refém)", after: "Papéis, padrão e sucessão documentados" },
  { before: "Empresa valorizada pelo faturamento", after: "Empresa valorizada por fluxo e sistema" },
];

export const BENEFITS = [
  {
    title: "Crescimento sem perder o controle",
    body: "Você ganha visibilidade de dono sobre operação de gestor: cada real de receita nova vem com margem, prazo e responsável anexados.",
    stat: "31%",
    statLabel: "de margem adicional média em 24 meses",
    span: "lg",
  },
  {
    title: "Menos heroísmo, mais sistema",
    body: "Processos, padrões e indicadores substituem o improviso e a dependência de pessoas-chave.",
    stat: "-42%",
    statLabel: "de horas retrabalhadas por semana",
    span: "sm",
  },
  {
    title: "Caixa que sustenta a ambição",
    body: "Capital de giro, política de crédito e forecast semanal de 13 semanas no radar do sócio.",
    stat: "9,4s",
    statLabel: "de runway médio após o ciclo 1",
    span: "sm",
  },
  {
    title: "Uma empresa que vale mais do que fatura",
    body: "Construímos o dossiê que bancos, fundos e compradoras exigem: dados auditáveis, recorrência e time preparado para a próxima fase.",
    stat: "2,1x",
    statLabel: "de múltiplo médio na saída",
    span: "lg",
  },
];

/* ---------------- Depoimentos ---------------- */
export const TESTIMONIALS = [
  {
    quote:
      "A MP 365 não veio com teoria. Veio com número, pergunta difícil e um plano que coube na nossa rotina. Em dois trimestres saímos de 4% para 11% de margem — sem aumentar preço.",
    name: "Renata Villela",
    role: "CEO, Vertice Log",
    sector: "Logística · 180 colaboradores",
    initials: "RV",
    metric: "+7 pts de margem",
  },
  {
    quote:
      "Eu achava que meu problema era vendas. Era estrutura. O diagnóstico dos seis pilares mostrou onde a operação sangrava e o que precisava parar antes de crescer.",
    name: "Paulo Ferraz",
    role: "Sócio-fundador, Ferraz & Cia",
    sector: "Indústria · R$ 62 mi/ano",
    initials: "PF",
    metric: "-R$ 4,1 mi de custo",
  },
  {
    quote:
      "O ritual de gestão mudou o clima do time. As reuniões duram metade, todo mundo sabe o número do dia e ninguém mais descobre problema tarde demais.",
    name: "Camila Duarte",
    role: "COO, Vitalis Clin",
    sector: "Saúde · 14 unidades",
    initials: "CD",
    metric: "+38% produtividade",
  },
  {
    quote:
      "Vendemos em 2024 e o múltiplo foi o dobro do que o banco projetava. O dossiê de patrimônio que a MP montou foi decisivo na mesa de negociação.",
    name: "Ilan Bittencourt",
    role: "Fundador, AgroLume",
    sector: "Agro · exit para fundo",
    initials: "IB",
    metric: "2,3x de valuation",
  },
];

/* ---------------- Planos ---------------- */
export interface Plan {
  name: string;
  tagline: string;
  monthly: number;
  scope: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    name: "Diagnóstico",
    tagline: "O raio-X completo em 21 dias.",
    monthly: 18500,
    scope: "21 dias · projeto fechado",
    features: [
      "Entrevistas com sócios e liderança",
      "Score dos 6 pilares com benchmark setorial",
      "Cenários de receita, margem e caixa",
      "Plano diretor priorizado (12 páginas)",
      "Sessão de devolutiva com o conselho",
    ],
  },
  {
    name: "Escala",
    tagline: "Nosso time embutido no seu, por 12 meses.",
    monthly: 42000,
    scope: "12 meses · squad dedicado",
    featured: true,
    badge: "Escolha de 7 em 10 empresas",
    features: [
      "Tudo do Diagnóstico, incluso",
      "Squad sênior on-site 2x por semana",
      "Ritual de gestão e metas trimestrais (OKR de operação)",
      "Painel Neural com dados integrados ao ERP",
      "Revisão mensal de indicadores com o sócio",
      "Reestruturação de processos críticos e SLAs",
      "Acesso à comunidade de conselheiros MP 365",
    ],
  },
  {
    name: "Patrimônio",
    tagline: "Para quem vai vender, abrir capital ou passar adiante.",
    monthly: 76000,
    scope: "24 meses + assessoria de saída",
    features: [
      "Tudo de Escala, incluso",
      "Dossiê de valuation auditável",
      "Governança, conselho e sucessão",
      "Modelagem M&A e data room",
      "Suporte em negociação com compradores",
    ],
  },
];

export const PLAN_FAQ = [
  "Sem fidelidade automática: saída a qualquer momento com 30 dias de aviso.",
  "Honorários atrelados a meta: até 20% do valor variável por resultado entregue.",
];

/* ---------------- FAQ ---------------- */
export const FAQS = [
  {
    q: "Qual o tamanho ideal de empresa para o MP 365?",
    a: "Trabalhamos com empresas de R$ 5 mi a R$ 300 mi de faturamento anual, normalmente entre 30 e 800 pessoas. Abaixo disso o custo do squad não se paga; acima, o desenho do trabalho envolve mais governança e menos operação.",
  },
  {
    q: "Vocês substituem minha diretoria ou consultoria atual?",
    a: "Não. A MP 365 é um agente neural que conecta o que seu time já sabe com dados, método e execução. O time interno continua dono das decisões — ganha critério, ritmo e evidência. Se houver consultoria setorial, integramos as agendas para não duplicar esforço.",
  },
  {
    q: "Quanto tempo até o primeiro resultado concreto?",
    a: "O diagnóstico entrega decisões priorizadas em 21 dias. No ciclo 1 (90 dias), 84% dos nossos clientes capturam ganho de margem ou caixa suficiente para cobrir o investimento do ano inteiro. A média histórica de payback é de 7 meses.",
  },
  {
    q: "Nossos dados são sensíveis. Como funciona a segurança?",
    a: "Assinamos NDA no primeiro contato, operamos em ambiente isolado com controle de acesso por papel e criptografia em repouso e em trânsito. Somos aderentes à LGPD, auditados anualmente e devolvemos ou destruímos toda base ao fim do contrato, mediante relatório.",
  },
  {
    q: "Preciso integrar meu ERP para usar o Painel Neural?",
    a: "Não para começar. O painel aceita planilhas, exportações e integrações nativas com os principais ERPs do país (SAP, TOTVS, Omie, Bling). A integração completa vem na fase de implantação e é opcional — a maioria escolhe fazer por reduzir retrabalho manual.",
  },
  {
    q: "E se a cultura da empresa resistir à mudança?",
    a: "Resistência é dado, não obstáculo. Mapeamos quem decide, quem influencia e quem trava; desenhamos incentivos junto com os processos; e conduzimos o time pelas etapas de adoção. Nas cinco empresas em que a cultura era o gargalo principal, o trabalho começou por ela.",
  },
  {
    q: "Como é cobrado o trabalho?",
    a: "Projeto fechado para o Diagnóstico e mensalidade para os ciclos de implantação. No Escala e no Patrimônio, parte do honorário é variável sobre meta pactuada: se o número não sai, essa parte não é faturada.",
  },
];

/* ---------------- Diagnóstico ---------------- */
export const DIAGNOSIS_STEPS = [
  { day: "D+0", title: "Conversa de encaixe", body: "45 minutos com um sócio da MP 365. Sem presentation deck, sem robô." },
  { day: "D+3", title: "Coleta assistida", body: "Você sobe planilhas e acessos de leitura. Nós organizamos e validamos." },
  { day: "D+21", title: "Diagnóstico entregue", body: "Score, cenários e plano diretor na mesa do conselho." },
];

export const REVENUE_BANDS = [
  "Até R$ 5 mi",
  "R$ 5 a 20 mi",
  "R$ 20 a 60 mi",
  "R$ 60 a 150 mi",
  "Acima de R$ 150 mi",
];

export const SECTORS = [
  "Indústria",
  "Logística e transporte",
  "Saúde",
  "Varejo e distribuição",
  "Agro",
  "Tecnologia e serviços B2B",
  "Construção e imóveis",
];
