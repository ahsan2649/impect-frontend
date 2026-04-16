import { LucidePlus } from "lucide-react";
import { useRef, useState } from "react";
import { Dialog } from "../app/Dialog";

export default function AddLevelModal(props: {
  onSubmit: Function;
  caseId: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [levelName, setLevelName] = useState<string>("");

  return (
    <>
      <Dialog
        actionLabel="Create Level"
        buttonAction={() =>
          props.onSubmit({ caseId: props.caseId, levelName: levelName })
        }
        title="Add Level"
        ref={modalRef}
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Description</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            onChange={(e) => setLevelName(e.target.value)}
          />
        </fieldset>
      </Dialog>
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
