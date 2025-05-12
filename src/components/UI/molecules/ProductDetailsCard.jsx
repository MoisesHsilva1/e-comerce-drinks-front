import Button from "../atoms/buttons/Button";

const ProductDetailsCard = ({ nameProduct, description, size, price }) => {
  return (
    <>
      <section className="bg-white rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2 gap-0">
        <figure className="w-full h-72 md:h-auto">
          <img
            src=""
            alt="Imagem do produto"
            className="w-full h-full object-cover bg-gray-200"
          />
        </figure>

        <div className="flex flex-col justify-between p-6 md:p-10 gap-6">
          <div className="flex flex-col gap-4">
            <div className="text-center md:text-left">
              <h1 className="font-semibold text-2xl md:text-3xl">
                {nameProduct}
              </h1>
              <p className="text-[#7A8280] text-base mt-1">{description}</p>
            </div>

            <div>
              <h2 className="font-medium text-lg mb-2">Tamanho</h2>
              <span className="block bg-gray-100 p-3 rounded-lg text-center md:text-left text-base font-medium">
                {size}
              </span>
            </div>
          </div>

          <div className="bg-[#F1F8F4] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl border border-[#D6E8DE]">
            <div className="text-center md:text-left">
              <p className="text-sm text-[#4E625A]">Preço</p>
              <p className="text-2xl font-bold text-[#1B5E20]">{price}</p>
            </div>
            <Button
              className="w-full md:w-auto min-w-[200px]"
              children="Adicionar ao carrinho"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetailsCard;
