import { logsQueryOptions } from "#/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logs")({
  component: LogsView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(logsQueryOptions);
  },
});

function LogsView() {
  const allLogsQuery = useSuspenseQuery(logsQueryOptions);

  return (
    <div className="p-2">
      {(allLogsQuery.data as []).map((log) => (
        <p key={log["id"]}>{JSON.stringify(log)}</p>
      ))}
    </div>
  );
}
