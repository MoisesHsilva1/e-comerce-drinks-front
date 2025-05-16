import ProductDetailsCard from "../../UI/molecules/ProductDetailsCard";
import useListProductsByID from "../../../hooks/useListProductsByID";
import { useParams } from "react-router";
import { useState } from "react";

function ProductDetails() {
  const [sizeSelected, setSelectedSizes] = useState({});
  const params = useParams();

  const { products, isLoading, error } = useListProductsByID(params.id);

  {
    isLoading && (
      <main className="flex items-center justify-center w-full h-screen">
        <p>Carregando...</p>
      </main>
    );
  }

  {
    error && (
      <main className="flex items-center justify-center w-full h-screen">
        <p>Erro ao carregar o produto.</p>
      </main>
    );
  }

  return (
    <main className="flex w-full items-center justify-center mt-10 p-4">
      <section className="w-full max-w-5xl flex flex-col gap-8">
        {products?.map((item) => (
          <ProductDetailsCard
            key={item._id}
            nameProduct={item.name}
            description={item.description}
            size={item.qtd}
            price={item.price}
            name={`group-${item._id}`}
            checked={sizeSelected[item._id]}
            onChange={(selectedSize) =>
              setSelectedSizes((prev) => ({
                ...prev,
                [item._id]: selectedSize,
              }))
            }
          />
        ))}
      </section>
    </main>
  );
}

export default ProductDetails;
