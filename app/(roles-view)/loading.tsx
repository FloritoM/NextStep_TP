export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-main">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
        <p className="text-gray-300 font-semibold">Loading...</p>
      </div>
    </div>
  );
}