export function Button({ className, buttonText }: { className: string, buttonText: string }) {
  return (
    <button className={className}>
        <p className="p-3">{buttonText}</p>   
    </button>
  );
}