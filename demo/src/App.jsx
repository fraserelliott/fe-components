import "./App.css";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { ConfirmDialogPage } from "@pages/ConfirmDialogPage";
import { Header } from "@components/Header";
import { ModalPage } from "./pages/ModalPage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
