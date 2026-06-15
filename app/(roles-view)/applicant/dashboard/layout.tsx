import SidebarLink from '@/components/SidebarLink'

export default function ApplicantLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <aside className="w-56 bg-gray-900 border-r border-gray-700 flex flex-col p-4 gap-2 sticky top-[93px] h-[calc(100vh-93px)] overflow-y-auto">
                    <SidebarLink href="/applicant/dashboard" label="Mi Actividad" />
                    <SidebarLink href="/applicant/dashboard/applications" label="Mis Postulaciones" />
                    <SidebarLink href="/applicant/dashboard/feedbacks" label="Feedbacks Recibidos" />
                </aside>
                <main className="flex-1 p-8 bg-main">
                    {children}
                </main>
            </div>
        </div>
    )
}