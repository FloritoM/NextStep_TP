import * as z from 'zod'

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    .trim(),
  email: z
    .email({ message: 'Ingresar un email válido' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'La contraseña debe tener al menos una letra' })
    .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
    .regex(/[^a-zA-Z0-9]/, { message: 'La contraseña debe tener al menos un caracter especial' })
    .trim(),
})

export type User = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: {
    id: number;
    name: Roles;
    isDefault?: boolean;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export interface JobOffer {
  id: number;
  title: string;
  seniority: Seniority;
  description: string;
  isActive: boolean;
}

export enum Roles {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
  RECRUITER = 'recruiter'
}

export type Seniority = {
  id: number;
  name: string;
}

export type AuditLog = {
  id: number;
  userId: number;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string | Date;
};