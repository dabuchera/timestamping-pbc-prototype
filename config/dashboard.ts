import { DashboardConfig } from '@/types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Templates',
      href: '/dashboard/contract-templates',
      icon: 'templates',
    },
    {
      title: 'Datasets',
      href: '/dashboard/datasets',
      icon: 'datasets',
    },
    {
      title: 'Contracts',
      href: '/dashboard/performance-contracts',
      icon: 'contracts',
    },
    {
      title: 'Results',
      href: '/dashboard/results',
      icon: 'results',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
}
