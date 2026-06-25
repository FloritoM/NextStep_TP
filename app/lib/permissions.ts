import { User } from '../../lib/definitions';
import { Roles } from '../../lib/definitions';

export function canCreateJobOffer(user: User | null | undefined): boolean {
  if (!user || !user.role) return false;
  return user.role.name === Roles.RECRUITER;
}

export function canApplyToJobOffer(user: User | null | undefined): boolean {
  if (!user || !user.role) return false;
  return user.role.name === Roles.APPLICANT;
}