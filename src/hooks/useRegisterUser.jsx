import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendUserData = async (userData) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const res = await axios.post(`${apiUrl}/user/create`, userData);

  return res.data;
};

const userRegisterUser = (options) => {
  const mutation = useMutation({
    mutationFn: sendUserData,
    ...options,
  });

  return {
    registerUser: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export default userRegisterUser;
