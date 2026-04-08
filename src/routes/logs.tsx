import { api, logsQueryOptions } from "#/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logs")({
  component: LogsView,
});

function LogsView() {
  const allLogsQuery = useQuery(logsQueryOptions);

  return (
    <div className="p-2">
      {(allLogsQuery.data as []).map((log) => (
        <p key={log["id"]}>{JSON.stringify(log)}</p>
      ))}
    </div>
  );
}
