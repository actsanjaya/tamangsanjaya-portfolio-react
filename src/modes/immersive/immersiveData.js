import scene01 from '../../assets/immersive/scene-01-identity.webp'
import scene02 from '../../assets/immersive/scene-02-data-stack.webp'
import scene03 from '../../assets/immersive/scene-03-automation.webp'
import scene04 from '../../assets/immersive/scene-04-valuation.webp'
import scene05 from '../../assets/immersive/scene-05-dashboard.webp'
import scene06 from '../../assets/immersive/scene-06-project-world.webp'
import scene07 from '../../assets/immersive/scene-07-final-cta.webp'

export const immersiveScenes = [
  {
    id: 'identity',
    number: '01',
    background: scene01,
    headline: 'Technical Actuarial Analyst',
    supporting: 'Actuarial thinking. Technical execution.',
    textTone: 'dark',
  },
  {
    id: 'data-stack',
    number: '02',
    background: scene02,
    headline: 'Data becomes direction.',
    supporting:
      'Python, SQL, Power BI, Advanced Excel, and model-driven workflows.',
    textTone: 'dark',
  },
  {
    id: 'automation',
    number: '03',
    background: scene03,
    headline: 'From manual work to repeatable systems.',
    supporting:
      'Reporting pipelines built for accuracy, efficiency, and scale.',
    textTone: 'dark',
  },
  {
    id: 'valuation',
    number: '04',
    background: scene04,
    headline: 'Valuation, cashflows, assumptions.',
    supporting: 'Turning actuarial logic into working tools.',
    textTone: 'dark',
  },
  {
    id: 'dashboard',
    number: '05',
    background: scene05,
    headline: 'Dashboards that speak.',
    supporting: 'KPIs, analytics, and decision-ready reporting.',
    textTone: 'dark',
  },
  {
    id: 'project-world',
    number: '06',
    background: scene06,
    headline: "Apps I'm building.",
    supporting:
      'Mark-to-model, valuation, reporting automation, RAG, and dashboards.',
    textTone: 'dark',
  },
  {
    id: 'final-cta',
    number: '07',
    background: scene07,
    headline: 'Explore the portfolio.',
    supporting: 'tamangsanjaya.com.np',
    textTone: 'dark',
    actions: [
      {
        label: 'Return to Default Mode',
        to: '/default',
        variant: 'primary',
      },
      {
        label: 'View Projects',
        to: '/default#projects',
        variant: 'secondary',
      },
      {
        label: 'Contact',
        to: '/default#contact',
        variant: 'secondary',
      },
    ],
  },
]
