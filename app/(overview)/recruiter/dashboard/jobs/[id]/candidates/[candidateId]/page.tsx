import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getFeedbackByApplication } from "@/lib/recruiter";
import { User } from "@/app/lib/definitions";
import CandidateDetailClient from "@/components/recruiter/CandidateDetailClient";

export default async function CandidateFeedbackPage({
  params,
}: {
  params: Promise<{ id: string; candidateId: string }>;
}) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  if (user.role?.name !== "recruiter") redirect("/home");

  const token = session.accessToken ?? "";
  const { id, candidateId } = await params;
  const jobId = Number(id);
  const applicationId = Number(candidateId);

  const feedbacks = await getFeedbackByApplication(applicationId, token);

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          
           <a href={`/recruiter/dashboard/jobs/${jobId}`}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Volver
          </a>
          <h1 className="text-xl font-bold text-white">Feedback del candidato</h1>
        </div>

        <CandidateDetailClient
          jobId={jobId}
          applicationId={applicationId}
          token={token}
          initialFeedbacks={feedbacks}
        />
      </div>
    </div>
  );
}