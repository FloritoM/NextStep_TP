"use client";

import { signIn } from "next-auth/react";
import { UserRole } from "@/types/auth";

interface MethodSelectorProps {
  role: UserRole;
  onManual: () => void;
  onBack: () => void;
}

const roleLabels: Record<UserRole, string> = {
  candidate: "Candidato",
  recruiter: "Reclutador",
};

export default function MethodSelector({ role, onManual, onBack }: MethodSelectorProps) {
  function handleGoogleSignIn() {
    signIn("google", {
      callbackUrl: `/register/complete?role=${role}`,
    });
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1f30] border border-[#1e2d3d] text-[#3b9ede] text-xs font-medium mb-4">
          {roleLabels[role]}
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          ¿Cómo querés registrarte?
        </h1>
        <p className="text-[#8899aa] text-sm">
          Elegí el método que más te convenga
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center gap-4 rounded-2xl border border-[#1e2d3d] bg-[#0d1824] hover:border-[#3b9ede]/50 hover:bg-[#0f1f30] transition-colors duration-200 p-4 cursor-pointer focus:outline-none"
        >
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <GoogleIcon />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-semibold text-sm">
              Continuar con Google
            </p>
            <p className="text-[#6a7f94] text-xs mt-0.5">
              Rápido y seguro, sin contraseña
            </p>
          </div>
        </button>

        {/* Separador */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-[#1e2d3d]" />
          <span className="text-[#4a5a6a] text-xs">o</span>
          <div className="flex-1 h-px bg-[#1e2d3d]" />
        </div>

        {/* Email manual */}
        <button
          onClick={onManual}
          className="w-full flex items-center gap-4 rounded-2xl border border-[#1e2d3d] bg-[#0d1824] hover:border-[#3b9ede]/50 hover:bg-[#0f1f30] transition-colors duration-200 p-4 cursor-pointer focus:outline-none"
        >
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#0a1a28] border border-[#1e2d3d] flex items-center justify-center text-[#3b9ede]">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M2 7l8 5.5L18 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-semibold text-sm">
              Registrarme con email
            </p>
            <p className="text-[#6a7f94] text-xs mt-0.5">
              Nombre, apellido, email, contraseña y fecha de nac.
            </p>
          </div>
        </button>
      </div>

      {/* Botón volver */}
      <button
        onClick={onBack}
        className="mt-6 w-full flex items-center justify-center gap-2 text-[#6a7f94] hover:text-white text-sm transition-colors duration-200 py-2 focus:outline-none rounded-lg"
      >
        Volver a elegir rol
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}