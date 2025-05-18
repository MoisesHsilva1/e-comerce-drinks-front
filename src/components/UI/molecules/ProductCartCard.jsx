import ButtonAmount from "../atoms/buttons/ButtonAmount";

const ProductCartCard = ({
  image,
  nameProduct,
  qtdProducts,
  price,
  qtd,
  qtdDown,
  qtdUp,
  onClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm">
      <figure className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="Imagem do Produto"
        />
      </figure>
      <section className="flex flex-col justify-between w-full gap-4">
        <div>
          <h1 className="text-lg font-semibold">{nameProduct}</h1>
          <h2 className="text-lg">R$ {price}</h2>
          <h2 className="text-lg">Tamanho: {qtdProducts}</h2>
        </div>
        <ButtonAmount count={qtd} setCountDown={qtdDown} setCountUp={qtdUp} />
      </section>
      <section>
        <button
          onClick={onClick}
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          Remover
        </button>
      </section>
    </div>
  );
};

export default ProductCartCard;
