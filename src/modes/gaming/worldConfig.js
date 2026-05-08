export const WORLD_BOUNDS = {
  width: 1080,
  height: 680,
}

export const PLAYER_START = {
  x: 520,
  y: 350,
}

export const PLAYER_SPEED = 210
export const INTERACTION_DISTANCE = 92

export const portfolioBuildings = [
  {
    id: 'home-base',
    name: 'Home Base',
    type: 'intro',
    position: { x: 520, y: 120 },
    size: { width: 132, height: 112 },
    theme: 'cyan',
    icon: 'HB',
    shortPrompt: 'Enter the main identity hub.',
    summary:
      'A quick introduction to Sanjaya Tamang as a Technical Actuarial Analyst focused on automation and analytics.',
    contentSections: [
      {
        title: 'Technical Actuarial Analyst',
        text: 'I combine actuarial thinking with Python, SQL, Power BI, Advanced Excel, and automation to build reliable reporting and model workflows.',
        tags: ['Actuarial analytics', 'Automation', 'Decision support'],
      },
      {
        title: 'Portfolio Mission',
        text: 'Explore the city to learn about my skills, projects, valuation interests, AI experiments, and contact details.',
        tags: ['Portfolio city', 'Interactive mode'],
      },
    ],
  },
  {
    id: 'about-house',
    name: 'About House',
    type: 'profile',
    position: { x: 190, y: 200 },
    size: { width: 128, height: 104 },
    theme: 'blue',
    icon: 'AH',
    shortPrompt: 'Explore background and focus.',
    summary:
      'A profile room for actuarial background, technical focus, and the way I approach analytical work.',
    contentSections: [
      {
        title: 'Actuarial Background',
        text: 'Detail-oriented actuarial professional with a strong foundation in data analysis, modeling, reporting, and business decision support.',
        tags: ['Actuarial work', 'Data analysis'],
      },
      {
        title: 'Technical Focus',
        text: 'I like turning repeated manual workflows into controlled, auditable, and reusable automation systems.',
        tags: ['Controls', 'Automation', 'Reporting'],
      },
    ],
  },
  {
    id: 'skills-lab',
    name: 'Skills Lab',
    type: 'skills',
    position: { x: 842, y: 210 },
    size: { width: 142, height: 116 },
    theme: 'violet',
    icon: 'SL',
    shortPrompt: 'Inspect the technical toolkit.',
    summary:
      'An inventory-style lab of the core tools behind my actuarial-tech work.',
    contentSections: [
      {
        title: 'Core Stack',
        text: 'Python, SQL, Power BI, Advanced Excel, Actuarial Valuation, and Automation.',
        tags: ['Python', 'SQL', 'Power BI', 'Excel'],
      },
      {
        title: 'Workflow Skills',
        text: 'Model conversion, reporting pipelines, dashboard design, data checks, and repeatable business summaries.',
        tags: ['Pandas', 'DAX', 'Power Query'],
      },
    ],
  },
  {
    id: 'projects-workshop',
    name: 'Projects Workshop',
    type: 'projects',
    position: { x: 300, y: 420 },
    size: { width: 166, height: 124 },
    theme: 'amber',
    icon: 'PW',
    shortPrompt: 'Open the project garage.',
    summary:
      'A workshop of practical portfolio projects presented as problem, solution, tools, and impact.',
    contentSections: [
      {
        title: 'Actuarial Reporting Automation',
        text: 'Automating recurring reserving, premium, movement analysis, and business reporting outputs.',
        tags: ['Python', 'SQL', 'Excel', 'Automation'],
      },
      {
        title: 'Excel to Python Model Conversion',
        text: 'Moving complex spreadsheet logic into clearer Python workflows for maintainability and auditability.',
        tags: ['Python', 'Pandas', 'NumPy'],
      },
      {
        title: 'Power BI Business Dashboard',
        text: 'Interactive KPI dashboards for management reporting and decision support.',
        tags: ['Power BI', 'DAX', 'SQL'],
      },
      {
        title: 'SQL Reporting Pipeline',
        text: 'Reusable extraction and validation pipelines for reporting datasets.',
        tags: ['SQL', 'Reporting controls'],
      },
      {
        title: 'RAG Policy Document Assistant',
        text: 'Retrieval-assisted document Q&A concept for policy and technical lookup.',
        tags: ['RAG', 'Embeddings', 'Document AI'],
      },
      {
        title: 'RBC / Solvency Analytics',
        text: 'Structured analytics for solvency drivers, capital views, and actuarial review.',
        tags: ['RBC', 'Solvency', 'Valuation'],
      },
    ],
  },
  {
    id: 'automation-lab',
    name: 'Automation Lab',
    type: 'automation',
    position: { x: 625, y: 455 },
    size: { width: 150, height: 118 },
    theme: 'green',
    icon: 'AL',
    shortPrompt: 'Enter the automation systems lab.',
    summary:
      'A lab for actuarial automation, reporting pipelines, and Excel-to-Python workflows.',
    contentSections: [
      {
        title: 'Reporting Pipelines',
        text: 'Controlled data preparation and recurring outputs for actuarial and business reporting cycles.',
        tags: ['SQL', 'Python', 'Validation'],
      },
      {
        title: 'Excel-to-Python Workflows',
        text: 'Convert fragile workbook logic into scripts that are easier to test, version, and scale.',
        tags: ['Model conversion', 'Auditability'],
      },
    ],
  },
  {
    id: 'valuation-tower',
    name: 'Valuation Tower',
    type: 'valuation',
    position: { x: 900, y: 500 },
    size: { width: 118, height: 160 },
    theme: 'indigo',
    icon: 'VT',
    shortPrompt: 'Review valuation and solvency knowledge.',
    summary:
      'A tower for valuation, reserving, RBC, solvency, and actuarial modeling interests.',
    contentSections: [
      {
        title: 'Valuation Models',
        text: 'Cashflow projections, assumptions, model checks, and repeatable reporting structures.',
        tags: ['Cashflows', 'Assumptions', 'Models'],
      },
      {
        title: 'RBC / Solvency',
        text: 'Capital analytics, solvency monitoring, regulatory views, and scenario summaries.',
        tags: ['RBC', 'Solvency', 'Capital'],
      },
      {
        title: 'Reserving',
        text: 'Data preparation, movement analysis, and actuarial reporting support.',
        tags: ['Reserving', 'Reporting'],
      },
    ],
  },
  {
    id: 'ai-research-zone',
    name: 'AI Research Zone',
    type: 'ai',
    position: { x: 125, y: 560 },
    size: { width: 138, height: 108 },
    theme: 'pink',
    icon: 'AI',
    shortPrompt: 'Explore RAG and document AI experiments.',
    summary:
      'An experimental research zone for RAG, policy document Q&A, embeddings, vector search, and prompt assembly.',
    contentSections: [
      {
        title: 'RAG Pipeline',
        text: 'Chunk documents, embed content, retrieve relevant context, and assemble grounded responses.',
        tags: ['RAG', 'Vector search', 'Embeddings'],
      },
      {
        title: 'Policy Document Q&A',
        text: 'A concept for searching policy and technical documents faster while keeping answers tied to source context.',
        tags: ['Document AI', 'Prompt assembly'],
      },
    ],
  },
  {
    id: 'contact-terminal',
    name: 'Contact Terminal',
    type: 'contact',
    position: { x: 720, y: 90 },
    size: { width: 132, height: 96 },
    theme: 'slate',
    icon: 'CT',
    shortPrompt: 'Open contact commands.',
    summary:
      'A terminal-style contact node for email, LinkedIn, GitHub placeholder, and resume placeholder.',
    contentSections: [
      {
        title: 'Email',
        text: 'actsanjaya@gmail.com',
        tags: ['Contact'],
      },
      {
        title: 'LinkedIn',
        text: 'https://www.linkedin.com/in/sanjaya-tamang/',
        tags: ['Profile'],
      },
      {
        title: 'GitHub',
        text: 'GitHub profile placeholder.',
        tags: ['Coming soon'],
      },
      {
        title: 'Resume',
        text: 'Resume download placeholder.',
        tags: ['Coming soon'],
      },
    ],
  },
]
