import { auth } from '@/auth'

export default async function AdminDashboard() {

    const session = await auth()

    const [users, logs, jobOffers] = await Promise.all([
        fetch(`${process.env.BACKEND_URL}/users`, {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
        }).then(res => res.json()),
        fetch(`${process.env.BACKEND_URL}/audit-logs`, {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
        }).then(res => res.json()),
        fetch(`${process.env.BACKEND_URL}/job-offers`, {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
        }).then(res => res.json()),
    ])

    return (
        <div className="bg-main">

            <div>
                <h1 className="text-3xl font-bold text-gray-100">Resumen de Actividad</h1>
                <p className="text-gray-400 mt-2">Seguí el estado de tus postulaciones y métricas recientes.</p>
            </div>

            <section id="counters" className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Usuarios</span>
                        <span className="text-5xl font-bold text-amber-500">{users.length}</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Logs</span>
                        <span className="text-5xl font-bold text-blue-500">{logs.length}</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Job Offers</span>
                        <span className="text-5xl font-bold text-yellow-500">{jobOffers.length}</span>
                    </div>
                </div>
            </section>
        </div>
    );
}