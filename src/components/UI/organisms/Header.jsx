import { useState } from "react";
import { useNavigate } from "react-router";
import IconSearch from "../atoms/icons/IconSearch";
import Input from "../atoms/inputs/Input";

function Header() {
  const [openInput, setOpenInput] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const navigate = useNavigate();

  const handleOpenInput = () => {
    setOpenInput((prev) => !prev);
  };

  const handleChangeValueSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/buscar/${valueSearch}`);
    }
  };

  return (
    <>
      <header>
        <section className="flex justify-end items-center bg-white w-full h-12 p-4">
          <span className="flex flex-row gap-2">
            <Input
              onKeyDown={handleKeyDown}
              placeholder="Pesquisar bebida"
              disabled={!openInput}
              className={`
                 h-8 transition-all duration-300 ease-in-out transform origin-right
                ${
                  openInput
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-x-0 pointer-events-none"
                }
              `}
              value={valueSearch}
              onChange={handleChangeValueSearch}
            />
            <button onClick={handleOpenInput}>
              <IconSearch />
            </button>
          </span>
        </section>
      </header>
    </>
  );
}
export default Header;
