import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { dashboardRoute } from "./dashboard";
import { usersRoute } from "./users";
import { settingsRoute } from "./settings";

export const routeTree = rootRoute.addChildren([
  dashboardRoute,
  usersRoute,
  settingsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
