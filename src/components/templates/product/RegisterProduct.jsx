import { useState } from "react";
import Button from "../../UI/atoms/buttons/Button";
import Input from "../../UI/atoms/inputs/Input";
import InputImage from "../../UI/atoms/inputs/InputImage";
import useCreateProduct from "../../../hooks/useCreateProduct";
import toast, { Toaster } from "react-hot-toast";

function RegisterProduct() {
  const [image, setImage] = useState(null);
  const [inputValues, setInputsValue] = useState({
    name: "",
    description: "",
    qtd: { M: "", G: "", P: "" },
    price: "",
    image: null,
  });

  const { createProduct } = useCreateProduct({
    onSuccess: () => {
      toast.success("Produto criado com successo!!");
    },
    onError: () => {
      toast.error(`Erro ao criar o produto`);
    },
  });

  const handleChangeInputs = (e) => {
    const keys = e.target.name.split(".");
    const value = e.target.value;

    setInputsValue((prev) =>
      keys.length === 2
        ? {
            ...prev,
            [keys[0]]: {
              ...prev[keys[0]],
              [keys[1]]: value,
            },
          }
        : {
            ...prev,
            [keys[0]]: value,
          }
    );
  };

  const handleImageChange = (file) => {
    setImage(file);
    setInputsValue((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const sendProductData = (e) => {
    e.preventDefault();

    const formData = {
      name: inputValues.name,
      description: inputValues.description,
      price: inputValues.price,
      qtd: {
        m: Number(inputValues.qtd.m),
        g: Number(inputValues.qtd.g),
        p: Number(inputValues.qtd.p),
      },
      image: image,
    };

    createProduct(formData);

    setInputsValue({
      name: "",
      description: "",
      qtd: { m: "", g: "", p: "" },
      price: "",
      image: null,
    });
    setImage(null);
  };

  return (
    <main className="p-4">
      <section className="flex flex-col items-center min-h-screen py-8">
        <Toaster/>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Cadastro de Produtos
        </h1>
        <form
          className="w-full max-w-md flex flex-col gap-4"
          onSubmit={sendProductData}
        >
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
            name="qtd.m"
            label="Quantidade (tamanho medio)"
            placeholder="Ex: 500"
            value={inputValues.qtd.m}
            onChange={handleChangeInputs}
          />
          <Input
            type="number"
            name="qtd.g"
            label="Quantidade (tamanho grande)"
            placeholder="Ex: 1000"
            value={inputValues.qtd.g}
            onChange={handleChangeInputs}
          />
          <Input
            type="number"
            name="qtd.p"
            label="Quantidade (tamanho pequeno)"
            placeholder="Ex: 1500"
            value={inputValues.qtd.p}
            onChange={handleChangeInputs}
          />
          <Input
            type="number"
            name="price"
            label="Preço do produto"
            placeholder="Digite o preço do produto"
            value={inputValues.price}
            onChange={handleChangeInputs}
          />
          <InputImage name="image" value={image} onChange={handleImageChange} />
          <Button type="submit" children="Cadastrar" className="w-full" />
        </form>
      </section>
    </main>
  );
}

export default RegisterProduct;
