import { Flame, Home, Info, Library, Music2 } from 'lucide-react'

export const PRIMARY_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Trending', href: '/trending', icon: Flame },
  { label: 'Music', href: '/trending?c=10', icon: Music2 },
  { label: 'Library', href: '/categories', icon: Library },
  { label: 'About', href: '/about', icon: Info },
] as const
