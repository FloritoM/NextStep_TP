import SidebarLink from '@/components/SidebarLink'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-700 flex flex-col p-4 gap-2 sticky top-[93px] h-[calc(100vh-93px)] overflow-y-auto">
                    <SidebarLink href="/admin/dashboard" label="Métricas" />
                    <SidebarLink href="/admin/dashboard/users" label="Usuarios" />
                    <SidebarLink href="/admin/dashboard/logs" label="Logs" />
                    <SidebarLink href="/admin/dashboard/jobOffers" label="JobOffers" />
                </aside>
                <main className="flex-1 min-w-0 p-8 bg-main">
                    {children}
                </main>
            </div>
        </div>
    )
}