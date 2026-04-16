export default function FeedbacksFilter(props: {
  feedbackTypes: { name: string; id: string }[];
  setValues;
}) {
  return (
    <form className="flex gap-1 my-2">
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
            props.setValues((p) =>
              p.includes(t) ? p.filter((v) => v !== t) : [...p, t],
            );
          }}
        />
      ))}
    </form>
  );
}
