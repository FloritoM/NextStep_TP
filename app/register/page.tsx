"use client";

import { useRouter } from "next/navigation";
import RegisterModal from "@/components/auth/RegisterModal";

export default function RegisterPage() {
  const router = useRouter();

  function handleClose() {
    router.push("/");
  }

  return (
    <div>
      <RegisterModal onClose={handleClose} />
    </div>
  );
}