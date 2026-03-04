export default function ClientTable({ title }: { title: string }) {
  return (
    <div>
      <table className="table bg-base-200 my-4">
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
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
