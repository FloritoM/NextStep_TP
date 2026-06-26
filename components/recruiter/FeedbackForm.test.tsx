import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackForm from './FeedbackForm';

jest.mock('@/lib/services/feedbacks.service', () => ({
  createFeedback: jest.fn(),
}));

jest.mock('@/lib/services/scorecards.service', () => ({
  createScorecard: jest.fn(),
}));

jest.mock('./ScorecardInput', () => ({
  __esModule: true,
  default: ({
    skillName,
    onRemove,
  }: {
    skillName: string;
    onRemove: () => void;
  }) => (
    <div>
      <span>{skillName}</span>
      <button type="button" onClick={onRemove}>Quitar</button>
    </div>
  ),
}));

import { createFeedback } from '@/lib/services/feedbacks.service';
import { createScorecard } from '@/lib/services/scorecards.service';

describe('FeedbackForm', () => {
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('envía feedback y scorecards', async () => {
    (createFeedback as jest.Mock).mockResolvedValueOnce({ id: 99 });
    (createScorecard as jest.Mock).mockResolvedValueOnce({});

    const user = userEvent.setup();
    render(
      <FeedbackForm
        applicationId={1}
        stageId={2}
        token="token"
        onSuccess={onSuccess}
      />,
    );

    await user.type(
      screen.getByPlaceholderText('Notas privadas del proceso...'),
      'Nota interna',
    );
    await user.type(
      screen.getByPlaceholderText('Observaciones generales...'),
      'Buen candidato',
    );
    await user.type(screen.getByPlaceholderText('Nombre del skill...'), 'React');
    await user.click(screen.getByRole('button', { name: '+ Agregar' }));
    await user.click(screen.getByRole('button', { name: 'Guardar feedback' }));

    await waitFor(() => {
      expect(createFeedback).toHaveBeenCalledWith(
        {
          application_id: 1,
          stage_id: 2,
          comment: 'Buen candidato',
          internalNotes: 'Nota interna',
        },
        'token',
      );
      expect(createScorecard).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('muestra error si falla el guardado', async () => {
    (createFeedback as jest.Mock).mockRejectedValueOnce(new Error('Error al guardar'));

    const user = userEvent.setup();
    render(
      <FeedbackForm
        applicationId={1}
        stageId={2}
        token="token"
        onSuccess={onSuccess}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Guardar feedback' }));

    expect(await screen.findByText('Error al guardar')).toBeInTheDocument();
    expect(onSuccess).not.toHaveBeenCalled();
  });

    it('no agrega skill si el nombre está vacío', async () => {
    const user = userEvent.setup();
    render(<FeedbackForm applicationId={1} stageId={2} token="token" onSuccess={onSuccess} />);
    await user.click(screen.getByRole('button', { name: '+ Agregar' }));
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
  
});