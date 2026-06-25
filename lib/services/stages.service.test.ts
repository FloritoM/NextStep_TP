import { getStages } from './stages.service';

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
    await expect(getStages('token')).rejects.toThrow('Error al obtener las etapas');
  });
});