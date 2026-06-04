import Link from 'next/link';
import { pacifico } from "./fonts";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-40 bg-gray-800 border-b border-gray-700 shadow-lg px-10 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-[2rem] font-bold select-none text-white">
                Next<span className={`${pacifico.className} italic text-amber-600 font-semibold`}>Step</span>
            </div>
            
            {/* Links de Navegación */}
            <ul className="flex gap-10 text-[1.2rem] font-semibold text-gray-300">
                <li>
                    <Link href="/home" className="hover:text-amber-500 transition-colors text-amber-500">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" className="hover:text-amber-500 transition-colors">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/profile" className="hover:text-amber-500 transition-colors">
                        Perfil
                    </Link>
                </li>
            </ul>
        </nav>
    );
}