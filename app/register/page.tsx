"use client";

import { useRouter } from "next/navigation";
import RegisterModal from "@/components/auth/RegisterModal";

export default function RegisterPage() {
  const router = useRouter();

  function handleClose() {
    router.push("/");
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login-background.png')" }}
    >
      <RegisterModal onClose={handleClose} />
    </div>
  );
}