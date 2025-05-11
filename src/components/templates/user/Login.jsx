import { useNavigate } from "react-router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../UI/atoms/buttons/Button";
import Input from "../../UI/atoms/inputs/Input";
import InputPassword from "../../UI/atoms/inputs/InputPassword";
import useLoginUser from "../../../hooks/useLoginUser";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    email: "",
    password: "",
  });
  const [hasClicked, setHasClicked] = useState(false);

  const { loginUser, isLoading } = useLoginUser({
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate("/"), 1100);
    },
    onError: () => {
      toast.error(`Erro ao fazer login, Tente novamente.`);
    },
  });

  const handleChangeInputs = (e) => {
    setInputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (hasClicked) return;

    setHasClicked(true);

    const formData = {
      email: inputsValue.email,
      password: inputsValue.password,
    };

    loginUser(formData);
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-gray-100  px-4">
        <section className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6">
            Login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin}>
            <Toaster />
            <Input
              type="email"
              name="email"
              value={inputsValue.email}
              onChange={handleChangeInputs}
              label="Email"
              placeholder="Digite seu e-mail"
            />
            <InputPassword
              type="password"
              name="password"
              onChange={handleChangeInputs}
              value={inputsValue.password}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
              label="Senha"
              placeholder="Digite sua senha"
            />
            <Button
              type="submit"
              disabled={
                Object.values(inputsValue).some((value) => value === "") ||
                hasClicked ||
                isLoading
              }
              children={isLoading ? "Entrando..." : "Login"}
              className="w-full h-10"
            />
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
