import {
  addFeedbackMutationOptions,
  feedbacksQueryOptions,
  feedbackTypesQueryOptions,
} from "#/queries";
import FeedbacksFilter from "#/components/feedbacks/FeedbacksFilter";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import AddFeedbackModal from "#/components/feedbacks/AddFeedbackModal";
import { FeedbackCard } from "../components/feedbacks/FeedbackCard";
import { LucidePlus } from "lucide-react";
import { FloatingActionButton } from "#/components/Core/FloatingActionButton";

export const Route = createFileRoute("/feedbacks")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(feedbacksQueryOptions);
    context.queryClient.ensureQueryData(feedbackTypesQueryOptions);
  },
  component: FeedbacksView,
});

function FeedbacksView() {
  // Queries
  const allFeedbacksQuery = useSuspenseQuery(feedbacksQueryOptions);
  const feedbackTypesQuery = useSuspenseQuery(feedbackTypesQueryOptions);

  // Refs
  const addFeedbackModalRef = useRef<HTMLDialogElement>(null);

  // States
  const [filteredFeedbackTypes, setFilteredFeedbackTypes] = useState<string[]>([]);

  // Memos
  const filteredFeedbacks = useMemo(
    () =>
      (allFeedbacksQuery.data as []).filter((f) =>
        filteredFeedbackTypes.includes(feedbackTypesQuery.data.find((t) => t.id == f.feedbacktype)),
      ),
    [feedbackTypesQuery],
  );

  // Effects
  useEffect(() => {
    if (feedbackTypesQuery.isSuccess) {
      setFilteredFeedbackTypes(() => feedbackTypesQuery.data as []);
    }
  }, [feedbackTypesQuery.isSuccess]);

  return (
    <>
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
            feedbacktype={feedbackTypesQuery.data.find((t) => t.id == f["feedbacktype"]).name}
          />
        ))}
      </div>

      {/* Modals */}
      <AddFeedbackModal ref={addFeedbackModalRef} />

      {/* FloatingActionButton */}
      <FloatingActionButton
        dataTip="Add Feedback"
        buttonAction={() => addFeedbackModalRef.current?.showModal()}
      >
        <LucidePlus />
      </FloatingActionButton>
    </>
  );
}
