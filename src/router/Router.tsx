import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import SuccessPage from "../components/SuccessPage/SuccessPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/selectionSuccess/:studentId" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
