import ConnectedClients from "#/components/home/ConnectedClients";
import PendingClients from "#/components/home/PendingClients";
import UserGreeting from "#/components/home/UserGreeting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: HomeView });

function HomeView() {
  return (
    <>
      <UserGreeting />
      <PendingClients />
      <ConnectedClients />
    </>
  );
}
