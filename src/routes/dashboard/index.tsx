import { createFileRoute } from '@tanstack/react-router'

// Has to exist so /dashboard matches something. It renders nothing, so the
// layout's <Outlet /> is empty and you see the plain grid.
export const Route = createFileRoute('/dashboard/')({
  component: () => null,
})
