import { useState, type Ref } from "react";
import JointsSelect from "./JointsSelect";
import { Dialog } from "../Core/Dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFeedbackMutationOptions,
  feedbackLevelsQueryOptions,
  feedbacksQueryOptions,
  feedbackTypesQueryOptions,
} from "#/queries/feedbacks";

export default function AddFeedbackModal(props: { ref: Ref<HTMLDialogElement> }) {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");
  const [value, setValue] = useState<string>("");
  const [level, setLevel] = useState<number>();
  const [feedbackType, setFeedbackType] = useState<number>();

  const feedbackTypesQuery = useQuery(feedbackTypesQueryOptions);
  const feedbackLevelsQuery = useQuery(feedbackLevelsQueryOptions);
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
            <select className="select w-full" onChange={(e) => setLevel(e.target.value)}>
              {feedbackLevelsQuery.data?.map((level) => (
                <option value={level.id} key={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
            <span className="label"></span>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Feedback Type</legend>
            <select className="select w-full" onChange={(e) => setFeedbackType(e.target.value)}>
              {feedbackTypesQuery.data?.map((feedbackType) => (
                <option value={feedbackType.id} key={feedbackType.id}>
                  {feedbackType.name}
                </option>
              ))}
            </select>
            <span className="label"></span>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Value</legend>
            {feedbackType == 3 ? (
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
