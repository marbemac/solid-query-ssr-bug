import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/home")),
  },
  {
    path: "/solid-resource",
    component: lazy(() => import("./pages/solid-resource")),
  },
  {
    path: "/solid-query",
    component: lazy(() => import("./pages/solid-query")),
  },
];
