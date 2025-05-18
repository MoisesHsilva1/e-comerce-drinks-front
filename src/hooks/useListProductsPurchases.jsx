import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useListProductsPurchases = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    data: productsPurchases = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["listDrinksPurchases"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}/drinkPurchase/list`);
      return data;
    },
  });

  return { productsPurchases, error, isLoading };
};
export default useListProductsPurchases;
