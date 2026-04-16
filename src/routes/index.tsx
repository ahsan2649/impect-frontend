import { casesQueryOptions, clientsQueryOptions } from "#/queries";
import ConnectedClients from "#/components/home/ConnectedClients";
import PendingClients from "#/components/home/PendingClients";
import UserGreeting from "#/components/home/UserGreeting";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// TODO: Add Logo

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(clientsQueryOptions);
    context.queryClient.ensureQueryData(casesQueryOptions);
  },
  component: HomeView,
});

function HomeView() {
  const casesQuery = useSuspenseQuery(casesQueryOptions);
  const clientsQuery = useSuspenseQuery(clientsQueryOptions);

  return (
    <>
      <UserGreeting />
      <PendingClients />
      <ConnectedClients
        cases={casesQuery.data as []}
        clients={clientsQuery.data as []}
      />
    </>
  );
}
