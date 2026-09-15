import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";

import "./styles.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
  context: {
    queryClient: undefined as any,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
