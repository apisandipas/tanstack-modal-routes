# Modal as a child route

A small TanStack Start app that shows one routing pattern: a detail dialog
rendered as a child route of the page it covers, so the dialog has its own
URL and the page underneath never unmounts.

Companion to the post "Giving a Modal Its Own URL in TanStack Router."

## Run it

```sh
npm install
npm run dev
```

Open <http://localhost:3000/dashboard>, click a card, then try a cold load
of <http://localhost:3000/dashboard/item-3?color=slate>. The dialog opens
over the filtered grid. Escape, a backdrop click, or the back button
closes it.

## Where to look

```
src/routes/dashboard/
  route.tsx        layout: filter from search params, loader, sidebar, grid, <Outlet />
  index.tsx        matches /dashboard, renders nothing
  $itemId.tsx      matches /dashboard/:id, renders the dialog into the outlet
src/components/
  masonry.tsx      reads the filter with useSearch, renders masonic inside ClientOnly
  masonry-card.tsx a Link to the child route that carries the search params along
  dialog.tsx       native <dialog>, showModal() on mount, close event navigates back
  filter-sidebar.tsx
src/data.ts        24 static items and the two queryOptions
```

## The pattern in three lines

- The grid is a layout route with an `<Outlet />`. The detail is its child,
  so navigating to it keeps the grid mounted.
- The index route renders `null`, so `/dashboard` matches and the outlet is
  empty.
- The dialog has no open state. Closing it is a `navigate` back to the
  layout, which unmounts the child.

## Stack

TanStack Start, TanStack Router, TanStack Query, `masonic`, Tailwind v4.
Static data, no auth, no database.
