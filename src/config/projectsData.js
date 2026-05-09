export const projectDataDisclaimer =
  'Portfolio projects use sample or synthetic data only. No confidential employer, client, policyholder, or company data is included.'

export const projectStatusLabels = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
  prototype: 'Prototype',
}

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'excel-tool', label: 'Excel Tool' },
  { id: 'web-app', label: 'Web App' },
  { id: 'automation', label: 'Automation' },
  { id: 'ai-rag', label: 'AI/RAG' },
  { id: 'dashboard', label: 'Dashboard' },
]

export const portfolioProjects = [
  {
    id: 'mark-to-model-excel-tool',
    title: 'Mark-to-Model Excel Tool',
    shortTitle: 'MTM Excel',
    subtitle: 'Structured Excel template for mark-to-model valuation workflows.',
    category: 'Excel Tool',
    filterGroup: 'excel-tool',
    status: 'planned',
    featured: true,
    summary:
      'A future Excel-based valuation template where users can enter required asset, assumption, and model data in a controlled structure.',
    problem:
      'Mark-to-model workflows can become hard to review when assumptions, inputs, and outputs are scattered across manual spreadsheets.',
    solution:
      'Design a governed Excel template using formulas, validation, and optional VBA to standardize inputs and produce clear valuation outputs.',
    impact:
      'Planned to improve repeatability, documentation, and reviewability for portfolio-style valuation examples.',
    tools: ['Excel', 'Advanced Formulas', 'VBA', 'Model Validation'],
    tags: ['Mark-to-Model', 'Excel Template', 'Valuation', 'Controls'],
    deliverables: [
      'Structured input workbook',
      'Sample valuation output tabs',
      'Documentation and assumptions guide',
    ],
    futureRoadmap: [
      'Create sample synthetic input data',
      'Add model checks and validation rules',
      'Publish downloadable template once reviewed',
    ],
    links: {
      liveApp: null,
      caseStudy: null,
      github: null,
      download: null,
      demoVideo: null,
      screenshot: null,
    },
    appSubdomain: 'mtm-excel.tamangsanjaya.com.np',
    repoName: 'tamangsanjaya-mtm-excel-tool',
    disclaimer: projectDataDisclaimer,
  },
  {
    id: 'mark-to-model-python-web-app',
    title: 'Mark-to-Model Python Web App',
    shortTitle: 'MTM Web App',
    subtitle: 'Future browser-based mark-to-model workflow and results interface.',
    category: 'Web App',
    filterGroup: 'web-app',
    status: 'planned',
    featured: true,
    summary:
      'A planned standalone app for entering or uploading valuation inputs, running model logic, and reviewing structured outputs.',
    problem:
      'Spreadsheet-only valuation tools can be difficult to scale, audit, and present to non-technical stakeholders.',
    solution:
      'Build a separate Python-powered web app later, with this portfolio linking to the deployed app and case study.',
    impact:
      'Intended to demonstrate the path from Excel models to maintainable, app-like actuarial tools.',
    tools: ['Python', 'Pandas', 'React', 'Validation', 'Cloud Deployment'],
    tags: ['Mark-to-Model', 'Web App', 'Python', 'Model Outputs'],
    deliverables: [
      'Standalone app repository',
      'Input and assumption workflow',
      'Result summaries and exportable views',
    ],
    futureRoadmap: [
      'Define input schema',
      'Build model calculation service in a separate repo',
      'Link live app after deployment',
    ],
    links: {
      liveApp: null,
      caseStudy: null,
      github: null,
      download: null,
      demoVideo: null,
      screenshot: null,
    },
    appSubdomain: 'mtm.tamangsanjaya.com.np',
    repoName: 'tamangsanjaya-mtm-web-app',
    disclaimer: projectDataDisclaimer,
  },
  {
    id: 'liability-valuation-web-app',
    title: 'Liability Valuation Web App',
    shortTitle: 'Valuation App',
    subtitle: 'Planned actuarial liability valuation workflow interface.',
    category: 'Web App',
    filterGroup: 'web-app',
    status: 'planned',
    featured: true,
    summary:
      'A future standalone application concept for actuarial valuation runs, assumptions, model point data, cashflows, and reserve summaries.',
    problem:
      'Liability valuation workflows often require careful input governance, traceability, and repeatable reporting outputs.',
    solution:
      'Represent the intended workflow as a portfolio case study now, then build the app separately when the model design is ready.',
    impact:
      'Planned to showcase actuarial modeling discipline, automation design, and transparent valuation reporting.',
    tools: ['Python', 'SQL', 'React', 'Actuarial Valuation', 'Cashflow Models'],
    tags: ['Liability Valuation', 'Reserving', 'Cashflows', 'Model Points'],
    deliverables: [
      'Valuation workflow design',
      'Assumption input patterns',
      'Reserve and cashflow output views',
    ],
    futureRoadmap: [
      'Create synthetic policy/model point data',
      'Design basis selection workflow',
      'Deploy as a separate app when ready',
    ],
    links: {
      liveApp: null,
      caseStudy: null,
      github: null,
      download: null,
      demoVideo: null,
      screenshot: null,
    },
    appSubdomain: 'valuation.tamangsanjaya.com.np',
    repoName: 'tamangsanjaya-liability-valuation-app',
    disclaimer: projectDataDisclaimer,
  },
  {
    id: 'actuarial-reporting-automation',
    title: 'Actuarial Reporting Automation',
    shortTitle: 'Reporting Automation',
    subtitle: 'Automation for recurring actuarial and business reporting workflows.',
    category: 'Automation',
    filterGroup: 'automation',
    status: 'in-progress',
    featured: true,
    summary:
      'A practical automation project focused on recurring reports, data extraction, Excel outputs, styled emails, and dashboard-ready summaries.',
    problem:
      'Recurring reporting can consume time when SQL extracts, Excel transformations, and distribution steps are repeated manually.',
    solution:
      'Use Python, SQL, Excel automation, and reporting templates to create repeatable workflows with clearer review points.',
    impact:
      'Targets faster reporting cycles, fewer manual touchpoints, and more consistent business outputs.',
    tools: ['Python', 'SQL', 'Excel', 'Power BI', 'Email Automation'],
    tags: ['Automation', 'Reporting', 'SQL Pipeline', 'Excel Outputs'],
    deliverables: [
      'Reusable reporting scripts',
      'Styled email/report output patterns',
      'Dashboard-ready data extracts',
    ],
    futureRoadmap: [
      'Publish sanitized workflow screenshots',
      'Add a case study with synthetic examples',
      'Link demo repository when ready',
    ],
    links: {
      liveApp: null,
      caseStudy: null,
      github: null,
      download: null,
      demoVideo: null,
      screenshot: null,
    },
    appSubdomain: 'reporting.tamangsanjaya.com.np',
    repoName: 'tamangsanjaya-reporting-automation',
    disclaimer: projectDataDisclaimer,
  },
  {
    id: 'rag-assistant',
    title: 'RAG Assistant',
    shortTitle: 'RAG Assistant',
    subtitle: 'Document Q&A assistant concept for policy and product documents.',
    category: 'AI/RAG',
    filterGroup: 'ai-rag',
    status: 'prototype',
    featured: false,
    summary:
      'A planned separate demo for document parsing, embeddings, vector search, retrieved context, and question answering.',
    problem:
      'Technical users often need fast answers from long policy, product, or methodology documents without losing source context.',
    solution:
      'Build a standalone RAG demo later and keep the portfolio focused on the case study, screenshots, and links.',
    impact:
      'Designed to demonstrate careful AI workflow thinking while keeping private documents out of the portfolio repo.',
    tools: ['Python', 'Embeddings', 'Vector Search', 'React', 'Prompt Assembly'],
    tags: ['RAG', 'Document AI', 'Q&A', 'Vector Search'],
    deliverables: [
      'Document parsing workflow',
      'Retrieved-context answer interface',
      'Synthetic document demo set',
    ],
    futureRoadmap: [
      'Choose sample public or synthetic documents',
      'Create separate app repository',
      'Add deployment and case study link',
    ],
    links: {
      liveApp: null,
      caseStudy: null,
      github: null,
      download: null,
      demoVideo: null,
      screenshot: null,
    },
    appSubdomain: 'rag.tamangsanjaya.com.np',
    repoName: 'tamangsanjaya-rag-assistant',
    disclaimer: projectDataDisclaimer,
  },
  {
    id: 'dashboard-web-app',
    title: 'Dashboard Web App',
    shortTitle: 'Dashboard App',
    subtitle: 'Future web dashboard for KPI and actuarial reporting views.',
    category: 'Dashboard',
    filterGroup: 'dashboard',
    status: 'planned',
    featured: false,
    summary:
      'A planned app-like dashboard experience for KPI monitoring, interactive charts, and reporting summaries.',
    problem:
      'Business and actuarial reporting often needs both high-level summaries and drillable views without overwhelming users.',
    solution:
      'Design a separate dashboard demo later, while this portfolio stores the roadmap and links once available.',
    impact:
      'Intended to showcase reporting design, chart interaction, and decision-ready data presentation.',
    tools: ['React', 'Charts', 'Power BI Concepts', 'SQL', 'KPI Design'],
    tags: ['Dashboard', 'KPI Monitoring', 'Reporting', 'Data Visualization'],
    deliverables: [
      'Responsive dashboard screens',
      'Interactive chart examples',
      'Synthetic KPI dataset',
    ],
    futureRoadmap: [
      'Define KPI sample dataset',
      'Build charts in a separate deployable app',
      'Link demo and screenshots from the portfolio',
    ],
    links: {
      liveApp: null,
      caseStudy: null,
      github: null,
      download: null,
      demoVideo: null,
      screenshot: null,
    },
    appSubdomain: 'dashboard.tamangsanjaya.com.np',
    repoName: 'tamangsanjaya-dashboard-web-app',
    disclaimer: projectDataDisclaimer,
  },
]
