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
                className="cursor-pointer border-solid active:bg-blue-600 text-xl text-gray-500 font-semibold hover:text-gray-950"
                buttonText="Perfil"
            />
        </Link>
    )

}