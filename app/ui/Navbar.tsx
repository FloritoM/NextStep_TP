import Link from 'next/link';
import SignOutButton from './signOutButton';
import NextStepIcon from '@/components/icon';
import { Roles } from '../lib/definitions';

interface NavbarProps {
    role: Roles;
}

export default function Navbar({ role }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-40 bg-gray-800 border-b border-gray-700 shadow-lg px-10 py-4 flex justify-between items-center">
            <NextStepIcon />

            <ul className="flex gap-10 text-[1.2rem] font-semibold text-gray-300">
                <li>
                    <Link href="/home" className="hover:text-amber-500 transition-colors text-amber-500">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href={`/${role}/dashboard`} className="hover:text-amber-500 transition-colors">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/profile" className="hover:text-amber-500 transition-colors">
                        Perfil
                    </Link>
                </li>
            </ul>

            <div className="flex place-items-center justify-end pr-4">
                <SignOutButton />
            </div>
        </nav>
    );
}