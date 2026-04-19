import ChangeLevelDialog from "#/components/client/ChangeLevelModal";
import ChangeSectionDialog from "#/components/client/ChangeSectionModal";
import { api, clientQueryOptions } from "#/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/client/$clientId")({
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(clientQueryOptions(params.clientId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { clientId } = Route.useParams();

  // Queries
  const clientQuery = useSuspenseQuery(clientQueryOptions(clientId));

  const changeLevelDialogRef = useRef<HTMLDialogElement>(null);
  const changeSectionDialogRef = useRef<HTMLDialogElement>(null);

  const [currentLevel, setCurrentLevel] = useState(clientQuery.data.case.levels[0]);
  const [currentSection, setCurrentSection] = useState();

  const sendCommand = (payload) =>
    api.post("send-command", {
      json: payload,
    });

  return (
    <>
      <h2>{clientQuery.data.case.name}</h2>
      <button className="btn" onClick={() => changeLevelDialogRef.current.showModal()}>
        Change Level
      </button>
      <button className="btn" onClick={() => changeSectionDialogRef.current.showModal()}>
        Change Section
      </button>

      <ChangeLevelDialog
        setLevel={setCurrentLevel}
        options={clientQuery.data.case.levels}
        ref={changeLevelDialogRef}
      ></ChangeLevelDialog>
      <ChangeSectionDialog
        setSection={setCurrentSection}
        options={currentLevel.sections}
        ref={changeSectionDialogRef}
      ></ChangeSectionDialog>
    </>
  );
}
