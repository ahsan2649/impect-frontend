import { LucideDelete, LucidePlus } from "lucide-react";

export function CaseLevel(props: {
  level: any;
  openSectionAddModal: Function;
  openFeedbackModal: Function;
}) {
  return (
    <>
      <div className="card-title flex justify-between">
        <span>{props.level.level_name}</span>
        <button
          className="btn"
          onClick={() => {
            props.openSectionAddModal(props.level.id);
          }}
        >
          Add Section
        </button>
      </div>
      <ul>
        {props.level.sections.map((section) => (
          <li key={section.id}>
            <details className="collapse collapse-arrow">
              <summary className="collapse-title flex justify-between">
                <span>{section.section_name}</span>
                <div className="flex gap-2">
                  <div className="tooltip tooltip-left" data-tip="Assign Feedbacks">
                    <button
                      className="btn btn-circle"
                      onClick={() => props.openFeedbackModal(props.level.id, section.id)}
                    >
                      <LucidePlus></LucidePlus>
                    </button>
                  </div>
                  <div className="tooltip tooltip-left" data-tip="Delete Section">
                    <button className="btn btn-circle">
                      <LucideDelete></LucideDelete>
                    </button>
                  </div>
                </div>
              </summary>
              <div className="collapse-content">
                <div className="flex flex-wrap gap-2">
                  {section.feedbacks.map((feedback, idx) => (
                    <span className="badge" key={idx}>
                      {feedback.description}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
