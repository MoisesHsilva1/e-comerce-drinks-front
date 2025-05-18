const Input = ({
  type = "text",
  label,
  placeholder = "",
  className = "",
  id,
  value,
  onChange,
  name,
  maxLength,
  disabled,
  onKeyDown,
}) => {
  return (
    <>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        onKeyDown={onKeyDown}
        maxLength={maxLength}
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </>
  );
};

export default Input;
