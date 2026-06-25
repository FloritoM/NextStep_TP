import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateJobModal from './CreateJobModal';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

jest.mock('../../lib/services/jobOffers.service', () => ({
  createJobOffer: jest.fn(),
}));

import { createJobOffer } from '../../lib/services/jobOffers.service';

describe('CreateJobModal', () => {
  const onClose = jest.fn();
  const seniorities = [
    { id: 1, name: 'Junior' },
    { id: 2, name: 'Senior' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('crea una vacante correctamente', async () => {
    (createJobOffer as jest.Mock).mockResolvedValueOnce({ id: 1 });
    const user = userEvent.setup();

    render(<CreateJobModal onClose={onClose} token="token" seniorities={seniorities} />);

    await user.type(screen.getByPlaceholderText('Título (Ej. Desarrollador Frontend)'), 'Backend Dev');
    await user.selectOptions(screen.getByRole('combobox'), '1');
    await user.type(screen.getByPlaceholderText('Descripción del puesto...'), 'API REST');
    await user.click(screen.getByRole('button', { name: 'Publicar Vacante' }));

    await waitFor(() => {
      expect(createJobOffer).toHaveBeenCalledWith(
        { title: 'Backend Dev', seniorityId: 1, description: 'API REST' },
        'token',
      );
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('muestra error si falla la creación', async () => {
    (createJobOffer as jest.Mock).mockRejectedValueOnce(new Error('Título duplicado'));
    const user = userEvent.setup();

    render(<CreateJobModal onClose={onClose} token="token" seniorities={seniorities} />);

    await user.type(screen.getByPlaceholderText('Título (Ej. Desarrollador Frontend)'), 'Backend Dev');
    await user.selectOptions(screen.getByRole('combobox'), '1');
    await user.type(screen.getByPlaceholderText('Descripción del puesto...'), 'API REST');
    await user.click(screen.getByRole('button', { name: 'Publicar Vacante' }));

    expect(await screen.findByText('Título duplicado')).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});