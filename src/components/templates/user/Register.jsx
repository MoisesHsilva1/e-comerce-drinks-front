import { useNavigate } from "react-router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import userRegisterUser from "../../../hooks/useRegisterUser";
import Input from "../../UI/atoms/inputs/Input";
import InputPassword from "../../UI/atoms/inputs/InputPassword";
import Button from "../../UI/atoms/buttons/Button";

function Register() {
  const navigate = useNavigate();

  const [inputsValue, setInputsValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const { registerUser, isError, isLoading } = userRegisterUser({
    onSuccess: () => {
      toast.success("Cadastro realizado!");
      setTimeout(() => navigate("/login"), 1200);
    },
    onError: () => {
      isError && toast.error("Erro ao cadastrar");
    },
  });

  const handleInputsValue = (e) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    const { password, confirmPassword } = inputsValue;

    return password !== confirmPassword
      ? (toast.error("As senhas não coincidem."), false)
      : !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
          password
        )
      ? (toast.error(
          "A senha precisa ter pelo menos 8 caracteres, incluir uma letra maiúscula, uma minúscula, um número e um caractere especial."
        ),
        false)
      : true;
  };

  const handleSubmitRegisterUser = (event) => {
    event.preventDefault();

    if (hasClicked) return;
    if (!validatePassword()) return;

    setHasClicked(true);

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
          <Toaster />
          <Input
            id="name"
            type="text"
            value={inputsValue.name}
            label="Nome"
            name="name"
            onChange={handleInputsValue}
            placeholder="Digite seu nome completo"
          />
          <Input
            id="email"
            type="email"
            value={inputsValue.email}
            label="Email"
            name="email"
            onChange={handleInputsValue}
            placeholder="Digite seu e-mail"
          />
          <InputPassword
            id="password"
            type="password"
            maxLength={8}
            value={inputsValue.password}
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            onChange={handleInputsValue}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          <InputPassword
            type="password"
            id="confirmPassword"
            maxLength={8}
            value={inputsValue.confirmPassword}
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="Digite sua senha novamente"
            onChange={handleInputsValue}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          <Button
            type="submit"
            disabled={
              Object.values(inputsValue).some((value) => value === "") ||
              hasClicked ||
              isLoading
            }
            children={isLoading ? "Cadastrando..." : "Cadastrar"}
            className="w-full h-10"
          />
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
