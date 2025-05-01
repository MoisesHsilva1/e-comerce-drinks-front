const Button = ({
  type = "button",
  className = "",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      className={`bg-[#1B5E20] w-8 h-8 text-white font-bold border rounded-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
