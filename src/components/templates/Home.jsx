import ProductCard from "../UI/molecules/ProductCard";

function Home() {
  return (
    <>
      <main>
        <h1 className="text-black text-4xl font-bold p-4 mt-2">
          Nossos Produtos
        </h1>
        <section className="flex flex-wrap gap-2 p-2">
          <ProductCard nameProduct="Produto teste" src="public/assents/imageHome.webp" price="R$1" />
        </section>
      </main>
    </>
  );
}
export default Home;
