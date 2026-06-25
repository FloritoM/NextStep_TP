import { getLatestCvByUser } from './cvs.service';

describe('cvs.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getLatestCvByUser devuelve CV parseado', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify({ id: '1', originalName: 'cv.pdf' }),
    });

    const result = await getLatestCvByUser(1, 'token');
    expect(result?.originalName).toBe('cv.pdf');
  });

  it('getLatestCvByUser devuelve null si body vacío', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => '',
    });

    const result = await getLatestCvByUser(1, 'token');
    expect(result).toBeNull();
  });

  it('getLatestCvByUser lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getLatestCvByUser(1, 'token')).rejects.toThrow('Error al obtener el CV');
  });
});