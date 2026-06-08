const Button = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-12 rounded-md font-medium ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;