import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FocusManagerProvider } from "@fraserelliott/fe-components";

createRoot(document.getElementById("root")).render(
  <FocusManagerProvider>
    <App />
  </FocusManagerProvider>,
);
