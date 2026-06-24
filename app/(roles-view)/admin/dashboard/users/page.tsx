import UserLogs from "@/app/ui/userLogs"
import { auth } from '@/auth'
import { getUsers } from '@/app/lib/data'

export default async function UsersLogsPage() {
    const session = await auth()
    const data = await getUsers(session?.accessToken)

    return (
        <>
            <h1 className="text-amber-600 text-5xl font-bold text-center mt-20 mb-8">Usuarios</h1>
            <UserLogs users={data} token={session?.accessToken as string} />
        </>
    )
}