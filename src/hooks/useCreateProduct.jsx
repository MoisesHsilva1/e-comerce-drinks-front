import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendProductData = async (productData) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  console.log(apiUrl)

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("qtd", JSON.stringify(productData.qtd));
  formData.append("image", productData.image);

  const res = await axios.post(`${apiUrl}/drink/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: sendProductData,
  });

  return {
    createProduct: mutation.mutate,
    error: mutation.error,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};

export default useCreateProduct;
