import { getUsers } from '../users.service';

describe('users.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getUsers devuelve usuarios', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, email: 'a@b.com' }],
    });

    const result = await getUsers('token');
    expect(result).toHaveLength(1);
  });

  it('getUsers lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getUsers('token')).rejects.toThrow(Error);
  });
  
    it('getUsers devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpected: true }),
    });
    expect(await getUsers('token')).toEqual([]);
  });

  it('getUsers lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getUsers('token')).rejects.toThrow('Error de conexión');
  });
});