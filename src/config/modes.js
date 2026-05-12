import { DefaultMode } from '../modes/default/DefaultMode.jsx'
import { GestureMode } from '../modes/gesture/GestureMode.jsx'
import { GamingMode } from '../modes/gaming/GamingMode.jsx'
import { ImmersiveMode } from '../modes/immersive/ImmersiveMode.jsx'
import { ComingSoonMode } from '../modes/future/ComingSoonMode.jsx'

export const modes = [
  {
    id: 'default',
    name: 'Default',
    description: 'Professional portfolio for actuarial analytics and automation.',
    path: '/',
    aliases: ['/default'],
    status: 'stable',
    icon: '↗',
    component: DefaultMode,
    showInSwitcher: true,
  },
  {
    id: 'gesture',
    name: 'Gesture',
    description: 'Optional webcam-based navigation experiment.',
    path: '/gesture',
    status: 'beta',
    icon: '⌁',
    component: GestureMode,
    showInSwitcher: true,
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Explore portfolio zones through a lightweight game-like map.',
    path: '/gaming',
    status: 'beta',
    icon: '◆',
    component: GamingMode,
    showInSwitcher: true,
  },
  {
    id: 'immersive',
    name: 'Immersive Mode',
    description:
      'A cinematic scroll experience through actuarial automation, dashboards, valuation models, and future apps.',
    path: '/immersive',
    status: 'beta',
    icon: '*',
    component: ImmersiveMode,
    showInSwitcher: true,
  },
  {
    id: 'future',
    name: 'Future Lab',
    description: 'Reserved structure for new portfolio experiences.',
    path: '/future',
    status: 'coming soon',
    icon: '+',
    component: ComingSoonMode,
    showInSwitcher: false,
  },
]
