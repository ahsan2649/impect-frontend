import {
  api,
  feedbacksQueryOptions,
  feedbackTypesQueryOptions,
} from "#/queries";
import FeedbacksFilter from "#/components/feedbacks/FeedbacksFilter";
import { mutationOptions, useMutation, useQuery } from "@tanstack/react-query";
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
import AddFeedbackModal from "#/components/feedbacks/AddFeedbackModal";

export const Route = createFileRoute("/feedbacks")({
  component: FeedbacksView,
});

function FeedbacksView() {
  const allFeedbacksQuery = useQuery(feedbacksQueryOptions);
  const feedbackTypesQuery = useQuery(feedbackTypesQueryOptions);

  const addFeedbackMutationOptions = mutationOptions({
    mutationFn: (data) =>
      api.post("feedbacks", {
        json: {
          value: data.value,
          description: data.description,
          feedbackimpect: data.level,
          feedbacktype: data.feedbackType,
        },
      }),
  });
  const addFeedbackMutation = useMutation(addFeedbackMutationOptions);
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
      <AddFeedbackModal onSubmit={(data) => addFeedbackMutation.mutate(data)} />
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
