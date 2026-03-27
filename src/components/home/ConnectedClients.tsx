import ClientTable from "../app/ClientTable";

export default function ConnectedClients({
  cases,
  clients,
}: {
  cases: [];
  clients: [];
}) {
  const clientTables = cases.map((c) => {
    return (
      <ClientTable
        key={c["id"]}
        title={c["name"]}
        clients={
          clients.filter(
            (client) => client["registered_case_id"] === c["id"],
          ) as []
        }
      />
    );
  });

  return (
    <div className="py-2">
      <h3 className="text-lg">Connected Clients</h3>
      {clientTables}
    </div>
  );
}
