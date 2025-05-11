import IconEye from "../icons/IconEye";
import IconEyeOff from "../icons/IconEyeOff";

const InputPassword = ({
  label,
  placeholder = "",
  className = "",
  id,
  value,
  onChange,
  htmlFor,
  name,
  maxLength,
  showPassword,
  setShowPassword,
}) => {
  const togglePassword = () => {
    setShowPassword?.((prev) => !prev);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={htmlFor || id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          maxLength={maxLength}
          id={id}
          value={value}
          onChange={onChange}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full px-4 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className}`}
        />

        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label={showPassword ? "Hidden password" : "Show password"}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
