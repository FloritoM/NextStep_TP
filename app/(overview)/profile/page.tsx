import Navbar from "@/app/ui/Navbar";
import EditProfile from "@/components/EditProfile";
import { auth } from "@/auth"

export default async function Profile() {

    const session = await auth()
    const userId = session?.user?.id

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <EditProfile userId={userId as string} token={session?.accessToken as string}/>
        </div>
    )
} 