import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";

export default function ChangeLevelDialog(props: {
  ChangeLevel: Function;
  options: CaseLevel[];
  ref: Ref<HTMLDialogElement>;
}) {
  const [selectedLevel, setSelectedLevel] = useState<string>(props.options[0].id);
  return (
    <>
      <Dialog
        hasAction
        actionLabel="Change Level"
        buttonAction={() => props.ChangeLevel(selectedLevel)}
        title="Change Level"
        ref={props.ref}
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Level Name</legend>
          <select
            className="select w-full"
            onChange={(e) => setSelectedLevel(e.target.value)}
            defaultValue={props.options[0].id}
          >
            {props.options.map((level) => (
              <option value={level.id} key={level.id}>
                {level.name}
              </option>
            ))}
          </select>
          <span className="label"></span>
        </fieldset>
      </Dialog>
    </>
  );
}
