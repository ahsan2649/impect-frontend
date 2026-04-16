import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles.css";
import QuickAccess from "#/components/app/QuickAccess";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div>
      <QuickAccess />

      <div className="px-5">
        <Outlet />
      </div>
      <TanStackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[]}
      />
    </div>
  );
}
