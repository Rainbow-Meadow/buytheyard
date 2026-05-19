import { createFileRoute, Outlet } from "@tanstack/react-router";
import mobileCss from "../mobile/styles.css?url";
import { MobileHeader } from "../mobile/components/MobileHeader";
import { MobileFooter } from "../mobile/components/MobileFooter";

export const Route = createFileRoute("/m")({
  head: () => ({
    links: [{ rel: "stylesheet", href: mobileCss }],
  }),
  component: MobileLayout,
});

function MobileLayout() {
  return (
    <div className="m-root min-h-screen">
      <MobileHeader />
      <main>
        <Outlet />
      </main>
      <MobileFooter />
    </div>
  );
}