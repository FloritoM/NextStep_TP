import { render, screen } from '@testing-library/react';
import NavLink from './Navlink';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

describe('NavLink', () => {
  it('marca el link como activo cuando coincide la ruta', () => {
    (usePathname as jest.Mock).mockReturnValue('/applicant/dashboard');

    render(<NavLink href="/applicant/dashboard">Dashboard</NavLink>);

    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toHaveClass('text-amber-500');
    expect(link).toHaveClass('font-bold');
  });

  it('no marca como activo si la ruta es distinta', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile');

    render(<NavLink href="/applicant/dashboard">Dashboard</NavLink>);

    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).not.toHaveClass('font-bold');
    expect(link).toHaveClass('hover:text-amber-500');
  });
});