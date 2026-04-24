import CaseOverview from "#/components/cases/CaseOverview";
import { casesQueryOptions } from "#/queries/cases";
import { clientsQueryOptions } from "#/queries/clients";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cases")({
  component: CasesView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(casesQueryOptions);
  },
});

function CasesView() {
  // Queries
  const casesQuery = useSuspenseQuery(casesQueryOptions);

  return (
    <>
      {casesQuery.data.map((c) => (
        <CaseOverview key={c["id"]} case={c} />
      ))}
    </>
  );
}
