import { StrictMode } from "react";
import { Layout } from "./components/Layout/Layout";
import ReactDOM from "react-dom/client";
import "./globalStyles/index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <Layout />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
