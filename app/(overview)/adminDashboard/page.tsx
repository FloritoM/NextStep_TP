import { auth } from '@/auth'

export default async function AdminDashboard() {

    const session = await auth()

    const [users, logs] = await Promise.all([
        fetch(`${process.env.BACKEND_URL}/users`, {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
        }).then(res => res.json()),
        fetch(`${process.env.BACKEND_URL}/audit-logs`, {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
        }).then(res => res.json()),
    ])

    return (
        <div className="bg-main">

            <h1 className="mt-20 text-white font-bold text-center text-[2.375rem]">Dashboard Admin</h1>

            <section id="counters" className="mt-20">
                <div className="max-w-[70%] mx-auto px-5 grid grid-cols-2 gap-9 justify-center">
                    <div id="users_total" className="flex flex-col rounded-xl border border-gray-700 bg-gray-800/50">
                        <div className="text-center font-bold text-white text-[2.375rem]">Usuarios</div>
                        <div className="text-center font-semibold text-yellow-400 text-[2.375rem]">{users.length}</div>
                    </div>
                    <div id="logs_total" className="flex flex-col rounded-xl border border-gray-700 bg-gray-800/50">
                        <div className="text-center font-bold text-white text-[2.375rem]">Logs</div>
                        <div className="text-center font-semibold text-amber-600 text-[2.375rem]">{logs.length}</div>
                    </div>
                    {/* <div id="errors_total" className="flex flex-col rounded-xl border border-gray-700 bg-gray-800/50">
                        <div className="text-center font-bold text-white text-[2.375rem]">Errores</div>
                        <div className="text-center font-semibold text-red-800 text-[2.375rem]">0</div>
                    </div> */}
                </div>
            </section>
        </div>
    );
}