import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/ProductCartContext";

import Input from "../../UI/atoms/inputs/Input";
import Button from "../../UI/atoms/buttons/Button";
import ProductCartCard from "../../UI/molecules/ProductCartCard";
import IconHouse from "../../UI/atoms/icons/IconHouse";

function ProductCart() {
  const [qtd, setQtd] = useState(1);
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const { cartItems, removeItem, clearCart } = useContext(CartContext);

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const calculatePriceTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * qtd, 0);
  };

  return (
    <main className="flex flex-col p-4 sm:p-6 gap-6 max-w-4xl mx-auto pb-52 min-h-screen">
      <h1
        className="text-lg hover:text-[#1B5E20]"
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
            className="relative text-[#1B5E20] text-sm sm:text-base after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-[#1B5E20] after:transition-all after:duration-300 hover:after:w-full"
          >
            Adicionar mais
          </button>
        </div>
        <div className="flex justify-start items-start">
          <button
            onClick={() => clearCart()}
            className="text-sm text-red-600 hover:text-red-500"
          >
            Limpar Tudo
          </button>
        </div>
        {cartItems.map((item, index) => (
          <ProductCartCard
            key={index}
            qtd={qtd}
            qtdProducts={item.size}
            qtdDown={() => setQtd((prev) => Math.max(prev - 1, 1))}
            qtdUp={() => setQtd((prev) => prev + 1)}
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
            onChange={handleChangeAddress}
            className="h-10 w-full border-gray-300"
            placeholder="Digite seu endereço"
          />
        </div>
      </section>

      <footer
        className="w-full bg-white border-t border-gray-300 shadow-md p-4 sm:p-6  
  fixed bottom-0 left-0 sm:static sm:shadow-none"
      >
        <div className="flex justify-between text-lg sm:text-xl font-semibold mb-4">
          <h3>Total:</h3>
          <p>R$ {calculatePriceTotal()}</p>
        </div>
        <Button children="Comprar" className="w-full h-12 sm:h-14" />
      </footer>
    </main>
  );
}

export default ProductCart;
