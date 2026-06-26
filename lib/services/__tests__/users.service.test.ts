import { getUsers, 
  getUserById,
  updateUser,
  toggleUserActive,
} from '../users.service';

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
  // --- getUsers (ya los tenés, opcional: verificar fetch) ---
  it('getUsers llama a la URL correcta', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    await getUsers('mi-token');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/users',
      expect.objectContaining({
        cache: 'no-store',
        headers: { Authorization: 'Bearer mi-token' },
      }),
    );
  });
  // --- getUserById ---
  it('getUserById devuelve el usuario', async () => {
    const mockUser = { id: 1, email: 'a@b.com' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });
    const result = await getUserById('token', '1');
    expect(result).toEqual(mockUser);
  });
  it('getUserById lanza error si la API falla', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getUserById('token', '1')).rejects.toThrow('Error al obtener el usuario');
  });
  it('getUserById propaga error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network'));
    await expect(getUserById('token', '1')).rejects.toThrow('network');
  });
  
  

  

