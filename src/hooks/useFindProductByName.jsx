import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFindProductsByName = (name) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { data, error, isLoading } = useQuery({
    queryKey: ["findProductsByName", name],
    queryFn: async () => {
      const { data } = await axios.get(`${apiUrl}/drink/findByName/${name}`);
      return data;
    },
  });

  return { products: data, error, isLoading };
};
export default useFindProductsByName;
