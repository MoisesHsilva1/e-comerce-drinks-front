import Button from "../atoms/buttons/Button";
import SelectInput from "../atoms/inputs/SelectInput";

const ProductDetailsCard = ({
  nameProduct,
  description,
  size,
  price,
  onChange,
  checked,
  name,
  src,
  onClick,
  disabled,
}) => {
  return (
    <section className="bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10">
      <figure className="w-full h-72 md:h-auto rounded-3xl overflow-hidden">
        <img
          src={src}
          alt="Imagem do produto"
          className="w-full h-full object-cover bg-gray-200"
        />
      </figure>
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-center md:text-left">
            <h1 className="font-semibold text-2xl md:text-3xl">
              {nameProduct}
            </h1>
            <p className="text-[#7A8280] text-base mt-1">{description}</p>
          </div>
          <div>
            <h2 className="font-medium text-lg mb-2">Tamanho</h2>
            <div className="flex gap-4">
              {Object.entries(size).map(([key, val]) => (
                <SelectInput
                  key={key}
                  value={key}
                  name={name}
                  checked={checked === key}
                  onChange={() => onChange(key)}
                >
                  {`${key.toUpperCase()}: ${val}ml`}
                </SelectInput>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#F1F8F4] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl border border-[#D6E8DE]">
          <div className="text-center md:text-left">
            <p className="text-sm text-[#4E625A]">Preço</p>
            <p className="text-2xl font-bold text-[#1B5E20]">R$ {price}</p>
          </div>
          <Button
            disabled={disabled}
            onClick={onClick}
            className="w-full mb-10 md:w-auto min-w-[200px]"
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsCard;
