"use client";

interface Stage {
  id: number;
  name: string;
  count: number;
}

interface PipelineStagesProps {
  stages: Stage[];
  activeStageId: number;
  onStageSelect: (stageId: number) => void;
}

export default function PipelineStages({ stages, activeStageId, onStageSelect }: PipelineStagesProps) {
  return (
    <div className="flex border border-gray-700 rounded-lg overflow-hidden">
      {stages.map((stage, index) => (
        <button
          key={stage.id}
          onClick={() => onStageSelect(stage.id)}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors ${
            index < stages.length - 1 ? "border-r border-gray-700" : ""
          } ${
            activeStageId === stage.id
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          {stage.name}
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
            {stage.count}
          </span>
        </button>
      ))}
    </div>
  );
}