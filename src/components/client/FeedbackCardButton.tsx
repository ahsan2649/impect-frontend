import { CircleMinus, CircleArrowUp, CircleAlert, CircleArrowDown } from "lucide-react";
import type { MouseEventHandler } from "react";

function feedbackBadgeFromLevel(level: number) {
  switch (level) {
    case 1:
      return <CircleMinus size={24} />;
    case 2:
      return <CircleArrowUp size={24} />;
    case 3:
      return <CircleAlert size={24} />;
    case 4:
      return <CircleArrowDown size={24} />;
  }
}

export function FeedbackCardButton(props: {
  feedback: Feedback;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className="card bg-base-200 hover:bg-base-300 active:bg-base-100 cursor-pointer shadow-sm aspect-square"
      onClick={props.onClick}
    >
      <div className="card-body h-full">
        <div className="card-title line-clamp-1 text-ellipsis">{props.feedback.description}</div>
        <span>{props.feedback.value}</span>
        <div className="card-actions flex justify-end items-center mt-auto">
          <div className="badge badge-lg">
            <span>{props.feedback.feedback_type?.name}</span>
          </div>
          <div className="badge badge-lg">
            {feedbackBadgeFromLevel(props.feedback.feedback_level?.id as number)}
          </div>
        </div>
      </div>
    </div>
  );
}
