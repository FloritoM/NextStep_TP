import { getAuditLogs } from './auditLogs.service';

describe('auditLogs.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getAuditLogs devuelve logs', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, action: 'CREATE' }],
    });

    const result = await getAuditLogs('token');
    expect(result[0].action).toBe('CREATE');
  });

  it('getAuditLogs lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getAuditLogs('token')).rejects.toThrow(Error);
  });
});