import ConnectedClients from "#/components/home/ConnectedClients";
import PendingClients from "#/components/home/PendingClients";
import UserGreeting from "#/components/home/UserGreeting";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";

// TODO: Add Logo

export const Route = createFileRoute("/")({ component: HomeView });

function HomeView() {
  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const data = await ky.get("http://localhost:8080/api/cases").json();
      return data;
    },
    initialData: [],
  });

  const clientsQuery = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const data = await ky.get("http://localhost:8080/api/clients").json();
      return data;
    },
    initialData: [],
  });

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
