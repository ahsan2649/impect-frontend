import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/client/$clientId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { clientId } = Route.useParams();

  return <div>Hello {`/client/${clientId}`}!</div>;
}
