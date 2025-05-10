import { useNavigate } from "react-router";
import { useState } from "react";
import userRegister from "../../../hooks/useRegister";
import Input from "../../UI/atoms/inputs/Input";
import Button from "../../UI/atoms/buttons/Button";

function Register() {
  const navigate = useNavigate();

  const [inputsValue, setInputsValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { registerUser, isError, isLoading, data, error } = userRegister();

  const handleInputsValue = (e) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    inputsValue.password !== inputsValue.confirmPassword
      ? alert("As senhas não coincidem.")
      : "";
  };

  const handleSubmitRegisterUser = (event) => {
    event.preventDefault();

    validatePassword();

    const formData = {
      displayName: inputsValue.name,
      email: inputsValue.email,
      password: inputsValue.confirmPassword,
    };

    registerUser(formData);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100  px-4">
      <section className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6">
          Cadastro
        </h1>
        <form
          onSubmit={handleSubmitRegisterUser}
          className="w-full flex flex-col gap-4"
        >
          <Input
            type="text"
            value={inputsValue.name}
            label="Nome"
            name="name"
            onChange={handleInputsValue}
            placeholder="Digite seu nome completo"
          />
          <Input
            type="email"
            value={inputsValue.email}
            label="Email"
            name="email"
            onChange={handleInputsValue}
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            maxLength={8}
            value={inputsValue.password}
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            onChange={handleInputsValue}
          />
          <Input
            type="password"
            maxLength={8}
            value={inputsValue.confirmPassword}
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="Digite sua senha novamente"
            onChange={handleInputsValue}
          />
          <Button
            type="submit"
            children={isLoading ? "Cadastrando..." : "Cadastrar"}
            className="w-full h-10"
          />
          {isError && (
            <p className="text-red-500 text-sm mt-2">
              Erro ao cadastrar:{" "}
              {error?.response?.data?.message || "Tente novamente."}
            </p>
          )}
        </form>
        <span className="flex flex-row gap-2 mt-6">
          <p>Já tem uma conta?</p>
          <a className="text-[#2E8B57]" onClick={() => navigate("/login")}>
            Faça login
          </a>
        </span>
      </section>
    </main>
  );
}

export default Register;
