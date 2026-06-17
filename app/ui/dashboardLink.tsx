import Link from "next/link";
import { auth } from "@/auth"

export default async function DashboardLink() {
    const session = await auth()
    const role = session?.user?.role

    const href = `/${role}/dashboard` || '/login'

    return (
        <Link
            href={href}
            className="cursor-pointer border-solid text-xl text-gray-500 font-semibold hover:text-gray-950"
        >
            Dashboard
        </Link>
    )
}