import FeedbacksFilter from "#/components/feedbacks/FeedbacksFilter";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feedbacks")({
  component: FeedbacksView,
});

function FeedbacksView() {
  return (
    <>
      <FeedbacksFilter />
    </>
  );
}
