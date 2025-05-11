import Button from "../../UI/atoms/buttons/Button";
import useLoggedUser from "../../../hooks/useLoggedUser";
import useLogOutUser from "../../../hooks/useLogOutUser";

function EditAccount() {
  const { user, isLoading, error } = useLoggedUser();
  const { logout } = useLogOutUser();

  {
    isLoading && <p className="text-center mt-4">Carregando dados...</p>;
  }

  {
    error && <p className="text-center mt-4">Erro ao carregar usuário</p>;
  }

  {
    !user && <p className="text-center mt-4">Usuário não encontrado</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6">
          Conta
        </h1>

        <div className="flex flex-col gap-4 text-gray-700">
          <p>
            <strong>Nome:</strong> {user.displayName || user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <Button className="w-full mt-4" onClick={logout}>
            Sair
          </Button>
        </div>
      </section>
    </main>
  );
}

export default EditAccount;
