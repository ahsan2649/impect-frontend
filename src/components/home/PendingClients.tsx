export default function PendingClients({ clients }: { clients: Client[] }) {
  return (
    <div className="py-2">
      <h3 className="text-lg">Pending Clients</h3>
      <table className="table w-min bg-base-200 my-4">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Port</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {clients?.length ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.port}</td>
                <td>{client.ipaddress}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
