import ClientTable from "../app/ClientTable";

export default function ConnectedClients({
  cases,
  clients,
}: {
  cases: [];
  clients: [];
}) {
  return (
    <div className="py-2">
      <h3 className="text-lg">Connected Clients</h3>
      {cases.map((c) => (
        <ClientTable
          key={c["id"]}
          title={c["name"]}
          clients={
            clients.filter(
              (client) => client["registered_case_id"] === c["id"],
            ) as []
          }
        />
      ))}
    </div>
  );
}
