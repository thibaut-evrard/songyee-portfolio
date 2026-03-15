import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import { ROUTES } from "./constants/routes";
import Home from "./pages/home";

export const routes: RouteDefinition[] = [
  {
    path: ROUTES.home,
    component: Home,
  },
  {
    path: ROUTES.about,
    component: lazy(() => import("./pages/about")),
  },
  {
    path: ROUTES.project(":uid?"),
    component: lazy(() => import("./pages/project")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
