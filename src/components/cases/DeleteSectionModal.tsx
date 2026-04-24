import { type Ref } from "react";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { caseQueryOptions, deleteSectionMutationOptions } from "#/queries/cases";

export default function DeleteSectionDialog(props: {
  section: CaseLevelSection;
  ref: Ref<HTMLDialogElement>;
}) {
  const deleteSectionMutation = useMutation(deleteSectionMutationOptions);

  const queryClient = useQueryClient();

  async function DeleteSection() {
    await deleteSectionMutation.mutateAsync(props.section);
    await queryClient.invalidateQueries(caseQueryOptions(props.section.case_id));

    props.ref.current.close();
  }

  return (
    <>
      <Dialog
        hasAction
        actionLabel="Delete"
        buttonAction={DeleteSection}
        title="Delete Section"
        ref={props.ref}
      >
        <div>Are you sure you want to delete this Section?</div>
      </Dialog>
    </>
  );
}
