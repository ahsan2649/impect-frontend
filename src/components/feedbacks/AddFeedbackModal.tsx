import { LucidePlus } from "lucide-react";
import { useRef, useState } from "react";
import JointsSelect from "./JointsSelect";

export default function AddFeedbackModal(props: { onSubmit: Function }) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState<string>("");
  const [level, setLevel] = useState("1");
  const [feedbackType, setFeedbackType] = useState("1");

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Feedback</h3>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="label">
              A title for the feedback to remember what it does
            </p>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Feedback Level</legend>
            <select
              defaultValue={level}
              className="select w-full"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="1">Good</option>
              <option value="2">Neutral</option>
              <option value="3">Warning</option>
              <option value="4">Bad</option>
            </select>
            <span className="label"></span>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Feedback Type</legend>
            <select
              defaultValue={feedbackType}
              className="select w-full"
              onChange={(e) => setFeedbackType(e.target.value)}
            >
              <option value="1">Text</option>
              <option value="2">Joint</option>
              <option value="3">Audio</option>
              <option value="4">Video</option>
              <option value="5">Command</option>
            </select>
            <span className="label"></span>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Value</legend>
            {feedbackType == "2" ? (
              <JointsSelect setValue={setValue} />
            ) : (
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                onChange={(e) => setValue(e.target.value)}
              />
            )}
            <p className="label">The value to process in the feedback</p>
          </fieldset>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <button
              className="btn btn-primary"
              onClick={() =>
                props.onSubmit({ description, value, feedbackType, level })
              }
            >
              Send
            </button>
          </div>
        </div>
      </dialog>
      <div className="fab">
        <button
          onClick={() => modalRef.current?.showModal()}
          className="tooltip-left tooltip btn btn-lg btn-circle btn-primary"
          data-tip="Add Feedback"
        >
          <LucidePlus />
        </button>
      </div>
    </>
  );
}
