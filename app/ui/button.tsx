export function Button({ className, buttonText }: { className: string, buttonText: string }) {
  return (
    <button className={className}>
      <p className="py-4 px-3">{buttonText}</p>
    </button>
  );
}