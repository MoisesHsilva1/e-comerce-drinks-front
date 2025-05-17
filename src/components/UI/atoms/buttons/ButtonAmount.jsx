const ButtonAmount = ({ className, count, setCountDown, setCountUp }) => {
  return (
    <>
      <section
        className={`flex items-center bg-gray-300 rounded w-36 ${className}`}
      >
        <button
          onClick={setCountDown}
          className="w-10 h-10 flex justify-center items-center text-gray-600"
        >
          –
        </button>

        <p className="flex-1 text-center">{count}</p>

        <button
          onClick={setCountUp}
          className="w-10 h-10 flex justify-center items-center text-gray-600"
        >
          +
        </button>
      </section>
    </>
  );
};
export default ButtonAmount;
