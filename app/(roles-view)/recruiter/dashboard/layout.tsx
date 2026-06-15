import Navbar from '@/app/ui/Navbar'
import AdminSidebarLink from '@/components/AdminSidebarLink'

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-56 bg-gray-900 border-r border-gray-700 flex flex-col p-4 gap-2 sticky top-[93px] h-[calc(100vh-93px)] overflow-y-auto">
          <AdminSidebarLink href="/recruiter/dashboard" label="Job Offers" />
          <AdminSidebarLink href="/recruiter/dashboard/candidates" label="Candidatos" />
        </aside>
        <main className="flex-1 p-8 bg-main">
          {children}
        </main>
      </div>
    </div>
  )
}