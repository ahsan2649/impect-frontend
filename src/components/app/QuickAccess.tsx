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
    <ul className="menu menu-horizontal gap-2">
      <li>
        <Link
          to="/"
          className="flex gap-2"
          activeProps={{ className: "menu-active" }}
        >
          <Monitor />
          <span>Clients</span>
        </Link>
      </li>
      <li>
        <Link
          to="/cases"
          className="flex gap-2"
          activeProps={{ className: "menu-active" }}
        >
          <Folder />
          <span>Cases</span>
        </Link>
      </li>
      <li>
        <Link
          to="/feedbacks"
          className="flex gap-2"
          activeProps={{ className: "menu-active" }}
        >
          <MessageSquareDiff />
          <span>Feedbacks</span>
        </Link>
      </li>
      <li>
        <Link
          to="/logs"
          className="flex gap-2"
          activeProps={{ className: "menu-active" }}
        >
          <ScrollText />
          <span>Logs</span>
        </Link>
      </li>
      <li>
        <a className="flex gap-2">
          <Settings />
          <span>Settings</span>
        </a>
      </li>
    </ul>
  );
}
