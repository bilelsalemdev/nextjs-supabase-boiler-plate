import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Dashboard</div>,
});
