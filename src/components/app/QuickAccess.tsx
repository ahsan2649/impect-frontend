import { Link } from "@tanstack/react-router";
import {
  Folder,
  MessageSquareDiff,
  Monitor,
  ScrollText,
  Settings,
} from "lucide-react";

export default function QuickAccess() {
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1 px-4">
        <img src="/Black BG.png" alt="" className="h-16 hidden dark:block" />
        <img src="/White BG.png" alt="" className="h-16 block dark:hidden" />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-1">
          <li>
            <Link
              to="/"
              className="flex gap-2 p-4"
              activeProps={{ className: "menu-active" }}
            >
              <Monitor />
              <span>Clients</span>
            </Link>
          </li>
          <li>
            <Link
              to="/cases"
              className="flex gap-2 p-4"
              activeProps={{ className: "menu-active" }}
            >
              <Folder />
              <span>Cases</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feedbacks"
              className="flex gap-2 p-4"
              activeProps={{ className: "menu-active" }}
            >
              <MessageSquareDiff />
              <span>Feedbacks</span>
            </Link>
          </li>
          <li>
            <Link
              to="/logs"
              className="flex gap-2 p-4"
              activeProps={{ className: "menu-active" }}
            >
              <ScrollText />
              <span>Logs</span>
            </Link>
          </li>
          <li>
            <a className="flex gap-2 p-4">
              <Settings />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
