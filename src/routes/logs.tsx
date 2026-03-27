import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";

export const Route = createFileRoute("/logs")({
  component: LogsView,
});

function LogsView() {
  const allLogsQuery = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const data = await ky.get("http://localhost:8080/api/logs").json();
      return data;
    },
    initialData: [],
  });

  return (
    <div className="p-2">
      {(allLogsQuery.data as []).map((log) => (
        <p>{JSON.stringify(log)}</p>
      ))}
    </div>
  );
}
