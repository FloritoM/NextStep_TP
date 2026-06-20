"use client";

import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import StageSelector from "./StageSelector";

interface Feedback {
  id: number;
  stage?: { name: string };
  createdAt: string;
  internalNotes?: string;
  comment?: string;
  publicFeedback?: string;
}
interface Stage {
  id: number;
  name: string;
  sequenceOrder: number;
}

interface CandidateDetailClientProps {
  jobId: number;
  applicationId: number;
  token: string;
  initialFeedbacks: Feedback[];
  stages: Stage[];
  currentStageId: number;
}

export default function CandidateDetailClient({
  jobId,
  applicationId,
  token,
  initialFeedbacks,
  stages,
  currentStageId,

}: CandidateDetailClientProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [activeStageId, setActiveStageId] = useState<number>(currentStageId);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleSuccess() {
    setSuccessMessage("Feedback guardado correctamente");
    setTimeout(() => setSuccessMessage(null), 3000);
  }

   function handleStageChange(newStageId: number) {
    setActiveStageId(newStageId);
  }

  return (
    <div>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-400 text-sm">
          {successMessage}
        </div>
      )}

    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <StageSelector
          applicationId={applicationId}
          currentStageId={activeStageId}
          stages={stages}
          token={token}
          onSuccess={handleStageChange}
        />
    </div>


    <div className="mb-6 flex flex-col gap-4">
    {feedbacks.map((fb) => (
        <div key={fb.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
            <span className="text-amber-500 text-sm font-semibold">
            {fb.stage?.name}
            </span>
            <span className="text-gray-500 text-xs">
            {new Date(fb.createdAt).toLocaleDateString()}
            </span>
        </div>
        {!fb.internalNotes && !fb.comment ? (
            <p className="text-gray-500 text-sm italic">Sin feedback cargado todavía</p>
        ) : (
            <>
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
            </>
        )}
        </div>
    ))}
    </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Agregar feedback</h2>
        <FeedbackForm
          applicationId={applicationId}
          stageId={activeStageId}
          token={token}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}