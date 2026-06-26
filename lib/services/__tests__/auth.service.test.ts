import { isAdult, registerWithEmail } from '../auth.service';

describe('isAdult', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-25'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('devuelve true si la persona tiene 18 años o más', () => {
    expect(isAdult('2000-01-01')).toBe(true);
  });

  it('devuelve false si la persona es menor de 18', () => {
    expect(isAdult('2010-01-01')).toBe(false);
  });

    it('devuelve false si cumple 18 este año pero aún no llegó el cumpleaños', () => {
    expect(isAdult('2008-06-26')).toBe(false);
  });

  it('devuelve true si cumplió 18 este año y ya pasó el cumpleaños', () => {
    expect(isAdult('2008-06-01')).toBe(true);
  });


});

describe('registerWithEmail', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('envía el payload correcto y devuelve la respuesta', async () => {
    const mockResponse = { id: 1, email: 'juan@email.com' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await registerWithEmail({
      role: 'applicant',
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'Juan@Email.com',
      password: 'Abc1234!',
      birthDate: '2000-01-01',
    });

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/auth/register',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@email.com',
          password: 'Abc1234!',
          roleName: 'applicant',
        }),
      }),
    );
  });

  it('lanza error cuando la API falla', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Email ya registrado' }),
    });

    await expect(
      registerWithEmail({
        role: 'applicant',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@email.com',
        password: 'Abc1234!',
        birthDate: '2000-01-01',
      }),
    ).rejects.toThrow(Error);
  });

    it('usa mensaje por defecto si la API no devuelve message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    await expect(
      registerWithEmail({
        role: 'applicant',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@email.com',
        password: 'Abc1234!',
        birthDate: '2000-01-01',
      }),
    ).rejects.toThrow('Error al registrarse');
  });

  it('lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(
      registerWithEmail({
        role: 'applicant',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@email.com',
        password: 'Abc1234!',
        birthDate: '2000-01-01',
      }),
    ).rejects.toThrow('Error de conexión');
  });

});