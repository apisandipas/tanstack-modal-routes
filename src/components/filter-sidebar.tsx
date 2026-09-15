import { Link } from '@tanstack/react-router'
import { colors } from '@/data'

export function FilterSidebar() {
  return (
    <nav className="sticky top-8 flex flex-col gap-2 self-start">
      <Link
        to="/dashboard"
        search={{}}
        className="rounded-lg px-3 py-2 text-muted transition hover:bg-card hover:text-fg"
        activeProps={{ className: 'bg-card font-medium text-accent' }}
        activeOptions={{ includeSearch: true }}
      >
        All
      </Link>
      {colors.map((color) => (
        <Link
          key={color}
          to="/dashboard"
          search={{ color }}
          className="rounded-lg px-3 py-2 capitalize text-muted transition hover:bg-card hover:text-fg"
          activeProps={{ className: 'bg-card font-medium text-accent' }}
          activeOptions={{ includeSearch: true }}
        >
          {color}
        </Link>
      ))}
    </nav>
  )
}
