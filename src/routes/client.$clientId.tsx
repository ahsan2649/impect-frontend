import { clientQueryOptions } from "#/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/client/$clientId")({
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(clientQueryOptions(params.clientId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { clientId } = Route.useParams();

  const clientQuery = useSuspenseQuery(clientQueryOptions(clientId));

  return (
    <>
      <h2>{clientQuery.data.case.name}</h2>
      <pre>{JSON.stringify(clientQuery.data, undefined, 2)}</pre>
    </>
  );
}
