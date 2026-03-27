import CaseOverview from "#/components/cases/CaseOverview";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";

export const Route = createFileRoute("/cases")({
  component: CasesView,
});

function CasesView() {
  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const data = await ky.get("http://localhost:8080/api/cases").json();
      return data;
    },
    initialData: [],
  });

  const clientsQuery = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const data = await ky.get("http://localhost:8080/api/clients").json();
      return data;
    },
    initialData: [],
  });

  return (
    <>
      {(casesQuery.data as []).map((c) => (
        <CaseOverview
          key={c["id"]}
          id={c["id"]}
          title={c["name"]}
          description={c["description"]}
          clients={
            (clientsQuery.data as []).filter(
              (client) => c["id"] === client["registered_case_id"],
            ) as []
          }
        />
      ))}
    </>
  );
}
