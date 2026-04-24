import {
  CircleMinus,
  CircleArrowUp,
  CircleAlert,
  CircleArrowDown,
  LucideTrash2,
} from "lucide-react";

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

export function FeedbackCard(props: { feedback: Feedback }) {
  return (
    <div className="card bg-base-200 shadow-sm aspect-square">
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
