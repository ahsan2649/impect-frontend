import { mutationOptions, queryOptions } from "@tanstack/react-query";
import ky from "ky";

export const api = ky.create({ prefixUrl: import.meta.env.VITE_BACKEND_URL });

export const casesQueryOptions = queryOptions({
  queryKey: ["cases"],
  queryFn: async () => {
    const data = await api.get("cases").json();
    return data;
  },
});

export const clientsQueryOptions = queryOptions({
  queryKey: ["clients"],
  queryFn: async () => {
    const data = await api.get("clients").json();
    return data;
  },
});

export const feedbacksQueryOptions = queryOptions({
  queryKey: ["feedbacks"],
  queryFn: async () => {
    const data = await api.get("feedbacks").json();
    return data;
  },
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
});
export const caseQueryOptions = (caseId: string) => {
  return queryOptions({
    queryKey: ["case", caseId],
    queryFn: async () => {
      const data = await ky
        .get(`http://localhost:8080/api/case/${caseId}`)
        .json();
      return data;
    },
  });
};

export const clientQueryOptions = (clientId: string) => {
  return queryOptions({
    queryKey: ["client"],
    queryFn: async () => {
      const data = await api.get(`client/${clientId}`).json();
      return data;
    },
  });
};

export const addFeedbackMutationOptions = mutationOptions({
  mutationFn: (data: {
    value: string;
    description: string;
    level: number;
    feedbackType: number;
  }) =>
    api.post("feedbacks", {
      json: {
        value: data.value,
        description: data.description,
        feedbackimpect: data.level,
        feedbacktype: data.feedbackType,
      },
    }),
});

export const addLevelMutationOptions = mutationOptions({
  mutationFn: (data: { levelName: string; caseId: number }) =>
    api.post("level", {
      json: {
        caseId: data.caseId,
        levelName: data.levelName,
      },
    }),
});

export const addSectionMutationOptions = mutationOptions({
  mutationFn: (data: {
    sectionName: string;
    caseId: number;
    levelId: number;
  }) =>
    api.post("section", {
      json: {
        caseId: data.caseId,
        sectionName: data.sectionName,
        levelId: data.levelId,
      },
    }),
});
