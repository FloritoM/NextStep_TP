"use client";

import { useState, useMemo } from "react";
import StageSelector from "./StageSelector";
import FeedbackCard from "./FeedbackCard";
import CollapsibleFeedbackCard from "./CollapsibleFeedbackCard";


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
  
  // Mapa rápido stageId -> sequenceOrder, usando los stages que ya tenemos
  const sequenceByStageId = useMemo(() => {
    const map = new Map<number, number>();
    stages.forEach((s) => map.set(s.id, s.sequenceOrder));
    return map;
  }, [stages]);

  const activeSequence = sequenceByStageId.get(activeStageId) ?? 0;

  // Feedback de la etapa activa (siempre existe gracias al factory del back)
  const feedbackForActiveStage = useMemo(
    () => feedbacks.find((fb) => fb.stage?.id === activeStageId) ?? null,
    [feedbacks, activeStageId],
  );

  // Feedbacks de etapas YA TRANSITADAS (sequenceOrder menor a la activa)
  // Ordenados de la más reciente a la más vieja para que lo último visto quede arriba
  const previousFeedbacks = useMemo(() => {
    return feedbacks
      .filter((fb) => {
        const seq = fb.stage ? sequenceByStageId.get(fb.stage.id) : undefined;
        return seq !== undefined && seq < activeSequence;
      })
      .sort((a, b) => {
        const seqA = sequenceByStageId.get(a.stage!.id) ?? 0;
        const seqB = sequenceByStageId.get(b.stage!.id) ?? 0;
        return seqB - seqA;
      });
  }, [feedbacks, sequenceByStageId, activeSequence]);

   function handleStageChange(newStageId: number) {
    setActiveStageId(newStageId);
  }
function handleFeedbackUpdated(updated: Feedback) {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === updated.id ? { ...fb, ...updated } : fb)),
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

      {/* Feedback de la etapa ACTUAL: siempre editable, vacío o no */}
      {feedbackForActiveStage && (
        <div className="mb-6">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
            Etapa actual
          </h3>
          <FeedbackCard
            key={feedbackForActiveStage.id}
            feedback={feedbackForActiveStage}
            token={token}
            onUpdated={handleFeedbackUpdated}
          />
        </div>
      )}

      {/* Feedbacks de etapas anteriores, colapsados por default */}
      {previousFeedbacks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3">
            Etapas anteriores
          </h3>
          <div className="flex flex-col gap-2">
            {previousFeedbacks.map((fb) => (
              <CollapsibleFeedbackCard
                key={fb.id}
                feedback={fb}
                token={token}
                onUpdated={handleFeedbackUpdated}
                defaultOpen={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}