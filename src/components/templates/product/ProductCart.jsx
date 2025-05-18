import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../context/ProductCartContext";

import Input from "../../UI/atoms/inputs/Input";
import Button from "../../UI/atoms/buttons/Button";
import ProductCartCard from "../../UI/molecules/ProductCartCard";
import IconHouse from "../../UI/atoms/icons/IconHouse";
import useLoggedUser from "../../../hooks/useLoggedUser";
import toast, { Toaster } from "react-hot-toast";

function ProductCart() {
  const [address, setAddress] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const { cartItems, removeItem, clearCart } = useContext(CartContext);
  const { user } = useLoggedUser();

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  useEffect(() => {
    setDisabledButton(!address.trim());
  }, [address]);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const calculatePriceTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => {
      const qtd = quantities[item.id] || 1;
      return acc + item.price * qtd;
    }, 0);

    const deliveryFee = address.trim() ? 10 : 0;
    return subtotal + deliveryFee;
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Faça login para concluir sua compra!");
      return navigate("/login");
    }

    navigate("/checkout", {
      state: {
        cartItems,
        address,
        quantities,
        user,
        total: calculatePriceTotal(),
      },
    });

    clearCart();
  };

  return (
    <main className="flex flex-col p-4 sm:p-6 gap-6 max-w-4xl mx-auto pb-64 min-h-screen">
      <Toaster />
      <h1
        className="text-lg font-semibold  hover:text-[#1B5E20]"
        onClick={() => navigate("/")}
      >
        Voltar
      </h1>
      <h1 className="text-2xl sm:text-3xl font-bold">Carrinho</h1>

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={() => navigate("/")}
            className="relative text-[#1B5E20] font-medium text-sm sm:text-base after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-[#1B5E20] after:transition-all after:duration-300 hover:after:w-full"
          >
            Adicionar mais
          </button>
        </div>
        <div className="flex justify-start items-start">
          <button
            onClick={clearCart}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Limpar Tudo
          </button>
        </div>
        {cartItems.map((item) => (
          <ProductCartCard
            key={item.id}
            qtd={quantities[item.id] || 1}
            qtdProducts={item.size}
            qtdDown={() => handleQuantityChange(item.id, -1)}
            qtdUp={() => handleQuantityChange(item.id, 1)}
            nameProduct={item.name}
            price={item.price}
            image={item.image}
            onClick={() => removeItem(item.id)}
          />
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Informação sobre entrega</h2>
        <div className="flex items-center w-full border border-gray-300 rounded-xl p-4 gap-3">
          <IconHouse />
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-10 w-full border-gray-300"
            placeholder="Digite seu endereço"
          />
        </div>
      </section>

      <footer className="w-full bg-white border-t border-gray-300 shadow-md p-4 sm:p-6 fixed bottom-1 left-0 z-50 md:static md:shadow-none">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Frete:</span>
          <span>R$ {address.trim() ? "10.00" : "0,00"}</span>
        </div>
        <div className="flex justify-between text-lg sm:text-xl font-semibold mb-4">
          <h3>Total:</h3>
          <p>R$ {calculatePriceTotal().toFixed(2)}</p>
        </div>
        <Button
          children="Comprar"
          disabled={disabledButton}
          onClick={handleCheckout}
          className="w-full h-12 sm:h-14"
        />
      </footer>
    </main>
  );
}

export default ProductCart;
