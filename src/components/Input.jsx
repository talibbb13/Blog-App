import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId;

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 pl-1" htmlFor={String(id)}>
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounded-lg text-black outline-none duration-200 border border-gray-200 w-full ${className}`}
        type={type}
        {...props}
        id={String(id)}
        ref={ref}
      />
    </div>
  );
});

export default Input;
