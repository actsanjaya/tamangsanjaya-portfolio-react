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
    title: 'Asset Valuation Model / Mark-to-Model Engine',
    shortTitle: 'MTM Engine',
    subtitle: 'Python valuation engine with editable Excel inputs and automated PV outputs.',
    category: 'Excel Tool',
    filterGroup: 'excel-tool',
    status: 'completed',
    featured: true,
    summary:
      'A Python-based valuation model that reads editable Excel inputs, validates asset data, projects cashflows, applies discount factors and stress scenarios, and generates automated PV outputs.',
    problem:
      'Mark-to-model workflows can become hard to review when assumptions, asset data, cashflows, discount factors, and outputs are scattered across manual spreadsheet workings.',
    solution:
      'Built a controlled Python workflow using structured Excel inputs, dataclass-based asset models, validation checks, cashflow projection, discount factor lookup, stress scenarios, and Excel output generation.',
    impact:
      'Improves repeatability, auditability, data checking, and usability for valuation outputs that need to be reviewed by actuarial, finance, and non-technical stakeholders.',
    tools: ['Python', 'Pandas', 'Excel', 'OpenPyXL', 'Model Validation'],
    tags: ['Mark-to-Model', 'Valuation', 'Cashflows', 'Stress Scenarios'],
    deliverables: [
      'Editable Excel input workflow',
      'Projected cashflow and PV output files',
      'Validation and run-summary reporting',
    ],
    futureRoadmap: [
      'Add a Streamlit interface for non-technical users',
      'Package the workflow into a one-folder executable release',
      'Publish sanitized screenshots and project case study',
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
    title: 'Mark-to-Model User Interface',
    shortTitle: 'MTM UI',
    subtitle: 'Streamlit direction for a non-technical valuation model runner.',
    category: 'Web App',
    filterGroup: 'web-app',
    status: 'in-progress',
    featured: true,
    summary:
      'A user-friendly interface direction for running the mark-to-model engine through folder selection, input checks, editable parameters, progress messages, and downloadable outputs.',
    problem:
      'Command-line valuation tools are powerful but can be difficult for non-technical users to run, review, and trust without a guided interface.',
    solution:
      'Use Streamlit and packaging concepts to turn the Python valuation engine into an app-like workflow with clear file checks, model settings, validation status, and output download steps.',
    impact:
      'Demonstrates the path from actuarial calculation code to a stakeholder-friendly financial tool that can be used without opening the Python source.',
    tools: ['Python', 'Streamlit', 'Pandas', 'Validation', 'PyInstaller'],
    tags: ['Mark-to-Model', 'Streamlit', 'Python', 'Model Outputs'],
    deliverables: [
      'Folder-based model runner concept',
      'Model setting preview and validation status',
      'Downloadable valuation outputs',
    ],
    futureRoadmap: [
      'Complete Streamlit controls for parameter editing',
      'Add output download and run-history views',
      'Rebuild packaged executable after interface completion',
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
      'A practical automation project focused on daily business reporting, SQL/data extraction, Excel outputs, scheduled execution, email distribution, and dashboard-ready summaries.',
    problem:
      'Recurring reporting can consume time when SQL extracts, Excel transformations, and distribution steps are repeated manually.',
    solution:
      'Use Python, SQL, Excel automation, Windows Task Scheduler, and reporting templates to create repeatable workflows with clearer review points and automated email delivery.',
    impact:
      'Supports faster daily reporting, fewer manual touchpoints, and more consistent business outputs for senior management and operational review.',
    tools: ['Python', 'SQL', 'Excel', 'Power BI', 'Task Scheduler'],
    tags: ['Automation', 'Reporting', 'Email Distribution', 'Excel Outputs'],
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
