import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getJobOffer, getJobApplications, getStages } from "@/lib/recruiter";
import { User } from "@/app/lib/definitions";
import JobDetailClient from "@/components/recruiter/JobDetailClient";
import JobOfferToggle from "../../../JobOfferToggle";
import { getSeniorities } from "@/app/lib/data";
import EditJobButton from "@/components/recruiter/EditJobButton";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  if (user.role?.name !== "recruiter") redirect("/home");

  const token = session.accessToken ?? "";
  const { id } = await params;
  const jobId = Number(id);

  const [job, applications, stages, seniorities] = await Promise.all([
    getJobOffer(jobId, token),
    getJobApplications(jobId, token),
    getStages(token),
    getSeniorities(token),

  ]);

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <a href="/recruiter/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Volver
          </a>

          <h1 className="text-xl font-bold text-white">{job?.title}</h1>
          <JobOfferToggle
            jobId={jobId}
            initialIsActive={job?.isActive ?? false}
            token={token}
          />
        </div>

        <div className="mb-6 ml-1">
          <p className="text-gray-400 text-sm">
            Seniority: <span className="text-white">{job?.seniority?.name ?? "Sin definir"}</span>
          </p>
          <p className="text-gray-400 text-sm mt-1 mb-3">{job?.description}</p>
          <EditJobButton
            token={token}
            seniorities={seniorities}
            jobId={jobId}
            initialTitle={job?.title ?? ""}
            initialDescription={job?.description ?? ""}
            initialSeniorityId={job?.seniority?.id}
          />
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