import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import {
  assignFeedbackMutationOptions,
  feedbacksQueryOptions,
} from "#/queries";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export function AssignFeedbackModal(props: {
  ref: Ref<HTMLDialogElement>;
  levelId: number;
  caseId: number;
  sectionId: number;
}) {
  const allFeedbacksQuery = useSuspenseQuery(feedbacksQueryOptions);
  const assignFeedbacksMutation = useMutation(assignFeedbackMutationOptions);

  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);

  function toggleFeedback(Feedback: string) {
    if (selectedFeedbacks.includes(Feedback)) {
      const newValue = selectedFeedbacks.filter((f) => f !== Feedback);
      setSelectedFeedbacks(newValue);
    } else {
      const newValue = [...selectedFeedbacks, Feedback];
      setSelectedFeedbacks(newValue);
    }
  }

  const AssignFeedbacks = () => {
    assignFeedbacksMutation.mutate({
      feedbacks: selectedFeedbacks.map((f) => parseInt(f)),
      caseId: props.caseId,
      levelId: props.levelId,
      sectionId: props.sectionId,
    });
  };
  return (
    <Dialog
      ref={props.ref}
      hasAction
      title="Assign Feedback To Section"
      actionLabel="Assign"
      buttonAction={AssignFeedbacks}
      widthClass="max-w-7xl max-h-2/3"
    >
      <div className="grid grid-cols-4 gap-4">
        {allFeedbacksQuery.data.map((f) => {
          return (
            <div className="card bg-base-100 shadow-sm" key={f.id}>
              <div className="card-body">
                <div className="card-title flex items-start justify-between text-wrap">
                  <span>{f.description}</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedFeedbacks.includes(f.id) ? true : false}
                    onChange={() => toggleFeedback(f.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Dialog>
  );
}
