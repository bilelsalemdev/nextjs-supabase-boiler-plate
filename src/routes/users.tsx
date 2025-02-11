import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: () => <div>Users</div>,
});
