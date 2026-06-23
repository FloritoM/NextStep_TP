import UserLogs from "@/app/ui/userLogs"
import { auth } from '@/auth'

export default async function UsersLogsPage() {
    const session = await auth()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    const data = await res.json()

    return (
        <>
            <h1 className="text-amber-600 text-5xl font-bold text-center mt-20 mb-8">Usuarios</h1>
            <UserLogs users={data} token={session?.accessToken as string} />
        </>
    )
}