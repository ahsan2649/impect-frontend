import { queryOptions } from "@tanstack/react-query";
import ky from "ky";

export const api = ky.create({ prefixUrl: import.meta.env.VITE_BACKEND_URL });

export const casesQueryOptions = queryOptions({
  queryKey: ["cases"],
  queryFn: async () => {
    const data = await api.get("cases").json();
    return data;
  },
  initialData: [],
});

export const clientsQueryOptions = queryOptions({
  queryKey: ["clients"],
  queryFn: async () => {
    const data = await api.get("clients").json();
    return data;
  },
  initialData: [],
});

export const feedbacksQueryOptions = queryOptions({
  queryKey: ["feedbacks"],
  queryFn: async () => {
    const data = await api.get("feedbacks").json();
    return data;
  },
  initialData: [],
});

export const feedbackTypesQueryOptions = queryOptions({
  queryKey: ["feedback-types"],
  queryFn: async () => {
    const data = await api.get("feedback-types").json();
    return data;
  },
});

export const logsQueryOptions = queryOptions({
  queryKey: ["logs"],
  queryFn: async () => {
    const data = await api.get("logs").json();
    return data;
  },
  initialData: [],
});
export const caseQueryOptions = (caseId: string) => {
  return {
    queryKey: ["case", caseId],
    queryFn: async () => {
      const data = await ky
        .get(`http://localhost:8080/api/case/${caseId}`)
        .json();
      return data;
    },
  };
};
