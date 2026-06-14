"use client";

import { useState } from "react";
import CandidateRow from "./CandidateRow";

interface Stage {
  id: number;
  name: string;
}

interface Application {
  id: number;
  currentStage?: Stage;
  applicant?: {
    firstName: string;
    lastName: string;
  };
}

interface JobDetailClientProps {
  jobId: number;
  applications: Application[];
  stages: Stage[];
}

export default function JobDetailClient({ jobId, applications, stages }: JobDetailClientProps) {
  const [activeStageId, setActiveStageId] = useState<number | null>(
    stages.length > 0 ? stages[0].id : null
  );

  const filtered = activeStageId
    ? applications.filter((app) => app.currentStage?.id === activeStageId)
    : applications;

  const countByStage = (stageId: number) =>
    applications.filter((app) => app.currentStage?.id === stageId).length;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      {/* Tabs de stages */}
      {stages.length > 0 && (
        <div className="flex border-b border-gray-700 overflow-x-auto">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-r border-gray-700 last:border-r-0 ${
                activeStageId === stage.id
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {stage.name}
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                {countByStage(stage.id)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Lista de candidatos */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-400">No hay candidatos en este stage.</p>
        </div>
      ) : (
        filtered.map((app) => (
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
  );
}