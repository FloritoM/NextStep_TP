import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@/app/lib/definitions";
import CvUpload from "@/components/CvUpload";
import { getLatestCvByUser } from "@/lib/recruiter";

export default async function ApplicantCvPage() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  const token = session.accessToken ?? "";

  const cv = await getLatestCvByUser(user.id as number, token);


  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Mi CV</h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">
        Subí tu CV para que los reclutadores puedan revisarlo
      </p>

      {cv && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6 max-w-2xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">CV actual</p>
            <p className="text-white text-sm mt-1">{cv.originalName}</p>
          </div>
          
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/${cv.directory}/${cv.storedName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Ver CV
          </a>
        </div>
      )}

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl">
        <CvUpload userId={user.id as number} />
      </div>
    </div>
  );
}