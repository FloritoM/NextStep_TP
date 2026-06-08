import Navbar from '@/app/ui/Navbar'
import AdminSidebarLink from '@/components/AdminSidebarLink'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex flex-1">
                <aside className="w-56 bg-gray-900 border-r border-gray-700 flex flex-col p-4 gap-2">
                    <AdminSidebarLink href="/adminDashboard" label="Inicio" />
                    <AdminSidebarLink href="/adminDashboard/users" label="Usuarios" />
                    <AdminSidebarLink href="/adminDashboard/logs" label="Logs" />
                </aside>

                <main className="flex-1 p-8 bg-main">
                    {children}
                </main>
            </div>
        </div>
    )
}