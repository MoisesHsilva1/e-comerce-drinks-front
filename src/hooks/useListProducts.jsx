import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useListProducts = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["listDrinks"],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}drink/list`);
      return data;
    },
  });

  return { products, error, isLoading };
};
export default useListProducts;
