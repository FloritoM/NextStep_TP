"use client";

import { useRouter } from "next/navigation";

interface CandidateRowProps {
  applicationId: number;
  jobId: number;
  firstName: string;
  lastName: string;
  experience?: string;
  skills?: string;
  score?: number;
  recommendation?: "strong" | "yes" | "no" | "pending";
}

const recommendationConfig = {
  strong: { label: "Avanzar", className: "bg-green-900 text-green-300" },
  yes: { label: "Considerar", className: "bg-blue-900 text-blue-300" },
  no: { label: "No avanzar", className: "bg-red-900 text-red-300" },
  pending: { label: "Pendiente", className: "bg-yellow-900 text-yellow-300" },
};

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= score ? "text-amber-400" : "text-gray-600"}>
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const colors = [
    "bg-blue-900 text-blue-300",
    "bg-green-900 text-green-300",
    "bg-yellow-900 text-yellow-300",
    "bg-red-900 text-red-300",
    "bg-purple-900 text-purple-300",
  ];
  const color = colors[(firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length];

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

export default function CandidateRow({
  applicationId,
  jobId,
  firstName,
  lastName,
  experience,
  skills,
  score,
  recommendation,
}: CandidateRowProps) {
  const router = useRouter();
  const rec = recommendation ? recommendationConfig[recommendation] : null;

  return (
    <div
      onClick={() => router.push(`/recruiterDashboard/jobs/${jobId}/candidates/${applicationId}`)}
      className="flex items-center px-4 py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <Avatar firstName={firstName} lastName={lastName} />

      <div className="ml-3 flex-1 min-w-0">
        <p className="text-white text-sm font-semibold">
          {firstName} {lastName}
        </p>
        {(experience || skills) && (
          <p className="text-gray-400 text-xs mt-0.5">
            {experience && `${experience}`}
            {experience && skills && " · "}
            {skills}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {score !== undefined && <StarRating score={score} />}
        {rec && (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${rec.className}`}>
            {rec.label}
          </span>
        )}
      </div>
    </div>
  );
}