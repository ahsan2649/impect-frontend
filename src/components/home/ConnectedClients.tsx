import ClientTable from "../app/ClientTable";

export default function ConnectedClients({ cases }: { cases: Case[] }) {
  return (
    <div className="py-2">
      <h3 className="text-lg">Connected Clients</h3>
      {cases.map((c) => (
        <ClientTable key={c.id} title={c.name} clients={c.clients!} />
      ))}
    </div>
  );
}
