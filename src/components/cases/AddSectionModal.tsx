import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { useMutation } from "@tanstack/react-query";
import { addSectionMutationOptions } from "#/queries";

export function AddSectionModal(props: {
  caseId: number;
  levelId: number;
  ref: Ref<HTMLDialogElement>;
}) {
  const [sectionName, setSectionName] = useState<string>("");
  const addSectionMutation = useMutation(addSectionMutationOptions);
  const AddSection = () =>
    addSectionMutation.mutate({
      caseId: props.caseId,
      levelId: props.levelId,
      sectionName: sectionName,
    });
  return (
    <Dialog
      hasAction
      ref={props.ref}
      title="Add Section"
      actionLabel="Create Section"
      buttonAction={AddSection}
    >
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">Section Name</legend>
        <input
          type="text"
          className="input w-full"
          placeholder="Type here"
          onChange={(e) => setSectionName(e.target.value)}
        />
      </fieldset>
    </Dialog>
  );
}
