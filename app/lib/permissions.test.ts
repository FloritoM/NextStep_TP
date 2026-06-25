import { canApplyToJobOffer, canCreateJobOffer } from '@/app/lib/permissions';
import { Roles, User } from '@/lib/definitions';

const baseUser = (role: Roles): User => ({
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  role: { id: 1, name: role },
  isActive: true,
});

describe('permissions', () => {
  describe('canCreateJobOffer', () => {
    it('devuelve true para recruiter', () => {
      expect(canCreateJobOffer(baseUser(Roles.RECRUITER))).toBe(true);
    });

    it('devuelve false para applicant', () => {
      expect(canCreateJobOffer(baseUser(Roles.APPLICANT))).toBe(false);
    });

    it('devuelve false para admin', () => {
      expect(canCreateJobOffer(baseUser(Roles.ADMIN))).toBe(false);
    });

    it('devuelve false si el usuario es null', () => {
      expect(canCreateJobOffer(null)).toBe(false);
    });

    it('devuelve false si no tiene rol', () => {
      const user = {
        ...baseUser(Roles.RECRUITER),
        role: undefined as unknown as User['role'],
      };
      expect(canCreateJobOffer(user)).toBe(false);
    });
  });

  describe('canApplyToJobOffer', () => {
    it('devuelve true para applicant', () => {
      expect(canApplyToJobOffer(baseUser(Roles.APPLICANT))).toBe(true);
    });

    it('devuelve false para recruiter', () => {
      expect(canApplyToJobOffer(baseUser(Roles.RECRUITER))).toBe(false);
    });

    it('devuelve false si el usuario es undefined', () => {
      expect(canApplyToJobOffer(undefined)).toBe(false);
    });
  });
});