import { FloatingActionButton } from "#/components/Core/FloatingActionButton";
import AddLevelDialog from "#/components/cases/AddLevelModal";
import { AddSectionModal } from "#/components/cases/AddSectionModal";
import { AssignFeedbackModal } from "#/components/cases/AssignFeedbackModal";
import { CaseLevel } from "#/components/cases/CaseLevel";
import { caseQueryOptions } from "#/queries/cases";
import { feedbacksQueryOptions } from "#/queries/feedbacks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LucidePlus } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/case/$case_id")({
  component: CaseView,
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(caseQueryOptions(parseInt(params.case_id)));
    context.queryClient.ensureQueryData(feedbacksQueryOptions);
  },
});

function CaseView() {
  // Third-party Hooks
  const { case_id }: { case_id: number } = Route.useParams();

  // Queries
  const caseQuery = useSuspenseQuery(caseQueryOptions(case_id));

  // Refs
  const sectionModalRef = useRef<HTMLDialogElement>(null);
  const levelModalRef = useRef<HTMLDialogElement>(null);
  const feedbackModalRef = useRef<HTMLDialogElement>(null);

  // States
  const [level_id, setLevelId] = useState<number>(0);
  const [section_id, setSectionId] = useState<number>(0);

  // Functions
  const OpenLevelModal = () => levelModalRef.current?.showModal();
  const OpenSectionModal = (level_id: number) => {
    setLevelId(level_id);
    sectionModalRef.current?.showModal();
  };
  const OpenFeedbackModal = (level_id: number, sectionId: number) => {
    setLevelId(level_id);
    setSectionId(sectionId);
    feedbackModalRef.current?.showModal();
  };

  // Component
  return (
    <div>
      {/* Heading */}
      <h1 className="text-xl my-4">{caseQuery.data?.name} Case</h1>

      {/* Body */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {caseQuery.data?.levels?.map((level) => (
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
      <AddLevelDialog ref={levelModalRef} case_id={case_id} />
      <AddSectionModal
        ref={sectionModalRef}
        case_id={case_id}
        level_id={level_id}
      ></AddSectionModal>
      <AssignFeedbackModal
        ref={feedbackModalRef}
        case_id={case_id}
        level_id={level_id}
        section_id={section_id}
      ></AssignFeedbackModal>

      {/* FloatingActionButton */}
      <FloatingActionButton dataTip="Add Level" buttonAction={OpenLevelModal}>
        <LucidePlus />
      </FloatingActionButton>
    </div>
  );
}
