import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFindProductsByID = (id) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { data, error, isLoading } = useQuery({
    queryKey: ["listProductsByID", id],
    queryFn: async () => {
      const {data} = await axios.get(`${apiUrl}/drink/findById/${id}`);
      return [data];
    },
  });

  return { products: data, error, isLoading };
};  

export default useFindProductsByID;
