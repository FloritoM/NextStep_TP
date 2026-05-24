import Link from "next/link";
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
            <button
                className="cursor-pointer border-solid text-xl text-gray-500 font-semibold hover:text-gray-950">Perfil</button>
        </Link>
    )
}