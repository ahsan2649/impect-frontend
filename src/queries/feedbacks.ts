import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { api } from ".";

export const feedbackTypesQueryOptions = queryOptions({
  queryKey: ["feedback_types"],
  queryFn: async () => {
    const data = await api.get("feedback_types").json();
    return data;
  },
  select: (data) => data as FeedbackType[],
});

export const feedbackLevelsQueryOptions = queryOptions({
  queryKey: ["feedback_levels"],
  queryFn: async () => {
    const data = await api.get("feedback_levels").json();
    return data;
  },
  select: (data) => data as FeedbackLevel[],
});

export const feedbacksQueryOptions = queryOptions({
  queryKey: ["feedbacks"],
  queryFn: async () => {
    const data = await api.get("feedbacks").json();
    return data;
  },
  select: (data) => data as Feedback[],
});

export const addFeedbackMutationOptions = mutationOptions({
  mutationFn: (data: { value: string; description: string; level: number; feedbackType: number }) =>
    api.post("feedbacks", {
      json: {
        value: data.value,
        description: data.description,
        feedbackimpect: data.level,
        feedbacktype: data.feedbackType,
      },
    }),
});
