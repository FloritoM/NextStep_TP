import { RegisterPayLoad } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerWithEmail(payload: RegisterPayLoad) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      password: payload.password,
      roleName: payload.role,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al registrarse");
  }

  return res.json();
}

export function isAdult(birth_date: string): boolean {
  const birth = new Date(birth_date);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
}