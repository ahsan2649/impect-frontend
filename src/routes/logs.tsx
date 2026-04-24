import { logsQueryOptions } from "#/queries/logs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logs")({
  component: LogsView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(logsQueryOptions);
  },
});

function LogsView() {
  // Queries
  const allLogsQuery = useSuspenseQuery(logsQueryOptions);

  return (
    <div className="p-2">
      {allLogsQuery.data.map((log) => (
        <p key={log.id}>{JSON.stringify(log)}</p>
      ))}
    </div>
  );
}
