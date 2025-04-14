export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded w-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}