import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { api } from ".";

export const casesQueryOptions = queryOptions({
  queryKey: ["cases"],
  queryFn: async () => {
    const data = await api.get("cases").json();
    return data;
  },
  select: (data) => data as Case[],
});

export const caseQueryOptions = (case_id: number) => {
  return queryOptions({
    queryKey: ["cases", parseInt(case_id.toString())],
    queryFn: async () => {
      const data = await api.get(`cases/${case_id}`).json();
      return data;
    },
    select: (data) => data as Case,
  });
};

export const addLevelMutationOptions = mutationOptions({
  mutationFn: (data: CaseLevel) =>
    api.post("case_levels", {
      json: {
        case_id: data.case_id,
        name: data.name,
      },
    }),
});

export const deleteLevelMutationOptions = mutationOptions({
  mutationFn: (data: CaseLevel) =>
    api.delete("case_levels", {
      json: {
        level_id: data.id,
      },
    }),
});

export const addSectionMutationOptions = mutationOptions({
  mutationFn: (data: CaseLevelSection) =>
    api.post("case_level_sections", {
      json: {
        case_id: data.case_id,
        name: data.name,
        level_id: data.level_id,
      },
    }),
});

export const deleteSectionMutationOptions = mutationOptions({
  mutationFn: (data: CaseLevelSection) =>
    api.delete("case_level_sections", {
      json: {
        section_id: data.id,
      },
    }),
});

export const assignFeedbackMutationOptions = mutationOptions({
  mutationFn: (data: {
    feedbacks: number[];
    case_id: number;
    level_id: number;
    section_id: number;
  }) =>
    api.patch("case_level_sections", {
      json: {
        feedbacks: data.feedbacks,
        case_id: data.case_id,
        level_id: data.level_id,
        section_id: data.section_id,
      },
    }),
});
