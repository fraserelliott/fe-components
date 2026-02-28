import "./App.css";
import "@fraserelliott/fe-components/stylesheet";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { ToastPage } from "@pages/ToastPage";
import { ConfirmDialogPage } from "@pages/ConfirmDialogPage";
import { ModalPage } from "@pages/ModalPage";
import { Header } from "@components/Header";

const basename = import.meta.env.PROD ? "/fe-components/" : "/";

function App() {
  return (
    <>
      <BrowserRouter basename={basename}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toast" element={<ToastPage />} />
          <Route path="/confirmdialog" element={<ConfirmDialogPage />} />
          <Route path="/modal" element={<ModalPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
