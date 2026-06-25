import { Suspense } from "react";
import RegisterCompleteContent from "@/components/auth/RegisterCompleteContent";

export default function RegisterCompletePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl text-center">
          <p className="text-white">Cargando...</p>
        </div>
      </main>
    }>
      <RegisterCompleteContent />
    </Suspense>
  );
}