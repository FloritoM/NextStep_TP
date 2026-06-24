"use client";

import { useState } from "react";
import { updateJobApplicationStage } from "@/app/lib/actions/jobApplications.actions";


interface Stage {
  id: number;
  name: string;
  sequenceOrder: number;
}

interface StageSelectorProps {
  applicationId: number;
  currentStageId: number;
  stages: Stage[];
  token: string;
  onSuccess: (newStageId: number) => void;
}

export default function StageSelector({
  applicationId,
  currentStageId,
  stages,
  token,
  onSuccess,
}: StageSelectorProps) {
  const [selectedStageId, setSelectedStageId] = useState(currentStageId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  async function handleChange(newStageId: number) {
    setSelectedStageId(newStageId);
    setIsLoading(true);
    setError(null);

    try {
      await updateJobApplicationStage(applicationId, newStageId, token);
      onSuccess(newStageId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
      setSelectedStageId(currentStageId);
    } finally {
      setIsLoading(false);
    }
  }

   return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-400">Etapa actual:</label>
      <select
        value={selectedStageId}
        disabled={isLoading}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 disabled:opacity-50"
      >
        {stages.map((stage) => (
          <option key={stage.id} value={stage.id}>
            {stage.name}
          </option>
        ))}
      </select>
      {isLoading && <span className="text-gray-500 text-xs">Guardando...</span>}
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}
