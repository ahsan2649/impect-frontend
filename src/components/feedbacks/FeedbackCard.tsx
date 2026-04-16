import { feedbackBadgeFromLevel } from "../../routes/feedbacks";

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
        <div className="card-actions justify-end mt-auto">
          <div className="badge">
            {feedbackBadgeFromLevel(props["level"] as number)}
            {props["feedbacktype"]}
          </div>
        </div>
      </div>
    </div>
  );
}
