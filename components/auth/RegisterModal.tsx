"use client";

import { useState } from "react";
import RoleSelector from "./RoleSelector";
import MethodSelector from "./MethodSelector";
import RegisterForm from "./RegisterForm";
import { UserRole } from "@/types/auth";

type Step = "role" | "method" | "form";

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  function handleRoleSelect(role: UserRole) {
    setSelectedRole(role);
    setStep("method");
  }

  function handleBack() {
    if (step === "method") setStep("role");
    if (step === "form") setStep("method");
  }

  function handleSuccess() {
    onClose();
  }

  return (
    // Overlay oscuro detrás del modal
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Contenedor del modal — el onClick detiene la propagación para no cerrar al hacer clic adentro */}
      <div
        className="bg-gray-800 p-8 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Indicador de pasos */}
        <StepIndicator step={step} />

        {/* Contenido según el paso actual */}
        <div className="mt-6">
          {step === "role" && (
            <RoleSelector onSelect={handleRoleSelect} />
          )}
          {step === "method" && selectedRole && (
            <MethodSelector
              role={selectedRole}
              onManual={() => setStep("form")}
              onBack={handleBack}
            />
          )}
          {step === "form" && selectedRole && (
            <RegisterForm
              role={selectedRole}
              onSuccess={handleSuccess}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: Step[] = ["role", "method", "form"];
  const labels = ["Tu rol", "Método", "Tus datos"];
  const current = steps.indexOf(step);

  return (
    <div className="flex items-center gap-2 mb-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                i < current
                  ? "bg-amber-600 text-white"
                  : i === current
                  ? "bg-amber-600 text-white ring-2 ring-amber-600/30 ring-offset-2 ring-offset-gray-800"
                  : "bg-gray-700 text-gray-400 border border-gray-600"
              }`}
            >
              {i < current ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-[10px] whitespace-nowrap transition-colors ${
              i === current ? "text-amber-500" : "text-gray-500"
            }`}>
              {labels[i]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-10 h-px mb-4 transition-colors duration-300 ${
              i < current ? "bg-amber-600" : "bg-gray-600"
            }`}/>
          )}
        </div>
      ))}
    </div>
  );
}