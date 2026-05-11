export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press Media',
    route: '/press-releases',
    description: 'Latest media releases and company announcements.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
  {
    key: 'article',
    label: 'News',
    route: '/news',
    description: 'Industry news and editorial content.',
    contentType: 'article',
    enabled: true,
  },
  {
    key: 'listing',
    label: 'Directory',
    route: '/directory',
    description: 'Business directory and professional services.',
    contentType: 'listing',
    enabled: true,
  },
  {
    key: 'profile',
    label: 'About',
    route: '/about',
    description: 'Company profiles and team information.',
    contentType: 'profile',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/press-releases',
  article: '/news',
  listing: '/directory',
  profile: '/about',
} as const
