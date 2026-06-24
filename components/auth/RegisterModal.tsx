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
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
    >
      <div
        className="bg-gray-800 p-8 rounded-xl border border-gray-400 box-border w-[500px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >

        <StepIndicator step={step} />

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
    <div className="flex items-center justify-between w-full mb-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${i < current
                ? "bg-amber-600 text-white"
                : i === current
                  ? "bg-amber-600 text-white ring-2 ring-amber-600/30 ring-offset-2 ring-offset-gray-800"
                  : "bg-gray-700 text-gray-400 border border-gray-600"
                }`}
            >
              {i < current ? (
                <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-[12px] whitespace-nowrap transition-colors ${i === current ? "text-amber-500" : "text-gray-500"
              }`}>
              {labels[i]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mb-4 transition-colors duration-300 ${i < current ? "bg-amber-600" : "bg-gray-600"
              }`} />
          )}
        </div>
      ))}
    </div>
  );
}