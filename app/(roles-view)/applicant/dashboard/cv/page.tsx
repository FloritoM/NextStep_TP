import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/app/lib/definitions";
import CvUpload from "@/components/CvUpload";

export default async function ApplicantCvPage() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Mi CV</h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">
        Subí tu CV para que los reclutadores puedan revisarlo
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl">
        <CvUpload userId={user.id as number} />
      </div>
    </div>
  );
}