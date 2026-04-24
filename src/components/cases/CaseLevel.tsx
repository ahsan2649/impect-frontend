import DeleteLevelDialog from "./DeleteLevelModal";
import { useRef } from "react";
import { CaseLevelSection } from "./CaseLevelSection";

export function CaseLevel(props: {
  level: CaseLevel;
  openSectionAddModal: Function;
  openFeedbackModal: Function;
}) {
  const levelDeleteModalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="card-title flex justify-between">
        <span>{props.level.name}</span>
        <div className="flex gap-1">
          <button
            className="btn"
            onClick={() => {
              props.openSectionAddModal(props.level.id);
            }}
          >
            Add Section
          </button>
          <button
            className="btn"
            onClick={() => {
              levelDeleteModalRef.current?.showModal();
            }}
          >
            Delete Level
          </button>
        </div>
      </div>
      <ul>
        {props.level.sections?.map((section) => (
          <li key={section.id}>
            <CaseLevelSection section={section} openFeedbackModal={props.openFeedbackModal} />
          </li>
        ))}
      </ul>
      <DeleteLevelDialog ref={levelDeleteModalRef} level={props.level} />
    </>
  );
}
