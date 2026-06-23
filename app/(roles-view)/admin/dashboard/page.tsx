import { auth } from '@/auth'
import AdminLogsGraph from '@/app/ui/adminLogsGraph'
import AdminUserGraph from '@/app/ui/adminUsersGraph'
import AdminJobOffersGraph from '@/app/ui/adminJobOffersGraph'
import { getUsers, getAuditLogs, getJobOffers } from '@/app/lib/data'

export default async function AdminDashboard() {
    const session = await auth()

    const [users, logs, jobOffers] = await Promise.all([
        getUsers(session?.accessToken),
        getAuditLogs(session?.accessToken),
        getJobOffers(session?.accessToken),
    ])

    return (
        <div className="bg-main">

            <div className='mt-10'>
                <h1 className="text-3xl font-bold text-gray-100">Resumen de Actividad</h1>
                <p className="text-gray-400 mt-2">Gestioná usuarios, ofertas laborales y revisá la actividad del sistema.</p>
            </div>

            <section id="counters" className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Usuarios en el sistema</span>
                        <span className="text-5xl font-bold text-amber-500">{users.length}</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Logs</span>
                        <span className="text-5xl font-bold text-blue-500">{logs.length}</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Vacantes publicadas</span>
                        <span className="text-5xl font-bold text-yellow-500">{jobOffers.length}</span>
                    </div>
                </div>
            </section>
            <section id="charts" className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[100%] mx-auto">
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="text-center text-white font-bold text-xl mb-4">Usuarios activos vs inactivos</h2>
                        <AdminUserGraph users={users} />
                    </div>
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="text-center text-white font-bold text-xl mb-4">Actividad por tipo de acción</h2>
                        <AdminLogsGraph logs={logs} />
                    </div>
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="text-center text-white font-bold text-xl mb-4">Ofertas por seniority</h2>
                        <AdminJobOffersGraph jobOffers={jobOffers} />
                    </div>
                </div>
            </section>
        </div>
    );
}