import { useNavigate } from "react-router";
import Button from "../../UI/atoms/buttons/Button";
import Input from "../../UI/atoms/inputs/Input";
import { use, useState } from "react";

function Login() {
  const navigate = useNavigate();

  const inputsLogin = {
    email: "",
    password: "",
  };

  const [inputsValue, setInputsValue] = useState(inputsLogin);

  const handleChangeInputs = (e) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-gray-100  px-4">
        <section className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6">
            Login
          </h1>
          <form className="flex flex-col gap-4" action="">
            <Input
              type="email"
              name="email"
              value={inputsValue.email}
              onChange={handleChangeInputs}
              label="Email"
              placeholder="Digite seu e-mail"
            />
            <Input
              type="password"
              name="password"
              onChange={handleChangeInputs}
              value={inputsValue.password}
              label="Senha"
              placeholder="Digite sua senha"
            />
            <Button children="Login" className="w-full h-10" />
          </form>
          <span className="flex flex-row gap-2 mt-6">
            <p>Não Tem Uma conta?</p>
            <a className="text-[#2E8B57]" onClick={() => navigate("/cadastro")}>
              Inscrever-se
            </a>
          </span>
        </section>
      </main>
    </>
  );
}
export default Login;
