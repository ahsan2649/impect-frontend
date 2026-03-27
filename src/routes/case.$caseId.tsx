import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";

export const Route = createFileRoute("/case/$caseId")({
  component: CaseView,
});

function CaseView() {
  const { caseId } = Route.useParams();

  const caseQuery = useQuery({
    queryKey: ["case", caseId],
    queryFn: async () => {
      const data = await ky
        .get(`http://localhost:8080/api/case/${caseId}`)
        .json();
      return data;
    },
  });

  return (
    <div>
      <h1>{caseQuery.data?.name} Case</h1>
      <ul className="grid grid-cols-2 gap-3">
        {caseQuery.data?.levels.map((level) => (
          <li className="card bg-base-300 p-4">
            <p className="card-title">{level.level_name}</p>
            <ul>
              {level.sections.map((section) => (
                <li>
                  <details className="collapse collapse-arrow">
                    <summary className="collapse-title">
                      {section.section_name}
                    </summary>
                    <div className="collapse-content">
                      Edit {section.section_name} feedbacks
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
