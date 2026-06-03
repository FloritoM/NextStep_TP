import Header from "@/app/ui/header";
import EditProfile from "@/components/EditProfile";

export default async function ApplicantProfile() {

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <EditProfile />
        </div>
    )
} 