"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/types/auth";
import { registerWithEmail } from '@/lib/services/auth.service';

export default function RegisterCompleteContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as UserRole;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !role) {
      router.push("/");
      return;
    }

    async function completeRegistration() {
      try {
        await registerWithEmail({
          firstName: session?.user?.name?.split(" ")[0] || "",
          lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
          email: session?.user?.email || "",
          password: crypto.randomUUID(),
          role: role,
        });

        router.push("/login");
      } catch (err: any) {
        if (err?.message?.includes("409") || err?.message?.includes("ya")) {
          router.push("/login");
          return;
        }
        setError(err instanceof Error ? err.message : "Ocurrió un error");
        setIsLoading(false);
      }
    }

    completeRegistration();
  }, [session, status, role, router]);

  if (error) {
    return (
      <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl text-center">
        <svg className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-white">Completando tu registro...</p>
      </div>
    </main>
  );
}