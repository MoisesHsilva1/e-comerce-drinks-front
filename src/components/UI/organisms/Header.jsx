import IconSearch from "../atoms/icons/IconSearch";
import IconMoreOptions from "../atoms/icons/IconMoreOptions";

function Header() {
  return (
    <>
      <header>
        <section className="flex justify-between items-center bg-white w-full h-12 p-4">
          <IconMoreOptions />
          <IconSearch />
        </section>
      </header>
    </>
  );
}
export default Header;
