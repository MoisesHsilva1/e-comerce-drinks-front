const SelectInput = ({ value, name, checked, onChange, children }) => {
  const inputId = `radio-${value}`;

  return (
    <label htmlFor={inputId} className="block cursor-pointer w-full">
      <input
        type="radio"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`
          w-10 
          border border-gray-300 rounded-lg p-1 text-center
          transition-all duration-200
          peer-checked:bg-green-100
          peer-checked:border-green-600
          peer-checked:font-bold
        `}
      >
        {children}
      </div>
    </label>
  );
};

export default SelectInput;
