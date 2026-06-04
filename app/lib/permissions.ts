import { User } from './definitions';
import { Roles } from './definitions';

export function canCreateJobOffer(user: User | null | undefined): boolean {
  if (!user || !user.role) return false;
  return user.role.name === Roles.RECRUITER;
}