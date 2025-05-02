import { useNavigate } from "react-router";
import Input from "../../UI/atoms/inputs/Input";
import Button from "../../UI/atoms/buttons/Button";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const inputsRegister = {
    name: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  };

  const [inputsValue, setInputsValue] = useState(inputsRegister);

  const handleInputsValue = (e) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  const handleSubmitRegisterUser = (event) => {
    event.preventDefault();
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
            type="number"
            value={inputsValue.tel}
            label="Telefone"
            name="tel"
            placeholder="(00)00000-0000"
            onChange={handleInputsValue}
          />
          <Input
            type="password"
            value={inputsValue.password}
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            onChange={handleInputsValue}
          />
          <Input
            type="password"
            value={inputsValue.confirmPassword}
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="Digite sua senha novamente"
            onChange={handleInputsValue}
          />
          <Button children="Cadastrar" className="w-full h-10" />
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
