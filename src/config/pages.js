import { lazy } from 'react'
import { PortfolioPage } from '../pages/portfolio/PortfolioPage.jsx'

const ModelLabPage = lazy(() =>
  import('../pages/model-lab/ModelLabPage.jsx').then((module) => ({
    default: module.ModelLabPage,
  })),
)

/**
 * Every route the site serves. `App.jsx` matches on `path` first, then
 * `aliases`, and falls back to the entry flagged `isFallback`.
 *
 * `navLabel` is what appears in the navbar. Portfolio sections are anchors on
 * the portfolio page; the Model Lab is a real route so it can be code-split.
 */
export const pages = [
  {
    id: 'portfolio',
    path: '/',
    aliases: ['/default'],
    title: 'Sanjaya Tamang | Technical Actuarial Analyst',
    component: PortfolioPage,
    isFallback: true,
  },
  {
    id: 'model-lab',
    path: '/model',
    aliases: ['/models', '/model-lab'],
    title: 'Model Lab | Sanjaya Tamang',
    component: ModelLabPage,
  },
]

/**
 * Navbar entries. `href` may be an anchor on the portfolio page or a route.
 * Contact is not here on purpose — it is the button on the right of the navbar.
 */
export const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Model', href: '/model', isRoute: true },
  { label: 'Experience', href: '/#experience' },
]
