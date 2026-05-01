import Link from "next/link";
import { Button } from "./button";
import { auth } from "@/auth"

export default async function ProfileLink() {

    const session = await auth()
    const role = session?.user?.role

    const href = 
        role === 'admin' ? '/adminProfile' :
        role === 'applicant' ? '/applicantProfile' :
        role === 'recruiter' ? '/recruiterProfile' :
        '/mainPage'

    return (
        <Link href={href}>
            <Button 
                className="cursor-pointer hover:bg-indigo-300 border-solid border-1 active:bg-blue-600"
                buttonText="Perfil"
            />
        </Link>
    )

}