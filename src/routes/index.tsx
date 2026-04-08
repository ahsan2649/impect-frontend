import { casesQueryOptions, clientsQueryOptions } from "#/queries";
import ConnectedClients from "#/components/home/ConnectedClients";
import PendingClients from "#/components/home/PendingClients";
import UserGreeting from "#/components/home/UserGreeting";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// TODO: Add Logo

export const Route = createFileRoute("/")({
  component: HomeView,
});

function HomeView() {
  const casesQuery = useQuery(casesQueryOptions);
  const clientsQuery = useQuery(clientsQueryOptions);

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
