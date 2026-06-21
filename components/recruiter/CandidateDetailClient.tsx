"use client";

import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import StageSelector from "./StageSelector";
import FeedbackCard from "./FeedbackCard";


interface Feedback {
  id: number;
  stage?: { id:number, name: string };
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
    window.location.reload();  
  }

   function handleStageChange(newStageId: number) {
    setActiveStageId(newStageId);
  }

  function handleFeedbackUpdated(updated: Feedback) {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === updated.id ? { ...fb, ...updated } : fb))
    );
    setSuccessMessage("Cambios guardados correctamente");
    setTimeout(() => setSuccessMessage(null), 3000);
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
        <FeedbackCard
          key={fb.id}
          feedback={fb}
          token={token}
          onUpdated={handleFeedbackUpdated}
        />
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