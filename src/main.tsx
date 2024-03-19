import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import rootRoute from "./app/";
import initActor from "./utils/canister";

const router = createBrowserRouter(rootRoute, {
  basename: import.meta.env.BASE_URL,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);

initActor().then(() =>
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
);
