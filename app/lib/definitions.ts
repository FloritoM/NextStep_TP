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
  isActive: boolean;
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
  user: { id: number } | null;
  action: string;
  entity: string;
  entityId: number;
  createdAt: string | Date;
};

export type Stage = {
  id: number;
  name: string;
  sequenceOrder: number;
  isTerminal: boolean;
};

export type JobApplication = {
  id: number;
  jobOffer: JobOffer;
  currentStage: Stage;
  cvPath: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Feedback = {
  id: number;
  application: { id: number };
  recruiter: { id: number; firstName: string; lastName: string };
  stage: Stage;
  technicalScore: number | null;
  softSkillsScore: number | null;
  comment: string | null;
  internalNotes: string | null;
  publicFeedback: string | null;
  createdAt: string;
}

export type JobOfferLog = {
  id: number;
  description: string;
  recruiterId: number;
  isActive: boolean;
  title: string;
  seniorityId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
};