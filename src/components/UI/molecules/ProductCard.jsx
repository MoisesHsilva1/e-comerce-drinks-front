import Button from "../atoms/buttons/Button";

const ProductCard = ({
  nameProduct,
  price,
  onClick,
  src,
  alt = "Imagem do produto",
}) => {
  return (
    <main
      onClick={onClick}
      className="flex flex-col w-44 p-2 bg-[#D9D9D9] shadow-md rounded-xl"
    >
      <figure className="w-full">
        <img
          className="w-full h-40 object-cover rounded-t-lg"
          src={src}
          alt={alt}
        />
      </figure>
      <section className="p-2 rounded-b-lg">
        <h1 className="text-lg text-black font-medium">{nameProduct}</h1>
        <div className="flex justify-between items-between">
          <p className="font-semibold text-lg text-black">{price}</p>
          <Button children="+" />
        </div>
      </section>
    </main>
  );
};

export default ProductCard;
