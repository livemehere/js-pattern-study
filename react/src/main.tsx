import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChildrenPatternPage from "./pages/ChildrenPattern";
import CompoundPattern from "./pages/CompoundPattern";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ChildrenPatternPage",
    element: <ChildrenPatternPage />,
  },
  {
    path: "/CompoundPattern",
    element: <CompoundPattern />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
