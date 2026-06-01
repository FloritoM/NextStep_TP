import * as z from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'El nom debe tener al menos 8 caracteres' })
    .trim(),
  email: z.email({ error: 'Ingresar un email válido' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Debe tener al menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { error: 'Contiene al menos una letra' })
    .regex(/[0-9]/, { error: 'Contiene al menos un numero' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contiene al menos un caracter especial',
    })
    .trim(),
})

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'applicant' | 'recruiter';
  createdAt: Date;
  updatedAt: Date;
};
