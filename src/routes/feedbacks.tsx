import FeedbacksFilter from "#/components/feedbacks/FeedbacksFilter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import AddFeedbackModal from "#/components/feedbacks/AddFeedbackModal";
import { FeedbackCard } from "../components/feedbacks/FeedbackCard";
import { LucidePlus } from "lucide-react";
import { FloatingActionButton } from "#/components/Core/FloatingActionButton";
import {
  feedbackLevelsQueryOptions,
  feedbacksQueryOptions,
  feedbackTypesQueryOptions,
} from "#/queries/feedbacks";

export const Route = createFileRoute("/feedbacks")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(feedbacksQueryOptions);
    context.queryClient.ensureQueryData(feedbackTypesQueryOptions);
    context.queryClient.ensureQueryData(feedbackLevelsQueryOptions);
  },
  component: FeedbacksView,
});

function FeedbacksView() {
  // Queries
  const allFeedbacksQuery = useSuspenseQuery(feedbacksQueryOptions);
  const feedbackTypesQuery = useSuspenseQuery(feedbackTypesQueryOptions);
  const feedbackLevelsQuery = useSuspenseQuery(feedbackLevelsQueryOptions);

  // Refs
  const addFeedbackModalRef = useRef<HTMLDialogElement>(null);

  // States
  const [filteredFeedbackTypes, setFilteredFeedbackTypes] = useState<FeedbackType[]>([]);
  const [filteredFeedbackLevels, setFilteredFeedbackLevels] = useState<FeedbackLevel[]>([]);

  // Memos
  const filteredFeedbacks = useMemo(
    () =>
      allFeedbacksQuery.data.filter(
        (f) =>
          filteredFeedbackTypes.map((t) => t.id).includes(f.feedback_type_id!) &&
          filteredFeedbackLevels.map((l) => l.id).includes(f.feedback_level_id!),
      ),
    [feedbackTypesQuery],
  );

  // Effects
  useEffect(() => {
    if (feedbackTypesQuery.isSuccess) {
      setFilteredFeedbackTypes(() => feedbackTypesQuery.data);
    }
  }, [feedbackTypesQuery.isSuccess]);

  useEffect(() => {
    if (feedbackLevelsQuery.isSuccess) {
      setFilteredFeedbackLevels(() => feedbackLevelsQuery.data);
    }
  }, [feedbackLevelsQuery.isSuccess]);

  return (
    <>
      <FeedbacksFilter
        feedbackTypes={feedbackTypesQuery.data}
        feedbackLevels={feedbackLevelsQuery.data}
        setTypes={setFilteredFeedbackTypes}
        setLevels={setFilteredFeedbackLevels}
      />
      <div className="grid gap-4 rounded-sm grid-cols-4 lg:grid-cols-8">
        {filteredFeedbacks.map((f) => (
          <FeedbackCard key={f.id} feedback={f} />
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
