import { Link } from '@tanstack/react-router'
import { swatch, type Item } from '@/data'

// search={(prev) => prev} carries the filters along, so the grid behind the
// dialog does not change under you.
export const MasonryCard = ({ data }: { data: Item }) => (
  <Link to="/dashboard/$itemId" params={{ itemId: data.id }} search={(prev) => prev}>
    <div className="overflow-hidden rounded-xl border border-border bg-card p-3 transition hover:border-muted hover:scale-[1.02]">
      <div
        className="rounded-lg"
        style={{ backgroundColor: swatch[data.color], height: data.height }}
      />
      <div className="pt-3 text-sm text-muted">{data.name}</div>
    </div>
  </Link>
)
