import { getStages } from '../stages.service';

describe('stages.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getStages devuelve etapas', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Postulado' }],
    });

    const result = await getStages('token');
    expect(result[0].name).toBe('Postulado');
  });

  it('getStages lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getStages('token')).rejects.toThrow(Error);
  });

    it('getStages devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    expect(await getStages('token')).toEqual([]);
  });

  it('getStages lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getStages('token')).rejects.toThrow('Error de conexión');
  });
});