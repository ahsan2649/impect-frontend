import { useState, type Ref } from "react";
import JointsSelect from "./JointsSelect";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFeedbackMutationOptions, feedbacksQueryOptions } from "#/queries/feedbacks";

export default function AddFeedbackModal(props: { ref: Ref<HTMLDialogElement> }) {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");
  const [value, setValue] = useState<string>("");
  const [level, setLevel] = useState("1");
  const [feedbackType, setFeedbackType] = useState("1");

  const addFeedbackMutation = useMutation(addFeedbackMutationOptions);

  async function addFeedback(data) {
    await addFeedbackMutation.mutateAsync(data);
    await queryClient.invalidateQueries({ queryKey: feedbacksQueryOptions.queryKey });
    props.ref.current?.close();
  }
  return (
    <>
      <Dialog
        hasAction
        actionLabel="Create Feedback"
        buttonAction={() => addFeedback({ description, value, feedbackType, level })}
        ref={props.ref}
        title="Add Feedback"
      >
        <>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="label">A title for the feedback to remember what it does</p>
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
              <option value="2">Video</option>
              <option value="3">Joint</option>
              <option value="4">Command</option>
              <option value="5">Audio</option>
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
        </>
      </Dialog>
    </>
  );
}
