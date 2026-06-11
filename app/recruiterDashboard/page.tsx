import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { getJobOffers } from "@/lib/recruiter";
import JobCard from "@/components/recruiter/JobCard";
import { User } from "@/app/lib/definitions";

export default async function RecruiterDashboard() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  if (user.role?.name !== "recruiter") redirect("/home");

  const token = session.accessToken??"";
  const jobs = await getJobOffers(token);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Job Offers</h1>
            <p className="text-gray-400 text-sm mt-1">
              Hola, {user.firstName} — gestioná tus búsquedas activas
            </p>
          </div>
          <button className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            + Nueva búsqueda
          </button>
        </div>

        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Búsquedas activas
        </div>

        {jobs.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
            <p className="text-gray-400">No hay búsquedas activas todavía.</p>
          </div>
        ) : (
          jobs.map((job: any) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              description={job.description}
              isActive={job.isActive}
              stages={[]}
            />
          ))
        )}
      </div>
    </div>
  );
}