import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendProductPurchaseData = async (productPurchaseData) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const res = await axios.post(
    `${apiUrl}/drinkPurchase/save`,
    productPurchaseData
  );

  return res.data;
};

const useSaveProductPurchase = (options) => {
  const mutation = useMutation({
    mutationFn: sendProductPurchaseData,
    ...options
  });

  return {
    saveProductPurchase: mutation.mutate,
    error: mutation.error,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
  };
};

export default useSaveProductPurchase;
