import { useNavigate } from "react-router";
import useLoggedUser from "../../../hooks/useLoggedUser";
import IconHome from "../atoms/icons/IconHome";
import IconCart from "../atoms/icons/IconCart";
import IconUser from "../atoms/icons/IconUser";

function Footer() {
  const navigate = useNavigate();

  const { user } = useLoggedUser();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-black p-4">
      <section className="flex flex-row justify-between ">
        <button onClick={() => navigate("/")}>
          <IconHome />
        </button>
        <button onClick={() => navigate("/carrinho")}>
          <IconCart />
        </button>
        <button onClick={() => navigate(user ? "/editarConta" : "/login")}>
          <IconUser />
        </button>
      </section>
    </footer>
  );
}
export default Footer;
