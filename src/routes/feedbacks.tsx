import FeedbacksFilter from "#/components/feedbacks/FeedbacksFilter";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";
import {
  CircleAlert,
  CircleArrowDown,
  CircleArrowUp,
  CircleMinus,
  LucidePlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/feedbacks")({
  component: FeedbacksView,
});

function FeedbacksView() {
  const modalRef = useRef(null);

  const allFeedbacksQuery = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const data = await ky.get("http://localhost:8080/api/feedbacks").json();
      return data;
    },
    initialData: [],
  });

  const feedbackTypesQuery = useQuery({
    queryKey: ["feedback-types"],
    queryFn: async () => {
      const data = await ky
        .get("http://localhost:8080/api/feedback-types")
        .json();
      return data;
    },
  });

  const feedbackLevels = {
    0: "Neutral",
    1: "Positive",
    2: "Warning",
    3: "Negative",
  };

  const feedbackBadgeFromLevel = (level: number) => {
    switch (level) {
      case 0:
        return <CircleMinus size={24} />;
      case 1:
        return <CircleArrowUp size={24} />;
      case 2:
        return <CircleAlert size={24} />;
      case 3:
        return <CircleArrowDown size={24} />;
    }
  };

  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    if (feedbackTypesQuery.isSuccess) {
      setValues(() => feedbackTypesQuery.data as []);
    }
  }, [feedbackTypesQuery.isSuccess]);

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Feedback</h3>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Description</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
            <p className="label">
              A title for the feedback to remember what it does
            </p>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Feedback Level</legend>
            <select defaultValue="Neutral" className="select w-full">
              <option>Good</option>
              <option>Neutral</option>
              <option>Warning</option>
              <option>Bad</option>
            </select>
            <span className="label"></span>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Feedback Type</legend>
            <select defaultValue="Text" className="select w-full">
              <option>Text</option>
              <option>Joint</option>
              <option>Audio</option>
              <option>Video</option>
              <option>Command</option>
            </select>
            <span className="label"></span>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Value</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
            <p className="label">The value to process in the feedback</p>
          </fieldset>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </dialog>
      <div className="fab">
        <button
          onClick={() => modalRef.current.showModal()}
          className="tooltip-left tooltip btn btn-lg btn-circle btn-primary"
          data-tip="Add Feedback"
        >
          <LucidePlus />
        </button>
      </div>
      {feedbackTypesQuery.isSuccess ? (
        <FeedbacksFilter
          feedbackTypes={feedbackTypesQuery.data as []}
          setValues={setValues}
        />
      ) : null}
      <div className="grid gap-4 rounded-sm grid-cols-4 lg:grid-cols-8">
        {(allFeedbacksQuery.data as [])
          .filter((f) =>
            values.includes(
              feedbackTypesQuery.data.find((t) => t.id == f.feedbacktype),
            ),
          )
          .map((f) => {
            return (
              <div
                className="card bg-base-200 shadow-sm aspect-square"
                key={f["id"]}
              >
                <div className="card-body h-full">
                  <div className="card-title line-clamp-1 text-ellipsis">
                    {f["description"]}
                  </div>
                  <span>{f["value"]}</span>
                  <div className="card-actions justify-end mt-auto">
                    <div className="badge">
                      {feedbackBadgeFromLevel(f["feedbackimpect"] as number)}
                      {
                        feedbackTypesQuery.data.find(
                          (t) => t.id == f["feedbacktype"],
                        ).name
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
