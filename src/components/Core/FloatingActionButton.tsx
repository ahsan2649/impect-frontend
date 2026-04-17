import type { ReactElement } from "react";

export function FloatingActionButton(props: {
  children: ReactElement;
  buttonAction: Function;
  dataTip: string;
}) {
  return (
    <div className="fab">
      <button
        onClick={() => props.buttonAction()}
        className="tooltip-left tooltip btn btn-lg btn-circle btn-primary"
        data-tip={props.dataTip}
      >
        {props.children}
      </button>
    </div>
  );
}
