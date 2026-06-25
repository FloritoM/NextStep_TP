import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getFeedbackByApplication } from "@/lib/services/feedbacks.service";
import { getLatestCvByUser } from "@/lib/services/cvs.service";
import { getStages } from "@/lib/services/stages.service";
import { User } from "@/lib/definitions";
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
  const stages = await getStages(token);

  const application = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/job-applications/${applicationId}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
  ).then((res) => res.json());

  //console.log("APPLICATION DATA:", JSON.stringify(application));

  const cv = application?.applicant?.id
    ? await getLatestCvByUser(application.applicant.id, token)
    : null;

  //console.log("CV DATA:", JSON.stringify(cv));

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

    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider">CV del candidato</p>
          <p className="text-white text-sm mt-1">
            {cv ? cv.originalName : "No hay CV cargado"}
          </p>
        </div>
        {cv && (
          
           <a href={`${process.env.NEXT_PUBLIC_API_URL}/${cv.directory}/${cv.storedName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Ver CV
          </a>
        )}
    </div>


        <CandidateDetailClient
          jobId={jobId}
          applicationId={applicationId}
          token={token}
          initialFeedbacks={feedbacks}
          stages={stages}
          currentStageId={application?.currentStage?.id}
        />
      </div>
    </div>
  );
}