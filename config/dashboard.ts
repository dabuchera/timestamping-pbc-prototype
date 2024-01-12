import { DashboardConfig } from '@/types';

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
      title: 'Info',
      href: '/dashboard/info',
      icon: 'info',
    },
    {
      title: 'Datasets',
      href: '/dashboard/datasets',
      icon: 'datasets',
    },
    {
      title: 'Contracts',
      href: '/dashboard/contracts',
      icon: 'contracts',
    },
    {
      title: 'Results',
      href: '/dashboard/results',
      icon: 'results',
    },
    // {
    //   title: 'Settings',
    //   href: '/dashboard/settings',
    //   icon: 'settings',
    // },
  ],
}
