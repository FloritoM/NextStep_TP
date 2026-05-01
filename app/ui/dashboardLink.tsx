import Link from "next/link";
import { Button } from "./button";
import { auth } from "@/auth"

export default async function DashboardLink() {
    const session = await auth()
    const role = session?.user?.role

    const href = 
        role === 'admin' ? '/adminDashboard' :
        role === 'applicant' ? '/applicantDashboard' :
        role === 'recruiter' ? '/recruiterDashboard' :
        '/login'

    return (
        <Link href={href}>
            <Button 
                className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600"
                buttonText="Dashboard"
            />
        </Link>
    )
}