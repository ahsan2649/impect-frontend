export default function FeedbacksFilter(props: {
  feedbackTypes: FeedbackType[];
  setTypes: React.Dispatch<React.SetStateAction<FeedbackType[]>>;
  feedbackLevels: FeedbackType[];
  setLevels: React.Dispatch<React.SetStateAction<FeedbackLevel[]>>;
}) {
  return (
    <form className="flex gap-8">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Filter By Type</legend>
        <div className="flex gap-1">
          {props.feedbackTypes.map((t) => (
            <input
              className="btn"
              type="checkbox"
              name="feedback-types"
              aria-label={t["name"]}
              defaultChecked
              value={t["name"]}
              key={t["id"]}
              onChange={() => {
                props.setTypes((p) => (p.includes(t) ? p.filter((v) => v !== t) : [...p, t]));
              }}
            />
          ))}
        </div>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Filter By Level</legend>
        <div className="flex gap-1">
          {props.feedbackLevels.map((t) => (
            <input
              className="btn"
              type="checkbox"
              name="feedback-levels"
              aria-label={t["name"]}
              defaultChecked
              value={t["name"]}
              key={t["id"]}
              onChange={() => {
                props.setLevels((p) => (p.includes(t) ? p.filter((v) => v !== t) : [...p, t]));
              }}
            />
          ))}
        </div>
      </fieldset>
    </form>
  );
}
