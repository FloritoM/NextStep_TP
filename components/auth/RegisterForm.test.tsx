import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

jest.mock('@/lib/services/auth.service', () => ({
  registerWithEmail: jest.fn(),
  isAdult: jest.fn((date: string) => date === '2000-01-01'),
}));

jest.mock('@/app/ui/passwordIcons', () => ({
  EyeIcon: () => <span>eye</span>,
  EyeOffIcon: () => <span>eye-off</span>,
}));

import { registerWithEmail } from '@/lib/services/auth.service';

describe('RegisterForm', () => {
  const onSuccess = jest.fn();
  const onBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra errores de validación con campos vacíos', async () => {
    const user = userEvent.setup();
    render(<RegisterForm role="applicant" onSuccess={onSuccess} onBack={onBack} />);

    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    expect(await screen.findByText('El nombre es requerido')).toBeInTheDocument();
    expect(screen.getByText('El apellido es requerido')).toBeInTheDocument();
    expect(screen.getByText('El email es requerido')).toBeInTheDocument();
    expect(registerWithEmail).not.toHaveBeenCalled();
  });

  it('muestra error si el email no es válido', async () => {
    const user = userEvent.setup();
    render(<RegisterForm role="applicant" onSuccess={onSuccess} onBack={onBack} />);

    await user.type(screen.getByLabelText('Nombre'), 'Juan');
    await user.type(screen.getByLabelText('Apellido'), 'Pérez');
    await user.type(screen.getByLabelText('Email'), 'mail-invalido');
    await user.type(screen.getByPlaceholderText('Mínimo 8 caracteres'), '12345678');
    await user.type(screen.getByLabelText('Fecha de nacimiento'), '2000-01-01');
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    expect(await screen.findByText('El email no es válido')).toBeInTheDocument();
  });

  it('registra correctamente y llama onSuccess', async () => {
    (registerWithEmail as jest.Mock).mockResolvedValueOnce({ id: 1 });
    const user = userEvent.setup();

    render(<RegisterForm role="applicant" onSuccess={onSuccess} onBack={onBack} />);

    await user.type(screen.getByLabelText('Nombre'), 'Juan');
    await user.type(screen.getByLabelText('Apellido'), 'Pérez');
    await user.type(screen.getByLabelText('Email'), 'juan@email.com');
    await user.type(screen.getByPlaceholderText('Mínimo 8 caracteres'), '12345678');
    await user.type(screen.getByLabelText('Fecha de nacimiento'), '2000-01-01');
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    await waitFor(() => {
      expect(registerWithEmail).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('muestra error general si falla la API', async () => {
    (registerWithEmail as jest.Mock).mockRejectedValueOnce(new Error('Email ya registrado'));
    const user = userEvent.setup();

    render(<RegisterForm role="applicant" onSuccess={onSuccess} onBack={onBack} />);

    await user.type(screen.getByLabelText('Nombre'), 'Juan');
    await user.type(screen.getByLabelText('Apellido'), 'Pérez');
    await user.type(screen.getByLabelText('Email'), 'juan@email.com');
    await user.type(screen.getByPlaceholderText('Mínimo 8 caracteres'), '12345678');
    await user.type(screen.getByLabelText('Fecha de nacimiento'), '2000-01-01');
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }));

    expect(await screen.findByText('Email ya registrado')).toBeInTheDocument();
  });
});