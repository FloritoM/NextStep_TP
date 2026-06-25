import { getUsers } from './users.service';

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
    await expect(getUsers('token')).rejects.toThrow('Error al obtener los usuarios');
  });
});