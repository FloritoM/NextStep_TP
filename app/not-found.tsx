import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300 drop-shadow-sm">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Página no encontrada
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe, fue movida o tipeaste mal la dirección.
          </p>
        </div>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg shadow-amber-600/20 hover:shadow-amber-500/30"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}