import ClientTable from "../app/ClientTable";

export default function CaseOverview(props: { case: Case }) {
  return (
    <div className="bg-base-300 p-4 rounded my-2">
      <div className="text-xl">{props.case.name}</div>
      <div className="py-2">{props.case.description}</div>
      <div className="text-lg">Levels</div>
      <a role="button" href={"/case/" + props.case.id} className="btn">
        Manage Levels and Sections
      </a>
      <ClientTable title="Connected Clients" clients={props.case.clients!} />
    </div>
  );
}
