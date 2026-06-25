import {
  getScorecardsByFeedback,
  createScorecard,
  updateScorecard,
} from '../scorecards.service';

describe('scorecards.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getScorecardsByFeedback devuelve scorecards', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, skillName: 'React' }],
    });

    const result = await getScorecardsByFeedback(1, 'token');
    expect(result[0].skillName).toBe('React');
  });

  it('getScorecardsByFeedback lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(getScorecardsByFeedback(1, 'token')).rejects.toThrow(Error);
  });

  it('createScorecard crea scorecard', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, score: 4 }),
    });

    const result = await createScorecard({ skillName: 'TS', score: 4 }, 'token');
    expect(result.score).toBe(4);
  });

  it('createScorecard lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(createScorecard({}, 'token')).rejects.toThrow(Error);
  });

  it('updateScorecard actualiza scorecard', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, score: 5 }),
    });

    const result = await updateScorecard(1, { score: 5 }, 'token');
    expect(result.score).toBe(5);
  });

  it('updateScorecard lanza error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    await expect(updateScorecard(1, {}, 'token')).rejects.toThrow(Error);
  });
});