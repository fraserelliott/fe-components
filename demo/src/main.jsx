import { createRoot } from "react-dom/client";
import "./index.css";
import "@fraserelliott/fe-slate/fe-slate.css";
import App from "./App.jsx";
import {
  FocusManagerProvider,
  ToastProvider,
  FEStyleProvider,
} from "@fraserelliott/fe-components";
import { feSlateTheme } from "@fraserelliott/fe-slate";

createRoot(document.getElementById("root")).render(
  <FEStyleProvider theme={feSlateTheme}>
    <FocusManagerProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </FocusManagerProvider>
  </FEStyleProvider>,
);
