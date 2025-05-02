import { useState, useEffect } from "react";

const InputImage = ({
  value,
  onChange,
  name,
  label = "Selecione imagem do produto",
  accept = "image/*",
}) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(value);
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    onChange?.(file || null);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          name={name}
          className="hidden"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-gray-600 text-sm">{label}</span>
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-h-64 object-cover rounded-xl shadow"
        />
      )}
    </div>
  );
};

export default InputImage;
