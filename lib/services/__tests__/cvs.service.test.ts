import { getLatestCvByUser, uploadCv } from '../cvs.service';

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
    await expect(getLatestCvByUser(1, 'token')).rejects.toThrow(Error);
  });

  it('getLatestCvByUser lanza Error de conexión si fetch falla con valor no-Error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getLatestCvByUser(1, 'token')).rejects.toThrow('Error de conexión');
  });

  it('uploadCv sube el archivo correctamente', async () => {
    const file = new File(['contenido'], 'cv.pdf', { type: 'application/pdf' });
    const mockResponse = {
      data: { originalName: 'cv.pdf', directory: 'uploads/cv', storedName: 'abc.pdf' },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await uploadCv(file, 5, 'token');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/cv/upload',
      expect.objectContaining({
        method: 'POST',
        headers: { Authorization: 'Bearer token' },
      }),
    );
  });

  it('uploadCv lanza error con mensaje del servidor', async () => {
    const file = new File(['x'], 'cv.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Archivo muy grande' }),
    });

    await expect(uploadCv(file, 5, 'token')).rejects.toThrow('Archivo muy grande');
  });

  it('uploadCv usa mensaje por defecto si no hay message', async () => {
    const file = new File(['x'], 'cv.pdf', { type: 'application/pdf' });

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(uploadCv(file, 5, 'token')).rejects.toThrow('Error al subir el CV');
  });

  it('uploadCv lanza Error de conexión si fetch falla', async () => {
    const file = new File(['x'], 'cv.pdf', { type: 'application/pdf' });
    (global.fetch as jest.Mock).mockRejectedValueOnce('red');

    await expect(uploadCv(file, 5, 'token')).rejects.toThrow('Error de conexión');
  });
});