import { useNavigate } from "react-router";
import ProductCard from "../UI/molecules/ProductCard";
import useListProducts from "../../hooks/useListProducts";

function Home() {
  const { products, error, isLoading } = useListProducts();

  const navigate = useNavigate()

  return (
    <>
      <main>
        <h1 className="text-black text-4xl font-bold p-4 mt-2">
          Nossos Produtos
        </h1>
        <section className="flex flex-wrap gap-4 p-2">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              nameProduct={product.name}
              src="public/assents/imageHome.webp"
              price={product.price}
              onClick={() => navigate(`/bebida/${product._id}`)}
            />
          ))}
          {error && (
            <p className="text-black text-4xl font-bold p-4 mt-2">
              Produtos com erro
            </p>
          )}
          {isLoading && (
            <p className="text-black text-4xl font-bold p-4 mt-2">Loading...</p>
          )}
        </section>
      </main>
    </>
  );
}
export default Home;
