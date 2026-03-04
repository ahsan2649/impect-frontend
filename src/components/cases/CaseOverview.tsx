import ClientTable from "../app/ClientTable";

export default function CaseOverview({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-base-300 p-4 rounded my-2">
      <div className="text-xl">{title}</div>
      <div className="py-2">{description}</div>
      <div className="text-lg">Levels</div>
      <button className="btn">Assign Feedbacks</button>
      <ClientTable title="Connected Clients" />
    </div>
  );
}
