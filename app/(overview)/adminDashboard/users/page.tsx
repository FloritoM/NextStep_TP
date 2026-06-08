import UserLogs from "@/app/ui/userLogs"
import { auth } from '@/auth'

export default async function UsersLogsPage() {
    const session = await auth()

    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    const data = await res.json()
    console.log("FETCH DE USERS");
    console.log(data) // para ver qué llega del back
    return (
        <>
            <h1 className="text-white text-3xl font-bold text-center mt-20 mb-8">Users</h1>
            <UserLogs />
        </>
    )
}