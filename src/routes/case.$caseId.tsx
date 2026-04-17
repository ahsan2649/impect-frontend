import { Dialog } from "#/components/Core/Dialog";
import { FloatingActionButton } from "#/components/Core/FloatingActionButton";
import AddLevelDialog from "#/components/cases/AddLevelModal";
import { AddSectionModal } from "#/components/cases/AddSectionModal";
import { AssignFeedbackModal } from "#/components/cases/AssignFeedbackModal";
import { CaseLevel } from "#/components/cases/CaseLevel";
import {
  addLevelMutationOptions,
  addSectionMutationOptions,
  caseQueryOptions,
  feedbacksQueryOptions,
} from "#/queries";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LucidePlus } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/case/$caseId")({
  component: CaseView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(caseQueryOptions(params.caseId));
    context.queryClient.ensureQueryData(feedbacksQueryOptions);
  },
});

function CaseView() {
  // Third-party Hooks
  const { caseId } = Route.useParams();

  // Queries
  const caseQuery = useSuspenseQuery(caseQueryOptions(caseId));
  const allFeedbacksQuery = useSuspenseQuery(feedbacksQueryOptions);

  // Mutation
  const addLevelMutation = useMutation(addLevelMutationOptions);
  const assignFeedbacksMutation = useMutation({});

  // Refs
  const sectionModalRef = useRef<HTMLDialogElement>(null);
  const levelModalRef = useRef<HTMLDialogElement>(null);
  const feedbackModalRef = useRef<HTMLDialogElement>(null);

  // States
  const [levelId, setLevelId] = useState<string>("");
  const [sectionId, setSectionId] = useState<string>("");

  // Functions

  const OpenLevelModal = () => levelModalRef.current?.showModal();
  const OpenSectionModal = (levelId: string) => {
    setLevelId(levelId);
    sectionModalRef.current?.showModal();
  };
  const OpenFeedbackModal = (levelId: string, sectionId: string) => {
    setLevelId(levelId);
    setSectionId(sectionId);
    feedbackModalRef.current?.showModal();
  };

  // Component
  return (
    <div>
      {/* Heading */}
      <h1 className="text-xl my-4">{caseQuery.data?.name} Case</h1>

      {/* Body */}
      <ul className="grid grid-cols-2 gap-3">
        {caseQuery.data?.levels.map((level) => (
          <li className="card bg-base-300 p-4" key={level.id}>
            <CaseLevel
              level={level}
              openSectionAddModal={OpenSectionModal}
              openFeedbackModal={OpenFeedbackModal}
            ></CaseLevel>
          </li>
        ))}
      </ul>

      {/* Modals */}
      <AddLevelDialog ref={levelModalRef} caseId={caseId} />
      <AddSectionModal
        ref={sectionModalRef}
        caseId={parseInt(caseId)}
        levelId={parseInt(levelId)}
      ></AddSectionModal>
      <AssignFeedbackModal
        ref={feedbackModalRef}
        caseId={parseInt(caseId)}
        levelId={parseInt(levelId)}
        sectionId={parseInt(sectionId)}
      ></AssignFeedbackModal>

      {/* FloatingActionButton */}
      <FloatingActionButton dataTip="Add Level" buttonAction={OpenLevelModal}>
        <LucidePlus />
      </FloatingActionButton>
    </div>
  );
}
