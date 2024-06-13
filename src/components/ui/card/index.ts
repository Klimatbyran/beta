import { tv, type VariantProps } from 'tailwind-variants'
import type { HTMLAttributes } from 'svelte/elements'

import Root from './card.svelte'
import Content from './card-content.svelte'
import Description from './card-description.svelte'
import Footer from './card-footer.svelte'
import Header from './card-header.svelte'
import Title from './card-title.svelte'

const cardVariants = tv({
  base: 'text-card-foreground',
  variants: {
    level: {
      1: 'rounded-xl lg:rounded-3xl bg-gray-750 p-4 pt-8 md:p-8 lg:p-12',
      2: 'rounded-lg lg:rounded-2xl bg-gray-700 p-4 pt-8 lg:p-8',
    },
  },
  defaultVariants: {
    level: 1,
  },
})

type Level = VariantProps<typeof cardVariants>['level']

type Props = HTMLAttributes<HTMLDivElement> & {
  level?: Level
}

export {
  Root,
  type Props,
  Content,
  Description,
  Footer,
  Header,
  Title,
  //
  Root as Card,
  type Props as CardProps,
  Content as CardContent,
  Description as CardDescription,
  Footer as CardFooter,
  Header as CardHeader,
  Title as CardTitle,
  cardVariants,
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
