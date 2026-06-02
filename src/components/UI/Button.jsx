const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  disable = false,
  size= ''
}) => {
  const baseStyles =
    'px-4 py-2 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-cyan-500 text-slate-500 hover:bg-cyan-400',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700',
    outline: 'border border-slate-600 text-white hover:bg-slate-800',
    danger: 'bg-red-500 text-white hover:bg-red-400',
    disable: 'opacity-50 cursor-not-allow',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <>
      <button
        disabled={disable}
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${className} ${sizes[size]}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
