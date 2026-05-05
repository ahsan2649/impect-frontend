import ChangeLevelDialog from "#/components/client/ChangeLevelModal";
import ChangeSectionDialog from "#/components/client/ChangeSectionModal";
import { FeedbackCardButton } from "#/components/client/FeedbackCardButton";
import { api } from "#/queries";
import { clientQueryOptions } from "#/queries/clients";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/clients/$client_id")({
  loader: ({ params, context }) => {
    context.queryClient.ensureQueryData(clientQueryOptions(params.client_id));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { client_id } = Route.useParams();

  // Queries
  const clientQuery = useSuspenseQuery(clientQueryOptions(client_id));

  const changeLevelDialogRef = useRef<HTMLDialogElement>(null);
  const changeSectionDialogRef = useRef<HTMLDialogElement>(null);

  const [currentLevel, setCurrentLevel] = useState<CaseLevel>();
  const [currentSection, setCurrentSection] = useState<CaseLevelSection>();

  const sendCommand = (payload) =>
    api.post("send-command", {
      json: payload,
    });

  function StartSession() {
    sendCommand({
      command: "StartSession",
      client_id: client_id,

      case_id: clientQuery.data.case?.id,
      section_id: currentSection?.id,
      level_id: currentLevel?.id,
    });
  }

  function ChangeSection(section_id: number, level_id: number) {
    sendCommand({
      command: "ChangeSection",
      client_id: client_id,

      case_id: clientQuery.data.case?.id,
      section_id: section_id,
      level_id: level_id,
    });

    setCurrentSection(
      currentLevel.sections.find((section) => section.id == section_id),
    );
    changeSectionDialogRef.current?.close();
  }

  function ChangeLevel(level_id: number) {
    console.log(level_id);

    sendCommand({
      command: "ChangeSection",
      client_id: client_id,
      case_id: clientQuery.data.case?.id,
      level_id: level_id,
    });

    const level = clientQuery.data.case.levels.find(
      (level) => level.id == level_id,
    );
    setCurrentLevel(level);
    setCurrentSection(level?.sections[0]);
    changeLevelDialogRef.current?.close();
  }

  function SendFeedback(feedback: Feedback) {
    console.log("Feedback");
    console.log(JSON.stringify(feedback));

    sendCommand({
      command: "Feedback",
      client_id: client_id,
      case_id: clientQuery.data.case?.id,
      level_id: currentLevel?.id,
      section_id: currentSection?.id,
      feedback: feedback,
    });
  }

  return (
    <>
      <h2 className="text-2xl my-4">{clientQuery.data.case?.name}</h2>
      <div className="grid grid-cols-3 w-fit gap-4 items-center">
        <button
          className="btn"
          onClick={() => changeLevelDialogRef.current.showModal()}
        >
          Change Level
        </button>
        Current Level : {currentLevel?.name ?? "None"}
        <button
          className="btn row-span-2 h-full"
          onClick={() => StartSession()}
        >
          Start Session
        </button>
        <button
          className="btn"
          onClick={() => changeSectionDialogRef.current.showModal()}
        >
          Change Section
        </button>
        Current Section : {currentSection?.name ?? "None"}
      </div>

      <div className="grid gap-4 rounded-sm grid-cols-4 lg:grid-cols-8 my-4">
        {currentSection?.feedbacks?.map((f) => (
          <FeedbackCardButton
            feedback={f}
            key={f.id}
            onClick={() => SendFeedback(f)}
          />
        ))}
      </div>

      <ChangeLevelDialog
        ChangeLevel={ChangeLevel}
        options={clientQuery.data.case.levels ?? []}
        ref={changeLevelDialogRef}
      ></ChangeLevelDialog>
      <ChangeSectionDialog
        ChangeSection={ChangeSection}
        options={currentLevel?.sections ?? []}
        ref={changeSectionDialogRef}
      ></ChangeSectionDialog>
    </>
  );
}
