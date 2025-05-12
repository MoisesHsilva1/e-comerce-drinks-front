import ProductDetailsCard from "../../UI/molecules/ProductDetailsCard";

function ProductDetails() {
  return (
    <main className="bg-[#1B5E20] min-h-screen w-full flex items-center justify-center p-4">
      <section className="w-full max-w-5xl flex flex-col">
        <ProductDetailsCard
          nameProduct="Teste"
          description="teste grande"
          size="M"
          price="123"
        />
      </section>
    </main>
  );
}
export default ProductDetails;
