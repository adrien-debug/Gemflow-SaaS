import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import "@tanstack/react-query";
import { ApiError } from "@shared/types/api-error.type.ts";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
