const Input = ({
  type = "text",
  label,
  placeholder = "",
  className = "",
  id,
}) => {
  return (
    <>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </>
  );
};

export default Input;
