import {
  Building2,
  Package,
  Factory,
  Truck,
  Trash2,
  Bus,
  Car,
  Box,
  TrendingDown,
  Wrench,
  Recycle,
  Home,
  Search,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Category metadata combining icons and colors
export const categoryMetadata: Record<
  number,
  {
    icon: LucideIcon
    color: string
    name: string
    description: string
  }
> = {
  // Upstream categories (1-8)
  1: {
    icon: Package,
    color: 'var(--blue-2)',
    name: 'Inköpta varor och tjänster',
    description:
      'Utsläpp från produktion av varor och tjänster som köps av organisationen.',
  },
  2: {
    icon: Building2,
    color: 'var(--orange-2)',
    name: 'Kapitalvaror',
    description:
      'Utsläpp från produktion av kapitalvaror som köps av organisationen.',
  },
  3: {
    icon: Factory,
    color: 'var(--pink-2)',
    name: 'Bränsle- och energirelaterade aktiviteter',
    description:
      'Utsläpp från produktion av bränslen och energi som köps av organisationen, inklusive transport och distribution, som inte inkluderas i scope 2.',
  },
  4: {
    icon: Truck,
    color: 'var(--green-4)',
    name: 'Uppströms transport och distribution',
    description:
      'Utsläpp från transport och distribution av inköpta varor mellan leverantörer och/eller inom organisationen.',
  },
  5: {
    icon: Trash2,
    color: 'var(--blue-3)',
    name: 'Avfall genererat i verksamheten',
    description:
      'Utsläpp från behandling av avfall som genereras av organisationen.',
  },
  6: {
    icon: Bus,
    color: 'var(--orange-3)',
    name: 'Tjänsteresor',
    description:
      'Utsläpp från resor i tjänsten med fordon som inte ägs av organisationen.',
  },
  7: {
    icon: Car,
    color: 'var(--pink-3)',
    name: 'Pendlingsresor',
    description:
      'Utsläpp från anställdas resor mellan hemmet och arbetsplatsen.',
  },
  8: {
    icon: Box,
    color: 'var(--green-3)',
    name: 'Uppströms leasade tillgångar',
    description:
      'Utsläpp från verksamhet i leasade tillgångar som inte inkluderas i scope 1 och 2.',
  },

  // Downstream categories (9-15)
  9: {
    icon: TrendingDown,
    color: 'var(--blue-4)',
    name: 'Nedströms transport och distribution',
    description:
      'Utsläpp från transport och distribution av sålda varor mellan organisationen och kund.',
  },
  10: {
    icon: Wrench,
    color: 'var(--orange-4)',
    name: 'Bearbetning av sålda produkter',
    description: 'Utsläpp från vidareförädling av sålda insatsvaror.',
  },
  11: {
    icon: Factory,
    color: 'var(--green-2)',
    name: 'Användning av sålda produkter',
    description: 'Utsläpp från användning av sålda produkter av kunden.',
  },
  12: {
    icon: Recycle,
    color: 'var(--pink-4)',
    name: 'Slutbehandling av sålda produkter',
    description:
      'Utsläpp från avfallshantering av sålda produkter vid slutet av livscykeln.',
  },
  13: {
    icon: Home,
    color: 'var(--blue-1)',
    name: 'Nedströms leasade tillgångar',
    description:
      'Utsläpp från verksamhet i nedströms leasade tillgångar som inte inkluderas i scope 1 och 2.',
  },
  14: {
    icon: Building2,
    color: 'var(--orange-1)',
    name: 'Franchiser',
    description:
      'Utsläpp från franchisetagares verksamhet som inte inkluderas i scope 1 och 2.',
  },
  15: {
    icon: Search,
    color: 'var(--pink-1)',
    name: 'Investeringar',
    description:
      'Utsläpp från organisationens investeringar i andra företag, samt andra finansierade utsläpp.',
  },
}

// Helper functions to get specific properties
export const getCategoryIcon = (id: number): LucideIcon => {
  return categoryMetadata[id]?.icon || Package
}

export const getCategoryColor = (id: number): string => {
  return categoryMetadata[id]?.color || 'var(--blue-2)'
}

export const getCategoryName = (id: number): string => {
  return categoryMetadata[id]?.name || `Kategori ${id}`
}

export const getCategoryDescription = (id: number): string => {
  return categoryMetadata[id]?.description || ''
}

// Get background and text colors for filter tags
export const getCategoryFilterColors = (category: number) => {
  const color = getCategoryColor(category)
    .replace('var(--', '')
    .replace(')', '')
  const [palette, shade] = color.split('-')
  return {
    bg: `bg-${palette}-5/30`,
    text: `text-${palette}-${shade}`,
  }
}

// Upstream and downstream category IDs for grouping
export const upstreamCategories = [1, 2, 3, 4, 5, 6, 7, 8]
export const downstreamCategories = [9, 10, 11, 12, 13, 14, 15]
