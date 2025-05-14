import { Route, Routes } from "react-router";
import HomePage from "../components/pages/HomePage";
import RegisterPage from "../components/pages/user/RegisterPage";
import LoginPage from "../components/pages/user/LoginPage";
import EditAccountPage from "../components/pages/user/EditAccountPage";
import RegisterProductPage from "../components/pages/product/RegisterProductPage";
import ProductDetailsPage from "../components/pages/product/ProductDetailsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/cadastro" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/editarConta" element={<EditAccountPage />}></Route>
      <Route path="/cadastroProduto" element={<RegisterProductPage />}></Route>
      <Route path="/bebida/:id" element={<ProductDetailsPage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
