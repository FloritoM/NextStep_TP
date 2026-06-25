import {
  getJobOffers,
  getJobOffer,
  getMyOffers,
  toggleJobOfferActive,
  createJobOffer,
  updateJobOffer,
} from './jobOffers.service';

describe('jobOffers.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getJobOffers devuelve vacantes', async () => {
    const mockData = [{ id: 1, title: 'Dev' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getJobOffers('token');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/job-offers',
      expect.objectContaining({ headers: { Authorization: 'Bearer token' } }),
    );
  });

  it('getJobOffers lanza error si falla', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getJobOffers('token')).rejects.toThrow(Error);
  });

  it('getJobOffer devuelve una vacante', async () => {
    const mockJob = { id: 1, title: 'Backend' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockJob,
    });

    const result = await getJobOffer(1, 'token');
    expect(result).toEqual(mockJob);
  });

  it('getJobOffer lanza error si falla', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getJobOffer(1, 'token')).rejects.toThrow(Error);
  });

  it('getMyOffers devuelve mis ofertas', async () => {
    const mockData = [{ id: 1 }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getMyOffers('token');
    expect(result).toEqual(mockData);
  });

  it('getMyOffers lanza error con mensaje del servidor', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'No autorizado' }),
    });

    await expect(getMyOffers('token')).rejects.toThrow(Error);
  });

  it('getMyOffers une mensajes en array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: ['Error 1', 'Error 2'] }),
    });

    await expect(getMyOffers('token')).rejects.toThrow(Error);
  });

  it('toggleJobOfferActive actualiza el estado', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, isActive: false }),
    });

    const result = await toggleJobOfferActive(1, false, 'token');
    expect(result.isActive).toBe(false);
  });

  it('toggleJobOfferActive lanza error si falla', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(toggleJobOfferActive(1, true, 'token')).rejects.toThrow(Error);
  });

  it('createJobOffer crea una vacante', async () => {
    const payload = { title: 'Dev', description: 'Desc', seniorityId: 1 };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, ...payload }),
    });

    const result = await createJobOffer(payload, 'token');
    expect(result.title).toBe('Dev');
  });

  it('createJobOffer lanza error del servidor', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Título duplicado' }),
    });

    await expect(
      createJobOffer({ title: 'X', description: 'Y', seniorityId: 1 }, 'token'),
    ).rejects.toThrow(Error);
  });

  it('updateJobOffer actualiza una vacante', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, title: 'Nuevo título' }),
    });

    const result = await updateJobOffer(1, { title: 'Nuevo título' }, 'token');
    expect(result.title).toBe('Nuevo título');
  });

  it('updateJobOffer lanza error del servidor', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: ['Campo inválido'] }),
    });

    await expect(updateJobOffer(1, { title: '' }, 'token')).rejects.toThrow(Error);
  });
});