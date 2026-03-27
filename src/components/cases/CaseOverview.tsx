import ClientTable from "../app/ClientTable";

export default function CaseOverview({
  title,
  description,
  clients,
  id,
}: {
  title: string;
  description: string;
  clients: [];
  id: string;
}) {
  return (
    <div className="bg-base-300 p-4 rounded my-2">
      <div className="text-xl">{title}</div>
      <div className="py-2">{description}</div>
      <div className="text-lg">Levels</div>
      <a role="button" href={"/case/" + id} className="btn">
        Manage Levels and Sections
      </a>
      <ClientTable title="Connected Clients" clients={clients} />
    </div>
  );
}
