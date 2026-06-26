import {
  getJobApplicationsByJobOffer,
  getMyApplications,
  getCandidatesByStage,
  updateJobApplicationStage,
} from '../jobApplications.service';

describe('jobApplications.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getJobApplicationsByJobOffer devuelve postulaciones', async () => {
    const mockData = [{ id: 1 }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getJobApplicationsByJobOffer(4, 'token');
    expect(result).toEqual(mockData);
  });

  it('getJobApplicationsByJobOffer lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getJobApplicationsByJobOffer(4, 'token')).rejects.toThrow(Error);
  });

  it('getMyApplications devuelve mis postulaciones', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 2 }],
    });

    const result = await getMyApplications('token');
    expect(result).toHaveLength(1);
  });

  it('getMyApplications lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getMyApplications('token')).rejects.toThrow(Error);
  });

  it('getCandidatesByStage devuelve candidatos', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Postulado: 3 }),
    });

    const result = await getCandidatesByStage('token');
    expect(result.Postulado).toBe(3);
  });

  it('getCandidatesByStage lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Sin permisos' }),
    });

    await expect(getCandidatesByStage('token')).rejects.toThrow(Error);
  });

  it('updateJobApplicationStage actualiza etapa', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, stageId: 2 }),
    });

    const result = await updateJobApplicationStage(1, 2, 'token');
    expect(result.stageId).toBe(2);
  });

  it('updateJobApplicationStage lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Etapa inválida' }),
    });

    await expect(updateJobApplicationStage(1, 99, 'token')).rejects.toThrow(Error);
  });
    it('getJobApplicationsByJobOffer devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    expect(await getJobApplicationsByJobOffer(4, 'token')).toEqual([]);
  });

  it('getMyApplications devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpected: true }),
    });
    expect(await getMyApplications('token')).toEqual([]);
  });

  it('getJobApplicationsByJobOffer lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getJobApplicationsByJobOffer(4, 'token')).rejects.toThrow('Error de conexión');
  });

  it('getMyApplications lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getMyApplications('token')).rejects.toThrow('Error de conexión');
  });

  it('getCandidatesByStage lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getCandidatesByStage('token')).rejects.toThrow('Error de conexión');
  });

  it('updateJobApplicationStage lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(updateJobApplicationStage(1, 2, 'token')).rejects.toThrow('Error de conexión');
  });


});