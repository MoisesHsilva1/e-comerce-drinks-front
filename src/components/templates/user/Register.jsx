import { useNavigate } from "react-router";
import Input from "../../UI/atoms/inputs/Input";
import Button from "../../UI/atoms/buttons/Button";

function Register() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100  px-4">
      <section className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6">
          Cadastro
        </h1>
        <form className="w-full flex flex-col gap-4">
          <Input
            type="text"
            label="Nome"
            placeholder="Digite seu nome completo"
          />
          <Input type="email" label="Email" placeholder="Digite seu e-mail" />
          <Input type="tel" label="Telefone" placeholder="(00)00000-0000" />
          <Input type="password" label="Senha" placeholder="Digite sua senha" />
          <Input
            type="password"
            label="Confirmar senha"
            placeholder="Digite sua senha novamente"
          />
          <Button
            children="Cadastrar"
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
