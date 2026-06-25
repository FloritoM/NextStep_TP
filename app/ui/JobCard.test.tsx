import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobCard from './JobCard';
import { JobOffer } from '@/lib/definitions';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid="icon" />,
}));

const job: JobOffer = {
  id: 1,
  title: 'Desarrollador Frontend',
  description: 'Trabajo con React',
  isActive: true,
  seniority: { id: 1, name: 'Junior' },
};

describe('JobCard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renderiza el título y seniority', () => {
    render(<JobCard job={job} userRole="applicant" token="token" />);
    expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
    expect(screen.getByText('Junior')).toBeInTheDocument();
  });

  it('muestra botón de postulación al expandir', async () => {
    const user = userEvent.setup();
    render(<JobCard job={job} userRole="applicant" token="token" />);

    await user.click(screen.getByText('Desarrollador Frontend'));

    expect(screen.getByRole('button', { name: 'Aplicar a esta vacante' })).toBeInTheDocument();
  });

  it('postula correctamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const user = userEvent.setup();
    render(<JobCard job={job} userRole="applicant" token="token" />);

    await user.click(screen.getByText('Desarrollador Frontend'));
    await user.click(screen.getByRole('button', { name: 'Aplicar a esta vacante' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '¡Postulado!' })).toBeInTheDocument();
    });
  });

  it('muestra error si la API falla', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Ya te postulaste' }),
    });

    const user = userEvent.setup();
    render(<JobCard job={job} userRole="applicant" token="token" />);

    await user.click(screen.getByText('Desarrollador Frontend'));
    await user.click(screen.getByRole('button', { name: 'Aplicar a esta vacante' }));

    expect(await screen.findByText('Ya te postulaste')).toBeInTheDocument();
  });

  it('no muestra botón de postulación para recruiter', async () => {
    const user = userEvent.setup();
    render(<JobCard job={job} userRole="recruiter" token="token" />);

    await user.click(screen.getByText('Desarrollador Frontend'));

    expect(screen.queryByRole('button', { name: 'Aplicar a esta vacante' })).not.toBeInTheDocument();
  });
});