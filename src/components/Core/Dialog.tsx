import type { ReactElement, Ref } from "react";

export function Dialog(props: {
  ref: Ref<HTMLDialogElement>;
  title: string;
  buttonAction: Function;
  actionLabel: string;
  children: ReactElement;
  hasAction?: boolean;
}) {
  return (
    <dialog className="modal" ref={props.ref}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{props.title}</h3>
        <>{props.children}</>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>{" "}
          </form>
          {props.hasAction ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                props.buttonAction();
              }}
            >
              {props.actionLabel}
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </dialog>
  );
}
