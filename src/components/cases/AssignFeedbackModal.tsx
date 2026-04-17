import type { Ref } from "react";
import { Dialog } from "../Core/Dialog";

export function AssignFeedbackModal(props: {
  ref: Ref<HTMLDialogElement>;
  levelId: number;
  caseId: number;
  sectionId: number;
}) {
  const AssignFeedbacks = () => {};
  return (
    <Dialog
      ref={props.ref}
      title="Assign Feedback To Section"
      actionLabel="Assign"
      buttonAction={AssignFeedbacks}
    >
      <></>
    </Dialog>
  );
}
