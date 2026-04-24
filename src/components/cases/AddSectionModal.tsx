import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSectionMutationOptions, caseQueryOptions } from "#/queries/cases";

export function AddSectionModal(props: {
  case_id: number;
  level_id: number;
  ref: Ref<HTMLDialogElement>;
}) {
  const queryClient = useQueryClient();

  const [sectionName, setSectionName] = useState<string>("");
  const addSectionMutation = useMutation(addSectionMutationOptions);
  async function AddSection() {
    await addSectionMutation.mutateAsync({
      case_id: props.case_id,
      level_id: props.level_id,
      name: sectionName,
    });

    await queryClient.invalidateQueries(caseQueryOptions(props.case_id));
    props.ref.current.close();
  }
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
