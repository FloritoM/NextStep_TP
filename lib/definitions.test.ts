import { SignupFormSchema } from '@/lib/definitions';

describe('SignupFormSchema', () => {
  const validData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@email.com',
    password: 'Abc1234!',
  };

  it('acepta datos válidos', () => {
    const result = SignupFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rechaza nombre corto', () => {
    const result = SignupFormSchema.safeParse({ ...validData, firstName: 'J' });
    expect(result.success).toBe(false);
  });

  it('rechaza email inválido', () => {
    const result = SignupFormSchema.safeParse({ ...validData, email: 'no-es-email' });
    expect(result.success).toBe(false);
  });

  it('rechaza contraseña sin número', () => {
    const result = SignupFormSchema.safeParse({ ...validData, password: 'Abcdefgh!' });
    expect(result.success).toBe(false);
  });

  it('rechaza contraseña sin carácter especial', () => {
    const result = SignupFormSchema.safeParse({ ...validData, password: 'Abc12345' });
    expect(result.success).toBe(false);
  });

  it('rechaza contraseña corta', () => {
    const result = SignupFormSchema.safeParse({ ...validData, password: 'Ab1!' });
    expect(result.success).toBe(false);
  });
});