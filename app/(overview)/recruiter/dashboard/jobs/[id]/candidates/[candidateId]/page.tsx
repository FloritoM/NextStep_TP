import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getFeedbackByApplication } from "@/lib/recruiter";
import { User } from "@/app/lib/definitions";
import FeedbackForm from "@/components/recruiter/FeedbackForm";

export default async function CandidateFeedbackPage({
  params,
}: {
  params: { id: string; candidateId: string };
}) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  const user = session.user as unknown as User;
  if (user.role?.name !== "recruiter") redirect("/home");

  const token = session.accessToken ?? "";
  const jobId = Number(params.id);
  const applicationId = Number(params.candidateId);

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

        {/* Feedbacks existentes */}
        {feedbacks.length > 0 && (
          <div className="mb-6 flex flex-col gap-4">
            {feedbacks.map((fb: any) => (
              <div key={fb.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-amber-500 text-sm font-semibold">
                    {fb.stage?.name}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {fb.internalNotes && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">Notas internas</p>
                    <p className="text-gray-300 text-sm">{fb.internalNotes}</p>
                  </div>
                )}
                {fb.comment && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Comentario</p>
                    <p className="text-gray-300 text-sm">{fb.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Formulario nuevo feedback */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Agregar feedback</h2>
          <FeedbackForm
            applicationId={applicationId}
            stageId={1}
            token={token}
            onSuccess={() => {}}
          />
        </div>
      </div>
    </div>
  );
}