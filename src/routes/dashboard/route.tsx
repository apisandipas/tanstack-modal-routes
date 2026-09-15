import { Outlet, createFileRoute } from "@tanstack/react-router";
import { colors, itemsQueryOptions, type Filters } from "@/data";
import { FilterSidebar } from "@/components/filter-sidebar";
import { MasonryGrid } from "@/components/masonry";

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>): Filters => ({
    color: colors.find((c) => c === search.color),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    context.queryClient.query(itemsQueryOptions(deps)),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-dvh grid-cols-[200px_1fr] gap-8 p-8">
      <FilterSidebar />
      <main>
        <MasonryGrid />
        <Outlet />
      </main>
    </div>
  );
}
