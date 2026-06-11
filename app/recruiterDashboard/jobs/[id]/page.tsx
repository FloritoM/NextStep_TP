import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getJobOffer, getJobApplications } from "@/lib/recruiter";
import { User } from "@/app/lib/definitions";
import CandidateRow from "@/components/recruiter/CandidateRow";

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  if (user.role?.name !== "recruiter") redirect("/home");

  const token = session.accessToken ?? "";
  const jobId = Number(params.id);

  const [job, applications] = await Promise.all([
    getJobOffer(jobId, token),
    getJobApplications(jobId, token),
  ]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <a href="/recruiterDashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Volver
          </a>
          <h1 className="text-xl font-bold text-white">{job?.title}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${job?.isActive ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
            {job?.isActive ? "Activa" : "Pausada"}
          </span>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <p className="text-white font-semibold text-sm">
              Candidatos — {applications.length} postulaciones
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No hay candidatos todavía.</p>
            </div>
          ) : (
            applications.map((app: any) => (
              <CandidateRow
                key={app.id}
                applicationId={app.id}
                jobId={jobId}
                firstName={app.applicant?.firstName || ""}
                lastName={app.applicant?.lastName || ""}
                recommendation="pending"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}