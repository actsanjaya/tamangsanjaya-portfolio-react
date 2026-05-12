import { portfolioProjects } from '../../../../config/projectsData.js'
import { siteData } from '../../../../config/siteData.js'

export const WORLD_SIZE = {
  width: 1800,
  height: 1120,
}

export const PLAYER_START = {
  x: 930,
  y: 610,
}

export const INTERACTION_DISTANCE = 120
export const PLAYER_SPEED = 260

export const worldZones = [
  {
    id: 'home-base',
    name: 'Home Base',
    subtitle: 'Identity Hub',
    type: 'Identity Hub',
    position: { x: 900, y: 260 },
    size: { width: 230, height: 150 },
    collisionBox: { width: 190, height: 116 },
    buildingType: 'base',
    asset: {
      building: 'homeBaseBuilding',
      display: { width: 304, height: 220 },
      offsetY: -8,
    },
    entrance: { x: 900, y: 345 },
    theme: 'cyan',
    color: 0x38bdf8,
    icon: 'HB',
    summary:
      'A compact intro hub for Sanjaya Tamang as a Technical Actuarial Analyst focused on automation, reporting, and technical execution.',
    contentSections: [
      {
        title: siteData.title,
        text: 'I combine actuarial thinking with Python, SQL, Power BI, Advanced Excel, and automation to build reliable reporting and model workflows.',
        tags: ['Actuarial analytics', 'Automation', 'Decision support'],
      },
      {
        title: 'Actuarial World',
        text: 'Move through the map to explore portfolio zones, future apps, and technical strengths.',
        tags: ['Interactive portfolio', 'Technical city'],
      },
    ],
  },
  {
    id: 'skills-lab',
    name: 'Skills Lab',
    subtitle: 'Technical Lab',
    type: 'Technical Lab',
    position: { x: 420, y: 390 },
    size: { width: 240, height: 155 },
    collisionBox: { width: 205, height: 120 },
    buildingType: 'lab',
    asset: {
      building: 'skillsLabBuilding',
      display: { width: 326, height: 230 },
      offsetY: -10,
    },
    entrance: { x: 540, y: 430 },
    theme: 'blue',
    color: 0x60a5fa,
    icon: 'SL',
    summary:
      'A toolkit lab covering the practical stack behind actuarial automation and reporting work.',
    contentSections: [
      {
        title: 'Core Stack',
        text: 'Python, SQL, Power BI, Advanced Excel, Actuarial Valuation, and Automation.',
        tags: ['Python', 'SQL', 'Power BI', 'Excel'],
      },
      {
        title: 'Workflow Strengths',
        text: 'Model conversion, reporting pipelines, dashboard design, validation checks, and repeatable business summaries.',
        tags: ['Pandas', 'Power Query', 'Reporting controls'],
      },
    ],
  },
  {
    id: 'automation-factory',
    name: 'Automation Factory',
    subtitle: 'Workflow System',
    type: 'Workflow System',
    position: { x: 1230, y: 390 },
    size: { width: 270, height: 165 },
    collisionBox: { width: 225, height: 128 },
    buildingType: 'factory',
    asset: {
      building: 'automationFactoryBuilding',
      display: { width: 360, height: 246 },
      offsetY: -10,
    },
    entrance: { x: 1110, y: 455 },
    theme: 'green',
    color: 0x22c55e,
    icon: 'AF',
    summary:
      'A factory zone for recurring reports, scheduled workflows, styled outputs, and dashboard-ready data.',
    contentSections: [
      {
        title: 'Reporting Pipeline',
        text: 'SQL extracts flow into Python validation and transformation, then into Excel, email, and Power BI outputs.',
        tags: ['SQL', 'Python', 'Excel', 'Power BI'],
      },
      {
        title: 'Automation Pattern',
        text: 'Reduce manual touchpoints while keeping checks, review points, and repeatability visible.',
        tags: ['Scheduling', 'Validation', 'Controls'],
      },
    ],
  },
  {
    id: 'valuation-tower',
    name: 'Valuation Tower',
    subtitle: 'Model Control',
    type: 'Model Control',
    position: { x: 1480, y: 760 },
    size: { width: 220, height: 245 },
    collisionBox: { width: 164, height: 210 },
    buildingType: 'tower',
    asset: {
      building: 'valuationTowerBuilding',
      display: { width: 270, height: 336 },
      offsetY: -20,
    },
    entrance: { x: 1390, y: 830 },
    theme: 'indigo',
    color: 0x818cf8,
    icon: 'VT',
    summary:
      'A model tower for cashflows, assumptions, reserves, valuation outputs, and solvency-oriented thinking.',
    contentSections: [
      {
        title: 'Valuation Models',
        text: 'Cashflow projections, assumptions, reserve summaries, model checks, and controlled reporting structures.',
        tags: ['Cashflows', 'Assumptions', 'Reserves'],
      },
      {
        title: 'RBC / Solvency',
        text: 'Structured analytics for solvency drivers, capital views, and actuarial review.',
        tags: ['RBC', 'Solvency', 'Capital'],
      },
    ],
  },
  {
    id: 'dashboard-control-room',
    name: 'Dashboard Studio',
    subtitle: 'Analytics HUD',
    type: 'Analytics HUD',
    position: { x: 950, y: 900 },
    size: { width: 290, height: 165 },
    collisionBox: { width: 242, height: 126 },
    buildingType: 'studio',
    asset: {
      building: 'dashboardStudioBuilding',
      display: { width: 378, height: 246 },
      offsetY: -8,
    },
    entrance: { x: 950, y: 805 },
    theme: 'violet',
    color: 0xa78bfa,
    icon: 'DS',
    summary:
      'A reporting control room for KPI dashboards, analytics views, and decision-ready visual reporting.',
    contentSections: [
      {
        title: 'KPI Monitoring',
        text: 'Readable dashboard layers for management reporting, actuarial summaries, and business performance views.',
        tags: ['Dashboards', 'KPI design', 'Power BI'],
      },
      {
        title: 'Visual Reporting',
        text: 'Charts and summary panels designed to reduce noise and make trends easier to compare.',
        tags: ['Data visualization', 'Reporting'],
      },
    ],
  },
  {
    id: 'rag-library',
    name: 'RAG Library',
    subtitle: 'AI Research',
    type: 'AI Research',
    position: { x: 350, y: 820 },
    size: { width: 245, height: 160 },
    collisionBox: { width: 206, height: 124 },
    buildingType: 'library',
    asset: {
      building: 'ragLibraryBuilding',
      display: { width: 334, height: 238 },
      offsetY: -10,
    },
    entrance: { x: 470, y: 785 },
    theme: 'pink',
    color: 0xf472b6,
    icon: 'RL',
    summary:
      'A research library for document Q&A concepts, embeddings, vector search, and AI-assisted retrieval workflows.',
    contentSections: [
      {
        title: 'Document Q&A',
        text: 'Parse policy or product documents, retrieve relevant passages, and assemble grounded responses.',
        tags: ['RAG', 'Embeddings', 'Vector search'],
      },
      {
        title: 'AI Assistant Direction',
        text: 'Future standalone demos will use synthetic or public documents, not confidential materials.',
        tags: ['Document AI', 'Source context'],
      },
    ],
  },
  {
    id: 'project-hub',
    name: 'Project Hub',
    subtitle: 'App Roadmap',
    type: 'App Roadmap',
    position: { x: 735, y: 575 },
    size: { width: 300, height: 180 },
    collisionBox: { width: 260, height: 145 },
    buildingType: 'hub',
    asset: {
      building: 'projectHubBuilding',
      display: { width: 388, height: 272 },
    },
    entrance: { x: 735, y: 690 },
    theme: 'amber',
    color: 0xfbbf24,
    icon: 'PH',
    summary:
      'The central project node for focused actuarial and technical apps planned as separate deployable tools.',
    contentSections: portfolioProjects.map((project) => ({
      title: project.title,
      text: project.summary,
      tags: [project.status, project.category, ...project.tools.slice(0, 2)],
    })),
  },
  {
    id: 'contact-portal',
    name: 'Contact Office',
    subtitle: 'Comms Node',
    type: 'Comms Node',
    position: { x: 1325, y: 170 },
    size: { width: 225, height: 130 },
    collisionBox: { width: 184, height: 102 },
    buildingType: 'office',
    asset: {
      building: 'contactOfficeBuilding',
      display: { width: 292, height: 202 },
      offsetY: -8,
    },
    entrance: { x: 1250, y: 235 },
    theme: 'slate',
    color: 0xcbd5e1,
    icon: 'CO',
    summary:
      'A communication portal for contacting Sanjaya and returning to the main professional portfolio.',
    contentSections: [
      {
        title: 'Email',
        text: siteData.email,
        tags: ['Contact'],
      },
      {
        title: 'LinkedIn',
        text: siteData.linkedin,
        tags: ['Professional profile'],
      },
      {
        title: 'Portfolio',
        text: siteData.domain,
        tags: ['Default Mode', 'Projects'],
      },
    ],
  },
]
