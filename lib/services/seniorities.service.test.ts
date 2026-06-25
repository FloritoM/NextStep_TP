import { getSeniorities } from './seniorities.service';

describe('seniorities.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getSeniorities devuelve seniorities', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Junior' }],
    });

    const result = await getSeniorities('token');
    expect(result[0].name).toBe('Junior');
  });

  it('getSeniorities lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getSeniorities('token')).rejects.toThrow('Error al obtener los seniorities');
  });
});