import { casesQueryOptions, clientsQueryOptions } from "#/queries";
import CaseOverview from "#/components/cases/CaseOverview";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cases")({
  component: CasesView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(casesQueryOptions);
    context.queryClient.ensureQueryData(clientsQueryOptions);
  },
});

function CasesView() {
  // Queries
  const casesQuery = useSuspenseQuery(casesQueryOptions);
  const clientsQuery = useSuspenseQuery(clientsQueryOptions);

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
