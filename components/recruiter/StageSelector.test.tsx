import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StageSelector from './StageSelector';

jest.mock('@/lib/services/jobApplications.service', () => ({
  updateJobApplicationStage: jest.fn(),
}));

import { updateJobApplicationStage } from '@/lib/services/jobApplications.service';

const stages = [
  { id: 1, name: 'Postulado', sequenceOrder: 1 },
  { id: 2, name: 'Entrevista', sequenceOrder: 2 },
];

describe('StageSelector', () => {
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza las etapas disponibles', () => {
    render(
      <StageSelector
        applicationId={10}
        currentStageId={1}
        stages={stages}
        token="token"
        onSuccess={onSuccess}
      />,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Postulado' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Entrevista' })).toBeInTheDocument();
  });

  it('actualiza la etapa y llama onSuccess', async () => {
    (updateJobApplicationStage as jest.Mock).mockResolvedValueOnce({});
    const user = userEvent.setup();

    render(
      <StageSelector
        applicationId={10}
        currentStageId={1}
        stages={stages}
        token="token"
        onSuccess={onSuccess}
      />,
    );

    await user.selectOptions(screen.getByRole('combobox'), '2');

    await waitFor(() => {
      expect(updateJobApplicationStage).toHaveBeenCalledWith(10, 2, 'token');
      expect(onSuccess).toHaveBeenCalledWith(2);
    });
  });

  it('muestra error si falla el cambio de etapa', async () => {
    (updateJobApplicationStage as jest.Mock).mockRejectedValueOnce(new Error('No autorizado'));
    const user = userEvent.setup();

    render(
      <StageSelector
        applicationId={10}
        currentStageId={1}
        stages={stages}
        token="token"
        onSuccess={onSuccess}
      />,
    );

    await user.selectOptions(screen.getByRole('combobox'), '2');

    expect(await screen.findByText('No autorizado')).toBeInTheDocument();
    expect(onSuccess).not.toHaveBeenCalled();
  });
});