import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useListProductsByID = (id) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { product, error, isLoading } = useQuery({
    queryKey: ["listProductsByID", id],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}drink/findById/${id}`);
      return data;
    },
  });

  return { product, error, isLoading };
};
export default useListProductsByID;
