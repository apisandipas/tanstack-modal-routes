import { queryOptions } from '@tanstack/react-query'

export type Item = {
  id: string
  name: string
  color: Color
  brand: string
  height: number
}

// Muted swatches so the grid reads calm on a dark ground.
export const swatch: Record<Color, string> = {
  rust: '#b5654f',
  slate: '#5f7f9c',
  moss: '#6e8f6a',
  ochre: '#c2a15a',
}

export const colors = ['rust', 'slate', 'moss', 'ochre'] as const
export type Color = (typeof colors)[number]

const brands = ['Acme', 'Globex', 'Initech']

// Static stand-in for a database. Heights vary so the masonry has something to do.
export const items: Item[] = Array.from({ length: 24 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`,
  color: colors[i % colors.length],
  brand: brands[(i * 7) % brands.length],
  height: 120 + ((i * 53) % 160),
}))

export type Filters = { color?: Color }

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const itemsQueryOptions = (filters: Filters) =>
  queryOptions({
    queryKey: ['items', filters],
    queryFn: async () => {
      await wait(150)
      return filters.color ? items.filter((i) => i.color === filters.color) : items
    },
  })

export const itemQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['item', id],
    queryFn: async () => {
      await wait(150)
      return items.find((i) => i.id === id) ?? null
    },
  })
