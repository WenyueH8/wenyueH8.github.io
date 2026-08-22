import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomeEnglish from "../app/page.en";
import "../app/globals.css";
import "./github.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomeEnglish />
  </StrictMode>,
);
