import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ScreenRedirect() {
    const session = await auth()
    const userRole = session?.user?.role

    if (userRole === 'admin') {
        redirect('/adminDashboard')
    } else if (userRole === 'user') {
        redirect('/userDashboard')
    } else {
        redirect('/login')
    }
    console.log(userRole)
}