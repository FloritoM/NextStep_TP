import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getJobOffer, getJobApplications } from "@/lib/recruiter";
import { User } from "@/app/lib/definitions";
import JobDetailClient from "@/components/recruiter/JobDetailClient";

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

  const stages = applications
    .map((app: any) => app.stage)
    .filter((stage: any, index: number, self: any[]) =>
      stage && self.findIndex((s) => s?.id === stage.id) === index
    );

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <a href="/recruiter/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Volver
          </a>
          <h1 className="text-xl font-bold text-white">{job?.title}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            job?.isActive ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
          }`}>
            {job?.isActive ? "Activa" : "Pausada"}
          </span>
        </div>

        <JobDetailClient
          jobId={jobId}
          applications={applications}
          stages={stages}
        />
      </div>
    </div>
  );
}