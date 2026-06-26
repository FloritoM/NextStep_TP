import { RegisterPayLoad } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerWithEmail(payload: RegisterPayLoad) {
  try {
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
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
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

export async function googleLogin(email: string) {
  try {
    const res = await fetch(`${API_URL}/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Error en google-login');
    return res.json();
  } catch (error) {
    console.error('Error en google-login:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}

export async function loginWithCredentials(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return { ok: res.ok, data: await res.json() };
}