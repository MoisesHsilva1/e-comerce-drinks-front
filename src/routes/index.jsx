import { Route, Routes } from "react-router";
import HomePage from "../components/pages/HomePage";
import RegisterPage from "../components/pages/user/RegisterPage";
import LoginPage from "../components/pages/user/LoginPage";
import EditAccountPage from "../components/pages/user/EditAccountPage";
import RegisterProductPage from "../components/pages/product/RegisterProductPage";
import ProductDetailsPage from "../components/pages/product/ProductDetailsPage";
import ProductSearchResultPage from "../components/pages/product/ProductSearchResultPage";
import ProductCartPage from "../components/pages/product/ProductCartPage";
import ProductDeliveryPage from "../components/pages/product/ProductDeliveryPage";
import ProductPaymentMethodPage from "../components/pages/product/ProductPaymentMethodPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/cadastro" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/editarConta" element={<EditAccountPage />}></Route>
      <Route path="/cadastroProduto" element={<RegisterProductPage />}></Route>
      <Route path="/entregas" element={<ProductDeliveryPage />}></Route>
      <Route path="/bebida/:id" element={<ProductDetailsPage />}></Route>
      <Route path="/buscar/:name" element={<ProductSearchResultPage />}></Route>
      <Route path="/carrinho" element={<ProductCartPage />}></Route>
      <Route path="/checkout" element={<ProductPaymentMethodPage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
