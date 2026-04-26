import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ScreenRedirect() {
    const session = await auth()
    const userRole = session?.user?.role

    if (userRole === "admin") {
        redirect('/adminDashboard')
    } else if (userRole === 'applicant' || userRole === 'recruiter') {
        redirect('/userDashboard')
    } else {
        redirect('/login')
    }
}

