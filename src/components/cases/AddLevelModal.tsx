import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLevelMutationOptions, caseQueryOptions } from "#/queries/cases";

export default function AddLevelDialog(props: { case_id: number; ref: Ref<HTMLDialogElement> }) {
  const addLevelMutation = useMutation(addLevelMutationOptions);

  const queryClient = useQueryClient();
  const [levelName, setLevelName] = useState<string>("");

  async function AddLevel() {
    await addLevelMutation.mutateAsync({ name: levelName, case_id: props.case_id });
    await queryClient.invalidateQueries(caseQueryOptions(props.case_id));
    props.ref.current.close();
  }

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
