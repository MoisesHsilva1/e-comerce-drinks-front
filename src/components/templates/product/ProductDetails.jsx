import { useNavigate, useParams } from "react-router";
import { CartContext } from "../../../context/ProductCartContext";
import { useContext, useState, useEffect } from "react";
import ProductDetailsCard from "../../UI/molecules/ProductDetailsCard";
import useFindProductsByID from "../../../hooks/useFindProductsByID";
import toast, { Toaster } from "react-hot-toast";

function ProductDetails() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const { addItem } = useContext(CartContext);
  const { products, isLoading, error } = useFindProductsByID(params.id);

  useEffect(() => {
    if (!products) return;

    const hasMissingSize = products.some(
      (item) => !selectedSizes[item._id] || selectedSizes[item._id].length === 0
    );

    setDisabledButton(hasMissingSize);
  }, [selectedSizes, products]);

  const sendProductCart = () => {
    if (disabledButton) {
      toast.error("Selecione um tamanho para todos os produtos!");
      return;
    }

    const productData = products.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      size: selectedSizes[item._id],
      image: item.image,
    }));

    productData.forEach((item) => addItem(item));
    navigate("/carrinho");
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <p>Carregando...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center w-full h-screen">
        <p>Erro ao carregar o produto.</p>
      </main>
    );
  }

  return (
    <main className="flex w-full items-center justify-center mt-10 p-4">
      <section className="w-full max-w-5xl flex flex-col gap-8">
        <div className="flex justify-start items-start ml-10">
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#1B5E20] font-medium"
          >
            Voltar
          </button>
        </div>
        <Toaster />
        {products?.map((item) => (
          <ProductDetailsCard
            disabled={disabledButton}
            key={item._id}
            nameProduct={item.name}
            description={item.description}
            size={item.qtd}
            src={item.image}
            price={item.price}
            name={`group-${item._id}`}
            checked={selectedSizes[item._id]}
            onChange={(selectedSize) =>
              setSelectedSizes((prev) => ({
                ...prev,
                [item._id]: selectedSize,
              }))
            }
            onClick={sendProductCart}
          />
        ))}
      </section>
    </main>
  );
}

export default ProductDetails;
