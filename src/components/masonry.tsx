import { useSuspenseQuery } from '@tanstack/react-query'
import { ClientOnly, useSearch } from '@tanstack/react-router'
import { Masonry } from 'masonic'
import { itemsQueryOptions } from '@/data'
import { MasonryCard } from './masonry-card'

const Skeleton = ({ count }: { count: number }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="animate-pulse rounded-xl bg-card"
        style={{ height: 120 + ((i * 53) % 160) }}
      />
    ))}
  </div>
)

export function MasonryGrid() {
  const search = useSearch({ from: '/dashboard' })
  const { data } = useSuspenseQuery(itemsQueryOptions(search))

  if (data.length === 0) {
    return <p className="p-24 text-center text-xl text-muted">No items.</p>
  }

  // masonic measures the DOM, so it cannot run on the server. The key throws the
  // old layout away when the filters change.
  return (
    <ClientOnly fallback={<Skeleton count={Math.min(data.length, 12)} />}>
      <Masonry
        key={JSON.stringify(search)}
        items={data}
        itemKey={(d) => d.id}
        render={MasonryCard}
        columnGutter={16}
      />
    </ClientOnly>
  )
}
