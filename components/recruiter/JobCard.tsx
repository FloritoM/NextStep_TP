"use client";

import { useRouter } from "next/navigation";

interface StageSummary {
  name: string;
  count: number;
  highlight?: boolean;
}

interface JobCardProps {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  stages: StageSummary[];
}

export default function JobCard({ id, title, description, isActive, stages }: JobCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/recruiterDashboard/jobs/${id}`)}
      className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3 cursor-pointer hover:border-gray-500 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-gray-400 text-xs mt-1">{description}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
          isActive
            ? "bg-green-900 text-green-300"
            : "bg-yellow-900 text-yellow-300"
        }`}>
          {isActive ? "Activa" : "Pausada"}
        </span>
      </div>

      <div className="flex gap-2">
        {stages.map((stage) => (
          <div
            key={stage.name}
            className={`flex-1 rounded-lg p-2 text-center ${
              stage.highlight ? "bg-blue-900" : "bg-gray-700"
            }`}
          >
            <div className={`text-lg font-bold ${
              stage.highlight ? "text-blue-300" : "text-white"
            }`}>
              {stage.count}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{stage.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}