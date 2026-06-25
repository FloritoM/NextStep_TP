"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faRotateRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-xl text-center space-y-6">
        
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-900/30 border border-red-500/30">
          <FontAwesomeIcon icon={faTriangleExclamation} className="h-10 w-10 text-red-500" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            ¡Ups! Algo salió mal
          </h2>
          <p className="text-gray-400 text-sm">
            {error.message || "Tuvimos un problema inesperado procesando tu solicitud."}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => unstable_retry()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4" />
            Intentar nuevamente
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}