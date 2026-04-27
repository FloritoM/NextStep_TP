export function Button({ className, buttonText }: { className: string, buttonText: string }) {
  return (
    <button className={className}>
        <span className="p-10">{buttonText}</span>   
    </button>
  );
}