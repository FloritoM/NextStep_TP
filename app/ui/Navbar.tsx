import SignOutButton from './signOutButton';
import NextStepIcon from '@/components/icon';
import { auth } from '@/auth';
import { User } from '@/app/lib/definitions';
import { canApplyToJobOffer } from '@/app/lib/permissions';
import NavLink from './Navlink';

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
                            <NavLink href="/applicant/jobs">
                                Vacantes
                            </NavLink>
                        )}
                    </li>
                    <li>
                        <NavLink href={`/${role}/dashboard`}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/profile">
                            Perfil
                        </NavLink>
                    </li>
                </ul>
                <SignOutButton />
            </div>
        </nav>
    );
}