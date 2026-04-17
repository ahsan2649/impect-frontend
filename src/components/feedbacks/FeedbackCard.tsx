import {
  CircleMinus,
  CircleArrowUp,
  CircleAlert,
  CircleArrowDown,
  LucideTrash2,
} from "lucide-react";

function feedbackBadgeFromLevel(level: number) {
  switch (level) {
    case 0:
      return <CircleMinus size={24} />;
    case 1:
      return <CircleArrowUp size={24} />;
    case 2:
      return <CircleAlert size={24} />;
    case 3:
      return <CircleArrowDown size={24} />;
  }
}

export function FeedbackCard(props: {
  description;
  value;
  level;
  feedbacktype;
}) {
  return (
    <div className="card bg-base-200 shadow-sm aspect-square">
      <div className="card-body h-full">
        <div className="card-title line-clamp-1 text-ellipsis">
          {props["description"]}
        </div>
        <span>{props["value"]}</span>
        <div className="card-actions flex justify-end items-center mt-auto">
          <div className="badge badge-lg">
            <span>{props["feedbacktype"]}</span>
          </div>
          <div className="badge badge-lg">
            {feedbackBadgeFromLevel(props["level"] as number)}
          </div>
        </div>
      </div>
    </div>
  );
}
