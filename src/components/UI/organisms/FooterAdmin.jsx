import { useNavigate } from "react-router";
import IconDelivery from "../atoms/icons/IconDelivery";
import IconDrink from "../atoms/icons/IconDrink";

function FooterAdmin() {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-black p-4">
      <section className="flex flex-row justify-between ">
        <button onClick={() => navigate("/cadastroProduto")}>
          <IconDrink />
        </button>
        <button onClick={() => navigate("/entregas")}>
          <IconDelivery />
        </button>
      </section>
    </footer>
  );
}
export default FooterAdmin;
