import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getJobOffers, getSeniorities } from "@/app/lib/data";
import JobCard from "@/components/recruiter/JobCard";
import { JobOffer, User } from "@/app/lib/definitions";
import CvUpload from "@/components/CvUpload";
import CreateJobButton from "@/components/recruiter/CreateJobButton";
import { canCreateJobOffer } from "@/app/lib/permissions";

export default async function RecruiterDashboard() {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  if (user.role?.name !== "recruiter") redirect("/dashboard");

  const token = session.accessToken ?? "";
  
  const [jobs, seniorities] = await Promise.all([
    getJobOffers(token),
    getSeniorities(token)
  ]);

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
          {canCreateJobOffer(user) && (
            <CreateJobButton token={token} seniorities={seniorities} />
          )}
        </div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Búsquedas activas
        </div>

        {jobs.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
            <p className="text-gray-400">No hay búsquedas activas todavía.</p>
          </div>
        ) : (
          jobs.map((job: JobOffer) => (
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

        {/* Temporal para probar carga de CV */}
        <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-xl">
          <p className="text-gray-400 text-sm mb-3">Probar carga de CV</p>
          <CvUpload userId={user.id as number} />
        </div>

      </div>
    </div>
  );
}