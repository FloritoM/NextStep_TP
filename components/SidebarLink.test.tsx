import { render, screen } from '@testing-library/react';
import SidebarLink from './SidebarLink';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

describe('SidebarLink', () => {
  it('resalta el ítem activo del sidebar', () => {
    (usePathname as jest.Mock).mockReturnValue('/applicant/dashboard/applications');

    render(<SidebarLink href="/applicant/dashboard/applications" label="Mis Postulaciones" />);

    const link = screen.getByRole('link', { name: 'Mis Postulaciones' });
    expect(link).toHaveClass('bg-gray-700');
    expect(link).toHaveClass('text-white');
  });

  it('muestra estilo inactivo en otra ruta', () => {
    (usePathname as jest.Mock).mockReturnValue('/applicant/dashboard');

    render(<SidebarLink href="/applicant/dashboard/applications" label="Mis Postulaciones" />);

    const link = screen.getByRole('link', { name: 'Mis Postulaciones' });
    expect(link).toHaveClass('text-gray-300');
    expect(link).toHaveClass('hover:text-white');
  });
});