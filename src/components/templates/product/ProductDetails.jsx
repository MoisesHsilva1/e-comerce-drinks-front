import ProductDetailsCard from "../../UI/molecules/ProductDetailsCard";
import useListProductsByID from "../../../hooks/useListProductsByID";
import { useParams } from "react-router";
import { useState } from "react";

function ProductDetails() {
  const [sizeSelected, setSizeSelected] = useState(null);
  const params = useParams();

  const { products, isLoading, error } = useListProductsByID(params.id);

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
        {products?.map((item, index) => (
          <ProductDetailsCard
            key={item._id}
            nameProduct={item.name}
            description={item.description}
            size={item.qtd}
            price={item.price}
            value={index}
            name="group"
            checked={sizeSelected === index}
            onChange={() => setSizeSelected(index)}
          />
        ))}
      </section>
    </main>
  );
}

export default ProductDetails;
