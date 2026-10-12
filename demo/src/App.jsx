import "./App.css";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { ConfirmDialogPage } from "@pages/ConfirmDialogPage";
import { Header } from "@components/Header";
import { ModalPage } from "./pages/ModalPage";
import { ToastPage } from "./pages/ToastPage";
import { ActionTablePage } from "./pages/ActionTablePage";

const basename = import.meta.env.PROD ? "/fe-components/" : "/";

function App() {
  return (
    <>
      <BrowserRouter basename={basename}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirmdialog" element={<ConfirmDialogPage />} />
          <Route path="/modal" element={<ModalPage />} />
          <Route path="/toast" element={<ToastPage />} />
          <Route path="/actiontable" element={<ActionTablePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
