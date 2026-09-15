import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { itemQueryOptions, swatch } from "@/data";
import { Dialog } from "@/components/dialog";

export const Route = createFileRoute("/dashboard/$itemId")({
  loader: ({ context, params }) =>
    context.queryClient.query(itemQueryOptions(params.itemId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: item } = useSuspenseQuery(itemQueryOptions(itemId));

  // search: (prev) => prev keeps the filters; replace keeps the modal out of history.
  const close = () =>
    navigate({ to: "/dashboard", search: (prev) => prev, replace: true });

  if (!item) return null;

  return (
    <Dialog onClose={close}>
      <div className="grid grid-cols-[10rem_1fr] gap-6">
        <div
          className="rounded-lg"
          style={{ backgroundColor: swatch[item.color], height: item.height }}
        />
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt className="text-muted">Name</dt>
          <dd>{item.name}</dd>
          <dt className="text-muted">Brand</dt>
          <dd>{item.brand}</dd>
          <dt className="text-muted">Color</dt>
          <dd className="capitalize">{item.color}</dd>
        </dl>
      </div>
    </Dialog>
  );
}
