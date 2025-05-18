const ProductDeliveryCard = ({
  nameUser,
  telphoneUser,
  addressUser,
  order,
  nameProduct,
  productSize,
}) => {
  return (
    <section className="w-full max-w-xl mx-auto bg-yellow-200 rounded-2xl shadow-lg p-6 flex flex-col gap-4 text-sm sm:text-base">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <span className="text-gray-800 font-semibold">
          Pedido: <span className="font-normal">{order}</span>
        </span>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          Informações do comprador
        </h2>
        <p>
          <span className="font-semibold">Nome:</span> {nameUser}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {telphoneUser}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Produto</h2>
        <p>
          <span className="font-semibold">Nome:</span> {nameProduct}
        </p>
        <p>
          <span className="font-semibold">Tamanho:</span> {productSize}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          Informações sobre entrega
        </h2>
        <p>
          <span className="font-semibold">Endereço:</span> {addressUser}
        </p>
      </div>
    </section>
  );
};

export default ProductDeliveryCard;
