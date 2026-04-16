import { Dialog } from "#/components/app/Dialog";
import AddLevelModal from "#/components/cases/AddLevelModal";
import { CaseLevel } from "#/components/cases/CaseLevel";
import {
  addLevelMutationOptions,
  addSectionMutationOptions,
  caseQueryOptions,
} from "#/queries";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/case/$caseId")({
  component: CaseView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(caseQueryOptions(params.caseId));
  },
});

function CaseView() {
  const { caseId } = Route.useParams();

  const caseQuery = useSuspenseQuery(caseQueryOptions(caseId));

  const addLevelMutation = useMutation(addLevelMutationOptions);
  const addSectionMutation = useMutation(addSectionMutationOptions);
  const sectionModalRef = useRef<HTMLDialogElement>(null);
  const [sectionName, setSectionName] = useState<string>("");
  const [levelId, setLevelId] = useState<string>("");

  return (
    <div>
      <AddLevelModal
        caseId={caseId}
        onSubmit={(data: { levelName: string; caseId: number }) => {
          addLevelMutation.mutate(data);
        }}
      />
      <h1>{caseQuery.data?.name} Case</h1>
      <ul className="grid grid-cols-2 gap-3">
        {caseQuery.data?.levels.map((level) => (
          <li className="card bg-base-300 p-4" key={level.id}>
            <CaseLevel
              level={level}
              openSectionAddModal={() => {
                setLevelId(level.id);
                sectionModalRef.current?.showModal();
              }}
            ></CaseLevel>
          </li>
        ))}
      </ul>
      <Dialog
        ref={sectionModalRef}
        title="Add Section"
        actionLabel="Create Section"
        buttonAction={() =>
          addSectionMutation.mutate({
            caseId: parseInt(caseId),
            levelId: parseInt(levelId),
            sectionName: sectionName,
          })
        }
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
    </div>
  );
}
