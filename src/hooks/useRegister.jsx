import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";

const sendUserData = async (userData) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const res = await axios.post(`${apiUrl}user/create`, userData);

  return res.data;
};

const userRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendUserData,
    onSuccess() {
      alert("Cadastro realizado com sucesso!!");
      navigate("/login");
    },
    onError() {
      navigate("/cadastro");
    },
  });

  return {
    registerUser: mutation.mutate,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export default userRegister;
