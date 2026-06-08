import Navbar from "@/app/ui/Navbar";
import EditProfile from "@/components/EditProfile";
import FileUploader from "@/components/FileUploader";

export default async function ApplicantProfile() {

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <EditProfile />
        </div>
    )
} 