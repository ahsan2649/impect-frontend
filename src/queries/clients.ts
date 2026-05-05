import { queryOptions } from "@tanstack/react-query";
import { api } from ".";

export const clientsQueryOptions = queryOptions({
  queryKey: ["clients"],
  queryFn: async () => {
    const data = await api.get("connected-clients").json();
    return data;
  },
});

export const clientQueryOptions = (clientId: string) => {
  return queryOptions({
    queryKey: ["clients"],
    queryFn: async () => {
      const data = await api.get(`clients/${clientId}`).json();
      return data;
    },
    select: (data) => data as Client,
  });
};
