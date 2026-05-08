export const commandSections = [
  {
    id: 'home',
    label: 'Home / Intro',
    eyebrow: 'Command Center',
    title: 'Technical actuarial portfolio, gesture-ready.',
    summary:
      'A premium interactive layer for exploring actuarial automation, analytics, reporting systems, dashboards, and AI experiments.',
    metrics: ['Browser-only control layer', 'Camera optional', 'Fallback first'],
  },
  {
    id: 'about',
    label: 'About Me',
    eyebrow: 'Profile',
    title: 'Actuarial analyst with a technical automation edge.',
    summary:
      'I focus on turning complex insurance and financial data into reliable decision systems using Python, SQL, Power BI, Excel, and actuarial modeling discipline.',
    metrics: ['Actuarial analysis', 'Automation', 'Decision support'],
  },
  {
    id: 'automation-lab',
    label: 'Actuarial Automation Lab',
    eyebrow: 'Automation',
    title: 'Repeatable workflows for reporting and model execution.',
    summary:
      'This zone highlights reporting workflows, valuation model automation, Excel-to-Python conversions, and controls that reduce manual effort.',
    metrics: ['Python scripts', 'Excel workflows', 'Auditability'],
  },
  {
    id: 'projects',
    label: 'Projects',
    eyebrow: 'Portfolio',
    title: 'Project cards built around problem, solution, tools, and impact.',
    summary:
      'Select a project card to open a detailed command panel. Pinch, Enter, click, or tap can all open cards.',
    metrics: ['Valuation', 'Dashboards', 'AI/RAG'],
  },
  {
    id: 'skills',
    label: 'Skills Constellation',
    eyebrow: 'Capability Map',
    title: 'Core automation skill set arranged around actuarial delivery.',
    summary:
      'The constellation keeps Actuarial Automation at the center, with connected technical and domain skills orbiting around it.',
    metrics: ['Python', 'SQL', 'Power BI'],
  },
  {
    id: 'valuation',
    label: 'RBC / Valuation Knowledge Zone',
    eyebrow: 'Knowledge',
    title: 'Capital, valuation, reserving, and solvency thinking.',
    summary:
      'A focused area for valuation workflows, reserving logic, RBC and solvency analytics, and actuarial model governance.',
    metrics: ['RBC', 'Solvency', 'Valuation'],
  },
  {
    id: 'dashboards',
    label: 'Power BI Dashboard Gallery',
    eyebrow: 'Visualization',
    title: 'Management reporting through clear dashboard systems.',
    summary:
      'A future gallery for KPI dashboards, reporting pages, movement analysis, and executive summaries built with Power BI and SQL.',
    metrics: ['DAX', 'SQL models', 'KPI tracking'],
  },
  {
    id: 'ai',
    label: 'RAG / AI Experiments',
    eyebrow: 'Experiment Lab',
    title: 'Document intelligence for policy and actuarial workflows.',
    summary:
      'A space for RAG assistants, document search, policy analysis, and AI-supported reporting workflows.',
    metrics: ['RAG', 'Embeddings', 'Document AI'],
  },
  {
    id: 'timeline',
    label: 'Career Timeline',
    eyebrow: 'Progression',
    title: 'A horizontal path through technical actuarial growth.',
    summary:
      'Use arrows, menu controls, or palm swipe navigation to move through the learning and project timeline.',
    metrics: ['Learning', 'Building', 'Automating'],
  },
  {
    id: 'resume',
    label: 'Resume',
    eyebrow: 'Snapshot',
    title: 'A compact resume view for recruiters and collaborators.',
    summary:
      'Summary, experience, skills, projects, and education placeholders are arranged as a quick scan panel.',
    metrics: ['Summary', 'Projects', 'Skills'],
  },
  {
    id: 'contact',
    label: 'Contact Terminal',
    eyebrow: 'Terminal',
    title: 'Connect through the command terminal.',
    summary:
      'Select a contact command using pinch, Enter, click, or tap. Camera remains optional.',
    metrics: ['LinkedIn', 'Email', 'Website'],
  },
]

export const refinedGestureInstructions = [
  {
    gesture: 'Point',
    action: 'Move the visible pointer and focus UI items. Point never navigates by itself.',
    signal: 'P',
  },
  {
    gesture: 'Pinch',
    action: 'Select, click, open cards, or choose highlighted command items.',
    signal: '◎',
  },
  {
    gesture: 'Two-Finger Scroll',
    action: 'Hold index and middle fingers up, then move vertically to scroll.',
    signal: 'II',
  },
  {
    gesture: 'Open Palm Hold',
    action: 'Hold a steady open palm to open or close the command panel.',
    signal: 'H',
  },
  {
    gesture: 'Open Palm Swipe',
    action: 'With palm open, swipe left/right for next or previous section.',
    signal: '<>',
  },
]

export const gestureInstructions = refinedGestureInstructions

export const keyboardInstructions = [
  { key: 'ArrowRight', action: 'Next section' },
  { key: 'ArrowLeft', action: 'Previous section' },
  { key: 'Enter', action: 'Select highlighted item' },
  { key: 'Escape', action: 'Close modal or command panel' },
]

export const refinedCommandMenuItems = [
  { id: 'home', label: 'Home', sectionId: 'home' },
  { id: 'about', label: 'About', sectionId: 'about' },
  { id: 'projects', label: 'Projects', sectionId: 'projects' },
  { id: 'skills', label: 'Skills', sectionId: 'skills' },
  { id: 'timeline', label: 'Timeline', sectionId: 'timeline' },
  { id: 'resume', label: 'Resume', sectionId: 'resume' },
  { id: 'contact', label: 'Contact', sectionId: 'contact' },
  { id: 'next', label: 'Next Section', action: 'next' },
  { id: 'previous', label: 'Previous Section', action: 'previous' },
  { id: 'exit', label: 'Exit Gesture Mode', action: 'exit' },
]

export const commandMenuItems = refinedCommandMenuItems

export const gestureProjects = [
  {
    id: 'valuation-automation',
    title: 'Actuarial Valuation Automation',
    problem:
      'Recurring valuation workflows can become manual, repetitive, and hard to audit when spread across spreadsheets.',
    solution:
      'A structured automation workflow that organizes assumptions, calculations, validation checks, and outputs.',
    tools: ['Python', 'Excel', 'Pandas', 'Actuarial Models'],
    impact:
      'Improves repeatability, auditability, and turnaround time for valuation reporting.',
  },
  {
    id: 'excel-python-converter',
    title: 'Excel to Python Model Converter',
    problem:
      'Complex Excel models can be slow, difficult to version, and harder to test as logic expands.',
    solution:
      'Translate spreadsheet model logic into Python modules with clearer calculation steps and validation outputs.',
    tools: ['Python', 'NumPy', 'Pandas', 'Excel'],
    impact:
      'Creates a stronger foundation for testing, documentation, automation, and future model scaling.',
  },
  {
    id: 'powerbi-dashboard',
    title: 'Power BI Business Dashboard',
    problem:
      'Management reporting often needs faster access to trends, movements, and KPI summaries.',
    solution:
      'Interactive Power BI dashboards connected to clean reporting tables and business definitions.',
    tools: ['Power BI', 'DAX', 'SQL', 'Data Modeling'],
    impact:
      'Helps stakeholders inspect performance and make decisions with clearer visual evidence.',
  },
  {
    id: 'sql-pipeline',
    title: 'SQL Reporting Pipeline',
    problem:
      'Manual data extraction can cause delays, inconsistencies, and repeated reconciliation effort.',
    solution:
      'Reusable SQL pipelines for extracting, joining, validating, and preparing reporting datasets.',
    tools: ['SQL', 'Power Query', 'Excel', 'Reporting Controls'],
    impact:
      'Supports cleaner recurring reports and reduces manual data preparation effort.',
  },
  {
    id: 'rag-policy-assistant',
    title: 'RAG Policy Document Assistant',
    problem:
      'Policy documents and technical references can be difficult to search and summarize quickly.',
    solution:
      'A retrieval-assisted assistant concept that searches document chunks and returns grounded answers.',
    tools: ['RAG', 'Embeddings', 'Python', 'Document AI'],
    impact:
      'Creates a path toward faster policy review, technical lookup, and knowledge support.',
  },
  {
    id: 'rbc-solvency',
    title: 'RBC / Solvency Analytics',
    problem:
      'Capital and solvency views require controlled calculations, traceability, and scenario clarity.',
    solution:
      'A structured analytics layer for RBC and solvency metrics, assumptions, and dashboard outputs.',
    tools: ['Actuarial Valuation', 'SQL', 'Power BI', 'Excel Models'],
    impact:
      'Improves visibility into solvency drivers and supports technical review conversations.',
  },
]

export const skillNodes = [
  {
    id: 'core',
    label: 'Actuarial Automation',
    detail:
      'The central operating idea: use technical systems to improve actuarial accuracy, speed, control, and repeatability.',
    core: true,
  },
  {
    id: 'python',
    label: 'Python',
    detail: 'Automation scripts, data preparation, model conversion, and workflow orchestration.',
  },
  {
    id: 'pandas',
    label: 'Pandas / NumPy',
    detail: 'Tabular transformations, valuation calculations, model arrays, and validation checks.',
  },
  {
    id: 'sql',
    label: 'SQL',
    detail: 'Data extraction, joins, reporting tables, pipeline logic, and reconciliation support.',
  },
  {
    id: 'powerbi',
    label: 'Power BI',
    detail: 'Interactive dashboards, DAX measures, KPI reporting, and management views.',
  },
  {
    id: 'excel',
    label: 'Excel Models',
    detail: 'Advanced formulas, model review, Power Query, and spreadsheet-to-code conversion.',
  },
  {
    id: 'valuation',
    label: 'Valuation',
    detail: 'Cashflows, assumptions, reserving support, model governance, and reporting outputs.',
  },
  {
    id: 'rbc',
    label: 'RBC / Solvency',
    detail: 'Capital analytics, solvency monitoring, regulatory views, and scenario summaries.',
  },
  {
    id: 'rag',
    label: 'RAG / AI',
    detail: 'Retrieval-assisted document analysis and AI-supported technical knowledge workflows.',
  },
  {
    id: 'reporting',
    label: 'Reporting Automation',
    detail: 'Recurring reports, controls, scheduled outputs, and repeatable business summaries.',
  },
]

export const timelineItems = [
  {
    title: 'Learning actuarial fundamentals',
    detail: 'Built the foundation in actuarial concepts, valuation thinking, and analytical discipline.',
  },
  {
    title: 'Building Excel/SQL reporting skills',
    detail: 'Developed stronger reporting workflows through Excel, SQL extraction, and data checks.',
  },
  {
    title: 'Power BI dashboard development',
    detail: 'Created interactive management views for KPIs, movements, trends, and reporting summaries.',
  },
  {
    title: 'Python automation for actuarial workflows',
    detail: 'Moved recurring manual reporting work into structured Python-assisted automation.',
  },
  {
    title: 'Excel valuation model conversion to Python',
    detail: 'Converted spreadsheet model logic into scalable, testable Python workflows.',
  },
  {
    title: 'RAG/document AI experiments',
    detail: 'Explored retrieval-assisted policy and technical document workflows for faster lookup.',
  },
]

export const resumeContent = {
  summary:
    'Technical Actuarial Analyst focused on actuarial automation, reporting workflows, data analysis, valuation model conversion, and dashboard development.',
  experience: [
    'Actuarial analytics and reporting workflow development',
    'Automation of recurring Excel, SQL, and Python-based reporting tasks',
    'Power BI dashboarding for KPI tracking and management summaries',
  ],
  skills: [
    'Python',
    'SQL',
    'Power BI',
    'Advanced Excel',
    'Actuarial Valuation',
    'Reporting Automation',
    'RAG / AI Experiments',
  ],
  projects: [
    'Actuarial valuation automation',
    'Excel to Python model conversion',
    'Power BI business dashboard',
    'SQL reporting pipeline',
  ],
  education:
    'Education and certifications placeholder. Add formal credentials here when ready.',
}

export const createContactItems = (siteData) => [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: siteData.linkedin,
    href: siteData.linkedin,
    command: 'open linkedin.profile',
  },
  {
    id: 'email',
    label: 'Email',
    value: siteData.email,
    href: `mailto:${siteData.email}`,
    command: 'send email.message',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'GitHub profile coming soon',
    href: '',
    command: 'open github.profile',
  },
  {
    id: 'resume',
    label: 'Resume',
    value: 'Resume download coming soon',
    href: '',
    command: 'download resume.pdf',
  },
]
