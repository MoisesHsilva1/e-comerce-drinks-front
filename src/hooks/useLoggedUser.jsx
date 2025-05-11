import { useQuery } from "@tanstack/react-query";
import { getIdToken } from "firebase/auth";
import authFirebase from "../config/firebase";
import axios from "axios";

const fetchLoggedUser = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const currentUser = authFirebase.currentUser;

  if (!currentUser) {
    throw new Error("User not authenfication");
  }

  const idToken = await getIdToken(currentUser, true);

  const response = await axios.get(`${apiUrl}user/logged`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data.user;
};

const useLoggedUser = () => {
  const query = useQuery({
    queryKey: ["loggedUser"],
    queryFn: fetchLoggedUser,
    enabled: !!authFirebase.currentUser,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useLoggedUser;
