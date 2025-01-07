// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import CategoryDetail from "./pages/CategoryDetail";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryIndex from "./pages/CategoryIndex";
import CategoryNew from "./pages/CategoryNew";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramEdit from "./pages/ProgramEdit";
import ProgramIndex from "./pages/ProgramIndex";
import ProgramNew from "./pages/ProgramNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/categories",
    element: <CategoryIndex />,
  },
  {
    path: "/categories/new",
    element: <CategoryNew />,
  },
  {
    path: "/categories/:id",
    element: <CategoryDetail />,
  },
  {
    path: "/categories/:id/edit",
    element: <CategoryEdit />,
  },
  {
    path: "/programs",
    element: <ProgramIndex />,
  },
  {
    path: "/programs/new",
    element: <ProgramNew />,
  },
  {
    path: "/programs/:id",
    element: <ProgramDetail />,
  },
  {
    path: "/programs/:id/edit",
    element: <ProgramEdit />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
