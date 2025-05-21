import { lazy } from "react";

const DashBoard = lazy(() => import("../pages/DashBoard/DashBoard"));
const TeachersRecord = lazy(
  () => import("../pages/TeachersRecord/TeachersRecord"),
);
const AddTeacher = lazy(() => import("../pages/AddTeacher/AddTeacher"));
const ClassesRecord = lazy(
  () => import("../pages/ClassesRecord/ClassesRecord"),
);
const AddClass = lazy(() => import("../pages/AddClass/AddClass"));

const routes = [
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/teachers",
    element: <TeachersRecord />,
  },
  {
    path: "/teachers/new",
    element: <AddTeacher />,
  },
  {
    path: "/classes",
    element: <ClassesRecord />,
  },
  {
    path: "/classes/new",
    element: <AddClass />,
  },
  // Add more routes as needed
];

export default routes;
