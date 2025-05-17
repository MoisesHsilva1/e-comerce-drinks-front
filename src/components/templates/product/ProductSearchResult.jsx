import { useNavigate, useParams } from "react-router";
import useFindProductsByName from "../../../hooks/useFindProductByName";
import ProductCard from "../../UI/molecules/ProductCard";

function ProductSearchResult() {
  const params = useParams();
  const navigate = useNavigate();

  const { products, error, isLoading } = useFindProductsByName(params.name);

  return (
    <main className="flex justify-center px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <section className="w-full max-w-7xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center md:text-left text-gray-900">
          Resultado da pesquisa:
        </h1>

        {isLoading && (
          <p className="text-center text-gray-600 mb-6">Carregando...</p>
        )}
        {error && (
          <p className="text-center text-red-600 mb-6">
            Ocorreu um erro ao buscar os produtos.
          </p>
        )}

        <div
          className="
           grid
           grid-cols-2
           sm:grid-cols-2
           md:grid-cols-3
           lg:grid-cols-4
           xl:grid-cols-5
           gap-2 md:gap-4 lg:gap-3 xl:gap-2
         "
        >
          {products?.map((item) => (
            <ProductCard
              key={item._id}
              nameProduct={item.name}
              src={item.image}
              price={item.price}
              onClick={() => navigate(`/bebida/${item._id}`)}
              className="w-full"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductSearchResult;
