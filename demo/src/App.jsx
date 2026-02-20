import "./App.css";
import "@fraserelliott/fe-components/stylesheet";
import "@fraserelliott/fe-utilities/fe-utilities.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { ToastPage } from "@pages/ToastPage";
import { ConfirmDialogPage } from "@pages/ConfirmDialogPage";
import { Header } from "@components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toast" element={<ToastPage />} />
          <Route path="/confirmdialog" element={<ConfirmDialogPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
