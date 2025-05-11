import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import authFirebase from "../config/firebase";
import axios from "axios";

const loginUserData = async ({ email, password }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const userCredential = await signInWithEmailAndPassword(
    authFirebase,
    email,
    password
  );

  const idToken = await userCredential.user.getIdToken();

  const response = await axios.post(
    `${apiUrl}user/login`,
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      data: { email },
    }
  );

  return response.data;
};

const useLoginUser = (options) => {
  const mutation = useMutation({
    mutationFn: loginUserData,
    ...options,
  });

  return {
    loginUser: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
    data: mutation.data,
  };
};

export default useLoginUser;
