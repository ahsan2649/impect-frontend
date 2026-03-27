export default function ClientTable({
  title,
  clients,
}: {
  title: string;
  clients: [];
}) {
  return (
    <div>
      <table className="table table-zebra my-4">
        <thead>
          <tr>
            <th colSpan={4}>{title}</th>
          </tr>
          <tr>
            <th>Client ID</th>
            <th>Port</th>
            <th>IP Address</th>
            <th>Connected At</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length ? (
            clients.map((client) => (
              <tr key={client["id"]}>
                <td>{client["id"]}</td>
                <td>{client["port"]}</td>
                <td>{client["ipaddress"]}</td>
                <td>{client["connected_at"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>-</td>
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
