import ClientTable from "../app/ClientTable";

export default function PendingClients() {
  return (
    <div className="py-2">
      <h3 className="text-lg">Connected Clients</h3>
      <ClientTable title="Sports Case" />
      <ClientTable title="Robot Case" />
      <ClientTable title="Dancing Case" />
    </div>
  );
}
