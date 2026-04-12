import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Routines } from "./pages/Routines";
import { ActiveWorkout } from "./pages/ActiveWorkout";
import { ExerciseLibrary } from "./pages/ExerciseLibrary";
import { History } from "./pages/History";
import { Progress } from "./pages/Progress";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "routines", Component: Routines },
      { path: "workout/:id", Component: ActiveWorkout },
      { path: "exercises", Component: ExerciseLibrary },
      { path: "history", Component: History },
      { path: "progress", Component: Progress },
      { path: "profile", Component: Profile },
    ],
  },
]);
