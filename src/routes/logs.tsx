import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logs")({
  component: LogsView,
});

function LogsView() {
  return (
    <div className="grid grid-cols-6 w-full p-2 gap-4">
      <div className="col-span-1">
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2">Days</li>
          <li className="list-row">2026-02-25</li>
          <li className="list-row">2026-02-24</li>
          <li className="list-row">2026-02-23</li>
        </ul>
      </div>
      <div className="col-span-5">
        <div className="grid grid-cols-3 w-1/2 items-center gap-2">
          <div>Filter By Case:</div>

          <select defaultValue="None" className="select col-span-2">
            <option>None</option>
            <option>Sports Case</option>
            <option>Robot Case</option>
            <option>Dancing Case</option>
          </select>
          <div>Filter By Client:</div>
          <select defaultValue="None" className="select col-span-2">
            <option>None</option>
            <option>1234</option>
            <option>5678</option>
            <option>9101</option>
          </select>
        </div>
      </div>
    </div>
  );
}
