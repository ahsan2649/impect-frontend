import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";

export default function ChangeSectionDialog(props: {
  options: any[];
  ref: Ref<HTMLDialogElement>;
  setSection: Function;
}) {
  const ChangeSection = () => {};
  return (
    <>
      <Dialog
        hasAction
        actionLabel="Change Section"
        buttonAction={ChangeSection}
        title="Change Section"
        ref={props.ref}
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Section Name</legend>
          <select className="select w-full" onChange={(e) => props.setSection(e.target.value)}>
            {props.options.map((option) => (
              <option value={option} key={option}>
                {option.section_name}
              </option>
            ))}
          </select>
          <span className="label"></span>
        </fieldset>
      </Dialog>
    </>
  );
}
