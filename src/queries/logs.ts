import { queryOptions } from "@tanstack/react-query";
import { api } from ".";

export const logsQueryOptions = queryOptions({
  queryKey: ["logs"],
  queryFn: async () => {
    const data = await api.get("logs").json();
    return data;
  },
  select: (data) => data as Log[],
});
