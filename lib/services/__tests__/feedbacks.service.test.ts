import {
  getFeedbackByApplication,
  getMyFeedbacks,
  getMyFeedback,
  getMySentFeedbacks,
  createFeedback,
  updateFeedback,
  generatePublicFeedback,
  generateFeedbackForOne,
} from '../feedbacks.service';

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

    // --- Array.isArray ? data : [] ---
  it('getFeedbackByApplication devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    expect(await getFeedbackByApplication(1, 'token')).toEqual([]);
  });

  it('getMyFeedbacks devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpected: true }),
    });
    expect(await getMyFeedbacks('token')).toEqual([]);
  });

  it('getMyFeedback devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    expect(await getMyFeedback('token', 5)).toEqual([]);
  });

  it('getMySentFeedbacks devuelve array vacío si no es array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    expect(await getMySentFeedbacks('token')).toEqual([]);
  });

  // --- getMySentFeedbacks: ramas de error ---
  it('getMySentFeedbacks une mensajes en array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: ['Error 1', 'Error 2'] }),
    });
    await expect(getMySentFeedbacks('token')).rejects.toThrow('Error 1, Error 2');
  });

  it('getMySentFeedbacks usa mensaje por defecto', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    await expect(getMySentFeedbacks('token')).rejects.toThrow('Error al obtener los feedbacks');
  });

  it('getMySentFeedbacks maneja json inválido en error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => { throw new Error('parse fail'); },
    });
    await expect(getMySentFeedbacks('token')).rejects.toThrow('Error al obtener los feedbacks');
  });

  // --- mensajes por defecto ---
  it('updateFeedback usa mensaje por defecto', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    await expect(updateFeedback(1, {}, 'token')).rejects.toThrow('Error al actualizar el feedback');
  });

  it('generatePublicFeedback usa mensaje por defecto', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    await expect(generatePublicFeedback(1, 'token')).rejects.toThrow('Error al generar el feedback');
  });

  it('generateFeedbackForOne usa mensaje por defecto', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    await expect(generateFeedbackForOne(1, 'token')).rejects.toThrow('Error al generar el feedback');
  });

  // --- Error de conexión ---
  const connectionErrorCases: Array<{ name: string; fn: () => Promise<unknown> }> = [
    { name: 'getFeedbackByApplication', fn: () => getFeedbackByApplication(1, 'token') },
    { name: 'getMyFeedbacks', fn: () => getMyFeedbacks('token') },
    { name: 'getMyFeedback', fn: () => getMyFeedback('token', 5) },
    { name: 'getMySentFeedbacks', fn: () => getMySentFeedbacks('token') },
    { name: 'createFeedback', fn: () => createFeedback({}, 'token') },
    { name: 'updateFeedback', fn: () => updateFeedback(1, {}, 'token') },
    { name: 'generatePublicFeedback', fn: () => generatePublicFeedback(1, 'token') },
    { name: 'generateFeedbackForOne', fn: () => generateFeedbackForOne(1, 'token') },
  ];

  it.each(connectionErrorCases)('$name lanza Error de conexión', async ({ fn }) => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(fn()).rejects.toThrow('Error de conexión');
  });



  // --- Error de conexión (catch no-Error) ---
  it('getFeedbackByApplication lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getFeedbackByApplication(1, 'token')).rejects.toThrow('Error de conexión');
  });

  it('getMyFeedbacks lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getMyFeedbacks('token')).rejects.toThrow('Error de conexión');
  });

  it('getMyFeedback lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getMyFeedback('token', 5)).rejects.toThrow('Error de conexión');
  });

  it('getMySentFeedbacks lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(getMySentFeedbacks('token')).rejects.toThrow('Error de conexión');
  });

  it('createFeedback lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(createFeedback({}, 'token')).rejects.toThrow('Error de conexión');
  });

  it('updateFeedback lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(updateFeedback(1, {}, 'token')).rejects.toThrow('Error de conexión');
  });

  it('generatePublicFeedback lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(generatePublicFeedback(1, 'token')).rejects.toThrow('Error de conexión');
  });

  it('generateFeedbackForOne lanza Error de conexión', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce('timeout');
    await expect(generateFeedbackForOne(1, 'token')).rejects.toThrow('Error de conexión');
  });


});