import { Route, Routes } from "react-router";
import HomePage from "../components/pages/HomePage";
import RegisterPage from "../components/pages/RegisterPage";
import LoginPage from "../components/pages/LoginPage";
import RegisterProductPage from "../components/pages/RegisterProductPage";
import EditAccountPage from "../components/pages/EditAccountPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/cadastro" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/editarConta" element={<EditAccountPage />}></Route>
      <Route path="/cadastroProduto" element={<RegisterProductPage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
