import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { caseQueryOptions, deleteLevelMutationOptions } from "#/queries/cases";
import { useRouter } from "@tanstack/react-router";

export default function DeleteLevelDialog(props: {
  level: CaseLevel;
  ref: Ref<HTMLDialogElement>;
}) {
  const deleteLevelMutation = useMutation(deleteLevelMutationOptions);

  const queryClient = useQueryClient();

  async function DeleteLevel() {
    await deleteLevelMutation.mutateAsync(props.level);
    await queryClient.invalidateQueries(caseQueryOptions(props.level.case_id));

    props.ref.current.close();
  }

  return (
    <>
      <Dialog
        hasAction
        actionLabel="Delete"
        buttonAction={DeleteLevel}
        title="Delete Level"
        ref={props.ref}
      >
        <div>Are you sure you want to delete this Level?</div>
      </Dialog>
    </>
  );
}
