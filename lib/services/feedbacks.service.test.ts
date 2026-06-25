import {
  getFeedbackByApplication,
  getMyFeedbacks,
  getMyFeedback,
  getMySentFeedbacks,
  createFeedback,
  updateFeedback,
  generatePublicFeedback,
  generateFeedbackForOne,
} from './feedbacks.service';

describe('feedbacks.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getFeedbackByApplication devuelve feedbacks', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    const result = await getFeedbackByApplication(1, 'token');
    expect(result).toHaveLength(1);
  });

  it('getFeedbackByApplication lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getFeedbackByApplication(1, 'token')).rejects.toThrow(Error);
  });

  it('getMyFeedbacks devuelve feedbacks del applicant', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    const result = await getMyFeedbacks('token');
    expect(result).toHaveLength(1);
  });

  it('getMyFeedbacks lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getMyFeedbacks('token')).rejects.toThrow(Error);
  });

  it('getMyFeedback devuelve feedback por aplicación', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, publicFeedback: 'Bien' }],
    });

    const result = await getMyFeedback('token', 5);
    expect(result).toHaveLength(1);
  });

  it('getMyFeedback devuelve array vacío si la respuesta es exitosa pero no trae datos', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const result = await getMyFeedback('token', 5);
    expect(result).toEqual([]);
  });

  it('getMyFeedback lanza error si falla la solicitud', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getMyFeedback('token', 5)).rejects.toThrow(Error);
  });

  it('getMySentFeedbacks devuelve feedbacks enviados', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }],
    });

    const result = await getMySentFeedbacks('token');
    expect(result).toHaveLength(1);
  });

  it('getMySentFeedbacks lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error' }),
    });

    await expect(getMySentFeedbacks('token')).rejects.toThrow(Error);
  });

  it('createFeedback crea feedback', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 10 }),
    });

    const result = await createFeedback({ comment: 'Ok' }, 'token');
    expect(result.id).toBe(10);
  });

  it('createFeedback lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(createFeedback({}, 'token')).rejects.toThrow(Error);
  });

  it('updateFeedback actualiza feedback', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, comment: 'Nuevo' }),
    });

    const result = await updateFeedback(1, { comment: 'Nuevo' }, 'token');
    expect(result.comment).toBe('Nuevo');
  });

  it('updateFeedback lanza error con mensaje del servidor', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'No permitido' }),
    });

    await expect(updateFeedback(1, {}, 'token')).rejects.toThrow(Error);
  });

  it('generatePublicFeedback genera feedback público', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ publicFeedback: 'Generado' }),
    });

    const result = await generatePublicFeedback(1, 'token');
    expect(result.publicFeedback).toBe('Generado');
  });

  it('generatePublicFeedback lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'IA no disponible' }),
    });

    await expect(generatePublicFeedback(1, 'token')).rejects.toThrow(Error);
  });

  it('generateFeedbackForOne genera feedback individual', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, publicFeedback: 'OK' }),
    });

    const result = await generateFeedbackForOne(1, 'token');
    expect(result.publicFeedback).toBe('OK');
  });

  it('generateFeedbackForOne lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Falló' }),
    });

    await expect(generateFeedbackForOne(1, 'token')).rejects.toThrow(Error);
  });
});