import { lazy } from "react";

const Settings = lazy(() => import("../../views/game/Settings"));
const Game = lazy(() => import("../../views/game/Game"));

const routes = [
  {
    path: "/",
    component: Settings,
    isPrivate: false,
  },
  {
    path: "/game",
    component: Game,
    isPrivate: true,
  },
];

export default routes;
