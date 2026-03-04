import CaseOverview from "#/components/cases/CaseOverview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cases")({
  component: CasesView,
});

function CasesView() {
  return (
    <>
      <CaseOverview
        title="Sports Case"
        description="The sports cases application revolves around tracking the participants movement during workout exercises and evalute their movement to provide valueable feedback to improve the participants movements."
      />
      <CaseOverview
        title="Robot Case"
        description="The Robot cases tries to teach a participant interactions with a non human entity via feedback components during human robot interactions."
      />
      <CaseOverview
        title="Dancing Case"
        description="The dancing case presents the participants with a simple dance routine broken up into seperate dance moves and tries to teach each individual move by evaluating the participants movements and providing feedback after each section."
      />
    </>
  );
}
