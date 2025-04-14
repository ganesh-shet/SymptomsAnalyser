export function Textarea({ className = "", ...props }) {
  return <textarea className={`border p-2 rounded w-full min-h-[100px] ${className}`} {...props} />;
}