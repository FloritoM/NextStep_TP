'use server';

import { signIn } from '@/auth';
import { signOut } from "@/auth"
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: formData.get('redirectTo') as string || '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'El email o la contraseña ingresados son incorrectos.';
        case 'CallbackRouteError':
          if (error.cause?.err?.message === 'inactive') {
            return 'Tu cuenta está desactivada. Contactá al administrador.';
          }
          if (error.cause?.err?.message === 'server_unavailable') {
            return 'El servidor no está disponible en este momento. Intentá más tarde.';
          }
          return 'Algo salió mal.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}