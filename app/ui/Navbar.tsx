import Link from 'next/link';
import SignOutButton from './signOutButton';
import NextStepIcon from '@/components/icon';
import { auth } from '@/auth';
import { User } from '../lib/definitions';
import { canApplyToJobOffer } from '../lib/permissions';

export default async function Navbar() {
    const session = await auth();
    const user = session?.user as unknown as User;
    const role = user?.role?.name || "applicant";
    
    return (
        <nav className="sticky top-0 z-40 bg-gray-800 border-b border-gray-700 shadow-lg px-10 py-4 flex justify-between items-center">
            <NextStepIcon />
            <div className="flex items-center gap-5 md:gap-10">
                <ul className="flex gap-5 md:gap-10 text-[1.2rem] font-semibold text-gray-300">
                    <li>
                        {canApplyToJobOffer(user) && (
                            <Link href="/applicant/jobs" className="hover:text-amber-500 transition-colors">
                                Vacantes
                            </Link>
                        )}
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
                <SignOutButton />
            </div>
        </nav>
    );
}