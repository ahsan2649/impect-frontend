import { type Ref } from "react";
import { Dialog } from "../Core/Dialog";

export default function ChangeLevelDialog(props: {
  setLevel: Function;
  options: any[];
  ref: Ref<HTMLDialogElement>;
}) {
  const ChangeLevel = () => {};
  return (
    <>
      <Dialog
        hasAction
        actionLabel="Change Level"
        buttonAction={ChangeLevel}
        title="Change Level"
        ref={props.ref}
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Level Name</legend>
          <select className="select w-full" onChange={(e) => props.setLevel(e.target.value)}>
            {props.options.map((level) => (
              <option value={level} key={level}>
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
