'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'El email o la contraseña ingresados son incorrectos.';
        default:
          return 'Algo salio mal.';
      }
    }
    throw error;
  }
}