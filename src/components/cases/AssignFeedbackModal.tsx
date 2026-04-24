import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { assignFeedbackMutationOptions, caseQueryOptions } from "#/queries/cases";
import { feedbacksQueryOptions } from "#/queries/feedbacks";

export function AssignFeedbackModal(props: {
  ref: Ref<HTMLDialogElement>;
  level_id: number;
  case_id: number;
  section_id: number;
}) {
  const queryClient = useQueryClient();

  const allFeedbacksQuery = useSuspenseQuery(feedbacksQueryOptions);
  const assignFeedbacksMutation = useMutation(assignFeedbackMutationOptions);

  const [selectedFeedbacks, setSelectedFeedbacks] = useState<number[]>([]);

  function toggleFeedback(Feedback: number) {
    if (selectedFeedbacks.includes(Feedback)) {
      const newValue = selectedFeedbacks.filter((f) => f !== Feedback);
      setSelectedFeedbacks(newValue);
    } else {
      const newValue = [...selectedFeedbacks, Feedback];
      setSelectedFeedbacks(newValue);
    }
  }

  async function AssignFeedbacks() {
    await assignFeedbacksMutation.mutateAsync({
      feedbacks: selectedFeedbacks,
      case_id: props.case_id,
      level_id: props.level_id,
      section_id: props.section_id,
    });
    await queryClient.invalidateQueries(caseQueryOptions(props.case_id));
    props.ref.current.close();
  }
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
