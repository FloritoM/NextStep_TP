'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarLink({ href, label }: { href: string, label: string }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`rounded px-3 py-2 transition-colors ${
                isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
        >
            {label}
        </Link>
    )
}