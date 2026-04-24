import { useState, type Ref } from "react";
import { Dialog } from "../Core/Dialog";

export default function ChangeSectionDialog(props: {
  options: CaseLevelSection[];
  ref: Ref<HTMLDialogElement>;
  ChangeSection: Function;
}) {
  const [selectedSection, setSelectedSection] = useState<string>(props.options[0]?.id);

  const ChangeSection = () => {};
  return (
    <>
      <Dialog
        hasAction
        actionLabel="Change Section"
        buttonAction={() => props.ChangeSection(selectedSection)}
        title="Change Section"
        ref={props.ref}
      >
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Section Name</legend>
          <select className="select w-full" onChange={(e) => setSelectedSection(e.target.value)}>
            <option value={0}>None</option>
            {props.options.map((section) => (
              <option value={section.id} key={section.id}>
                {section.name}
              </option>
            ))}
          </select>
          <span className="label"></span>
        </fieldset>
      </Dialog>
    </>
  );
}
