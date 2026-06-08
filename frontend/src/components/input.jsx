const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-xs font-semibold text-purple-600 mb-1 bg-white px-1 absolute ml-3 -mt-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-slate-300 rounded-md px-3 py-3 text-sm outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all bg-transparent"
        {...props}
      />
    </div>
  );
};

export default Input;