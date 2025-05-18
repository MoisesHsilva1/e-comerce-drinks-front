import ProductDeliveryCard from "../../UI/molecules/ProductDeliveryCard";
import useListProductsPurchases from "../../../hooks/useListProductsPurchases";

function ProductDelivery() {
  const { productsPurchases, error, isLoading } = useListProductsPurchases();

  if (isLoading)
    return <p className="text-center mt-4">Carregando entregas...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">
        Erro ao carregar entregas.
      </p>
    );

  return (
    <main className="flex flex-col items-center px-4 py-6 min-h-screen gap-6">
      <h1 className="text-2xl font-bold text-center">Entregas de produtos</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {productsPurchases.map((item, index) => {
          const productsDescription = item.drink
            .map(
              (product) =>
                `${product.name} (Qtd: ${product.quantity.toString() || "1"})`
            )
            .join(", ");

          const totalQuantity = item.drink.reduce(
            (sum, product) => sum + (product.quantity || 1),
            0
          );

          return (
            <ProductDeliveryCard
              key={item._id}
              nameUser={item.user.name}
              telphoneUser={item.user.email}
              order={index + 1}
              addressUser={item.delivery}
              nameProduct={productsDescription}
              productSize={totalQuantity.toString()}
            />
          );
        })}
      </section>
    </main>
  );
}

export default ProductDelivery;
