import { LucidePlus, LucideDelete } from "lucide-react";
import { useRef } from "react";
import DeleteSectionDialog from "./DeleteSectionModal";

export function CaseLevelSection(props: {
  section: CaseLevelSection;
  openFeedbackModal: Function;
}) {
  const sectionDeleteModalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <details className="collapse collapse-arrow">
        <summary className="collapse-title flex justify-between">
          <span>{props.section.name}</span>
          <div className="flex gap-2">
            <div className="tooltip tooltip-left" data-tip="Assign Feedbacks">
              <button
                className="btn btn-circle"
                onClick={() => props.openFeedbackModal(props.section.level_id, props.section.id)}
              >
                <LucidePlus></LucidePlus>
              </button>
            </div>
            <div className="tooltip tooltip-left" data-tip="Delete Section">
              <button
                className="btn btn-circle"
                onClick={() => {
                  sectionDeleteModalRef.current?.showModal();
                }}
              >
                <LucideDelete></LucideDelete>
              </button>
            </div>
          </div>
        </summary>
        <div className="collapse-content">
          <div className="flex flex-wrap gap-2">
            {props.section.feedbacks?.map((feedback, idx) => (
              <span className="badge" key={idx}>
                {feedback.description}
              </span>
            ))}
          </div>
        </div>
      </details>
      <DeleteSectionDialog ref={sectionDeleteModalRef} section={props.section} />
    </>
  );
}
