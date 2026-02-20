import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "@fraserelliott/fe-components";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <App />
  </ToastProvider>,
);
