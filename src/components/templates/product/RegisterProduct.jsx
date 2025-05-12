import { use, useState } from "react";
import Button from "../../UI/atoms/buttons/Button";
import Input from "../../UI/atoms/inputs/Input";
import InputImage from "../../UI/atoms/inputs/InputImage";

function RegisterProduct() {
  const [image, setImage] = useState(null);

  const inputsRegisterProduct = {
    name: "",
    description: "",
    qtd: "",
    price: "",
    image: image,
  };

  const [inputValues, setInputsValue] = useState(inputsRegisterProduct);

  const handleChangeInputs = (e) => {
    setInputsValue({ ...inputValues, [e.target.name]: e.event.value });
  };

  console.log(inputValues)

  return (
    <main className="p-4">
      <section className="flex flex-col items-center min-h-screen py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Cadastro de Produtos
        </h1>

        <form className="w-full max-w-md flex flex-col gap-4">
          <Input
            name="name"
            type="text"
            label="Nome do produto"
            value={inputValues.name}
            onChange={handleChangeInputs}
            placeholder="Digite o nome do seu produto"
          />
          <Input
            type="text"
            name="description"
            label="Descrição do produto"
            placeholder="Digite uma descrição do seu produto"
            value={inputValues.description}
            onChange={handleChangeInputs}
          />
          <Input
            type="number"
            name="qtd"
            label="Quantidade do produto (L/ML)"
            placeholder="Digite a quantidade do produto"
            value={inputValues.qtd}
          />
          <Input
            type="number"
            name="price"
            label="Preço do produto"
            placeholder="Digite o preço do produto"
            value={inputValues.price}
            onChange={handleChangeInputs}
          />
          <InputImage name="image"  value={image} onChange={setImage} />
          <Button children="Cadastrar" className="w-full" />
        </form>
      </section>
    </main>
  );
}

export default RegisterProduct;
