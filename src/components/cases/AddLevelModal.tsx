import { LucidePlus } from "lucide-react";
import { useRef, useState } from "react";

export default function AddLevelModal(props: {
  onSubmit: Function;
  caseId: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [levelName, setLevelName] = useState<string>("");

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Level</h3>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              onChange={(e) => setLevelName(e.target.value)}
            />
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
                props.onSubmit({ caseId: props.caseId, levelName: levelName })
              }
            >
              Create Level
            </button>
          </div>
        </div>
      </dialog>
      <div className="fab">
        <button
          onClick={() => modalRef.current?.showModal()}
          className="tooltip-left tooltip btn btn-lg btn-circle btn-primary"
          data-tip="Add Level"
        >
          <LucidePlus />
        </button>
      </div>
    </>
  );
}
