import { createRootRoute, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div id="root">
      <Outlet />
    </div>
  ),
});
