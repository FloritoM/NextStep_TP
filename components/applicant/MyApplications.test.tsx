import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyApplications from './MyApplications';

jest.mock('@/lib/services/jobApplications.service', () => ({
  getMyApplications: jest.fn(),
}));

jest.mock('@/lib/services/feedbacks.service', () => ({
  getMyFeedback: jest.fn(),
}));

jest.mock('@/lib/services/scorecards.service', () => ({
  getScorecardsByFeedback: jest.fn(),
}));

import { getMyApplications } from '@/lib/services/jobApplications.service';
import { getMyFeedback } from '@/lib/services/feedbacks.service';
import { getScorecardsByFeedback } from '@/lib/services/scorecards.service';

const mockApp = {
  id: 1,
  createdAt: '2026-01-15T00:00:00.000Z',
  jobOffer: { title: 'Dev Frontend' },
  currentStage: { name: 'Postulado' },
};

describe('MyApplications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra loading y luego las postulaciones', async () => {
    (getMyApplications as jest.Mock).mockResolvedValueOnce([mockApp]);

    render(<MyApplications token="token" />);

    expect(screen.getByText('Cargando postulaciones...')).toBeInTheDocument();
    expect(await screen.findByText('Dev Frontend')).toBeInTheDocument();
  });

  it('muestra mensaje si no hay postulaciones', async () => {
    (getMyApplications as jest.Mock).mockResolvedValueOnce([]);

    render(<MyApplications token="token" />);

    expect(
      await screen.findByText('Todavía no te postulaste a ninguna vacante.'),
    ).toBeInTheDocument();
  });

  it('muestra feedback al expandir una postulación', async () => {
    (getMyApplications as jest.Mock).mockResolvedValueOnce([mockApp]);
    (getMyFeedback as jest.Mock).mockResolvedValueOnce([
      {
        id: 10,
        publicFeedback: 'Muy buen perfil',
        stage: { name: 'Entrevista' },
      },
    ]);
    (getScorecardsByFeedback as jest.Mock).mockResolvedValueOnce([
      { id: 1, skillName: 'React', score: 4, type: 'technical' },
    ]);

    const user = userEvent.setup();
    render(<MyApplications token="token" />);

    await user.click(await screen.findByText('Dev Frontend'));

    expect(await screen.findByText('Muy buen perfil')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('muestra mensaje si no hay feedback', async () => {
    (getMyApplications as jest.Mock).mockResolvedValueOnce([mockApp]);
    (getMyFeedback as jest.Mock).mockResolvedValueOnce([]);

    const user = userEvent.setup();
    render(<MyApplications token="token" />);

    await user.click(await screen.findByText('Dev Frontend'));

    expect(
      await screen.findByText('Todavía no recibiste feedback para esta postulación.'),
    ).toBeInTheDocument();
  });

  it('colapsa la postulación al volver a hacer click', async () => {
    (getMyApplications as jest.Mock).mockResolvedValueOnce([mockApp]);
    (getMyFeedback as jest.Mock).mockResolvedValueOnce([]);

    const user = userEvent.setup();
    render(<MyApplications token="token" />);

    const card = await screen.findByText('Dev Frontend');
    await user.click(card);
    expect(await screen.findByText(/Todavía no recibiste feedback/)).toBeInTheDocument();

    await user.click(card);
    expect(screen.queryByText(/Todavía no recibiste feedback/)).not.toBeInTheDocument();
  });
});