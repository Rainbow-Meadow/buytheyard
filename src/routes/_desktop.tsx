import { createFileRoute, Outlet } from "@tanstack/react-router";
import desktopCss from "../desktop/styles.css?url";
import { DesktopHeader } from "../desktop/components/DesktopHeader";
import { DesktopFooter } from "../desktop/components/DesktopFooter";

export const Route = createFileRoute("/_desktop")({
  head: () => ({
    links: [{ rel: "stylesheet", href: desktopCss }],
  }),
  component: DesktopLayout,
});

function DesktopLayout() {
  return (
    <div className="d-root min-h-screen px-4 md:px-10 py-6 md:py-10">
      <div className="max-w-7xl mx-auto w-full">
        <DesktopHeader />
        <main>
          <Outlet />
        </main>
        <DesktopFooter />
      </div>
    </div>
  );
}