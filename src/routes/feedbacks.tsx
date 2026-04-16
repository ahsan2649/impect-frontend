import {
  addFeedbackMutationOptions,
  feedbacksQueryOptions,
  feedbackTypesQueryOptions,
} from "#/queries";
import FeedbacksFilter from "#/components/feedbacks/FeedbacksFilter";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  CircleAlert,
  CircleArrowDown,
  CircleArrowUp,
  CircleMinus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AddFeedbackModal from "#/components/feedbacks/AddFeedbackModal";
import { FeedbackCard } from "../components/feedbacks/FeedbackCard";

export const Route = createFileRoute("/feedbacks")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(feedbacksQueryOptions);
    context.queryClient.ensureQueryData(feedbackTypesQueryOptions);
  },
  component: FeedbacksView,
});

export function feedbackBadgeFromLevel(level: number) {
  switch (level) {
    case 0:
      return <CircleMinus size={24} />;
    case 1:
      return <CircleArrowUp size={24} />;
    case 2:
      return <CircleAlert size={24} />;
    case 3:
      return <CircleArrowDown size={24} />;
  }
}

function FeedbacksView() {
  const allFeedbacksQuery = useSuspenseQuery(feedbacksQueryOptions);
  const feedbackTypesQuery = useSuspenseQuery(feedbackTypesQueryOptions);
  const addFeedbackMutation = useMutation(addFeedbackMutationOptions);

  const [filteredFeedbackTypes, setFilteredFeedbackTypes] = useState<string[]>(
    [],
  );

  const filteredFeedbacks = useMemo(
    () =>
      (allFeedbacksQuery.data as []).filter((f) =>
        filteredFeedbackTypes.includes(
          feedbackTypesQuery.data.find((t) => t.id == f.feedbacktype),
        ),
      ),
    [feedbackTypesQuery],
  );

  useEffect(() => {
    if (feedbackTypesQuery.isSuccess) {
      setFilteredFeedbackTypes(() => feedbackTypesQuery.data as []);
    }
  }, [feedbackTypesQuery.isSuccess]);

  return (
    <>
      <AddFeedbackModal onSubmit={(data) => addFeedbackMutation.mutate(data)} />
      <FeedbacksFilter
        feedbackTypes={feedbackTypesQuery.data as []}
        setValues={setFilteredFeedbackTypes}
      />
      <div className="grid gap-4 rounded-sm grid-cols-4 lg:grid-cols-8">
        {filteredFeedbacks.map((f) => (
          <FeedbackCard
            key={f["id"]}
            description={f["description"]}
            value={f["value"]}
            level={f["feedbackimpect"]}
            feedbacktype={
              feedbackTypesQuery.data.find((t) => t.id == f["feedbacktype"])
                .name
            }
          />
        ))}
      </div>
    </>
  );
}
