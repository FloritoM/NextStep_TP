import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeContent from './home-content';
import { JobOffer, Roles, Seniority, User } from '@/lib/definitions';

jest.mock('./JobCard', () => ({
  __esModule: true,
  default: ({ job }: { job: JobOffer }) => <div data-testid="job-card">{job.title}</div>,
}));

const user: User = {
  id: 1,
  firstName: 'Ana',
  lastName: 'López',
  email: 'ana@email.com',
  role: { id: 1, name: Roles.APPLICANT },
  isActive: true,
};

const seniorities: Seniority[] = [
  { id: 1, name: 'Junior' },
  { id: 2, name: 'Senior' },
];

const jobs: JobOffer[] = [
  {
    id: 1,
    title: 'Desarrollador Frontend',
    description: 'React',
    isActive: true,
    seniority: { id: 1, name: 'Junior' },
  },
  {
    id: 2,
    title: 'Desarrollador Backend',
    description: 'NestJS',
    isActive: true,
    seniority: { id: 2, name: 'Senior' },
  },
];

describe('HomeContent - filtros', () => {
  it('muestra todas las vacantes inicialmente', () => {
    render(
      <HomeContent user={user} token="token" initialJobs={jobs} seniorities={seniorities} />,
    );

    expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
    expect(screen.getByText('Desarrollador Backend')).toBeInTheDocument();
  });

  it('filtra por texto de búsqueda', async () => {
    const userEvt = userEvent.setup();
    render(
      <HomeContent user={user} token="token" initialJobs={jobs} seniorities={seniorities} />,
    );

    await userEvt.type(screen.getByPlaceholderText('Buscar vacantes...'), 'backend');

    expect(screen.queryByText('Desarrollador Frontend')).not.toBeInTheDocument();
    expect(screen.getByText('Desarrollador Backend')).toBeInTheDocument();
  });

  it('filtra por seniority', async () => {
    const userEvt = userEvent.setup();
    render(
      <HomeContent user={user} token="token" initialJobs={jobs} seniorities={seniorities} />,
    );

    await userEvt.click(screen.getByRole('button', { name: 'Senior' }));

    expect(screen.queryByText('Desarrollador Frontend')).not.toBeInTheDocument();
    expect(screen.getByText('Desarrollador Backend')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay resultados', async () => {
    const userEvt = userEvent.setup();
    render(
      <HomeContent user={user} token="token" initialJobs={jobs} seniorities={seniorities} />,
    );

    await userEvt.type(screen.getByPlaceholderText('Buscar vacantes...'), 'inexistente');

    expect(screen.getByText('No se encontraron vacantes.')).toBeInTheDocument();
  });
});