import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { addLevelMutationOptions } from "#/queries";
import { useMutation } from "@tanstack/react-query";

export default function AddLevelDialog(props: {
  caseId: string;
  ref: Ref<HTMLDialogElement>;
}) {
  const addLevelMutation = useMutation(addLevelMutationOptions);

  const [levelName, setLevelName] = useState<string>("");

  const AddLevel = () =>
    addLevelMutation.mutate({ levelName, caseId: parseInt(props.caseId) });

  return (
    <>
      <Dialog
        hasAction
        actionLabel="Create Level"
        buttonAction={AddLevel}
        title="Add Level"
        ref={props.ref}
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Description</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={(e) => setLevelName(e.target.value)}
          />
        </fieldset>
      </Dialog>
    </>
  );
}
