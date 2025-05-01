import IconHome from "../atoms/icons/IconHome";
import IconCart from "../atoms/icons/IconCart";
import IconUser from "../atoms/icons/IconUser";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-black p-4">
      <section className="flex flex-row justify-between ">
        <button onClick={() => navigate("/")}>
          <IconHome />
        </button>
        <button>
          <IconCart />
        </button>
        <button onClick={() => navigate("/login")}>
          <IconUser />
        </button>
      </section>
    </footer>
  );
}
export default Footer;
