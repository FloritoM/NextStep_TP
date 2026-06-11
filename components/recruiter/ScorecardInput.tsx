"use client";

interface ScorecardInputProps {
  skillName: string;
  score: number;
  type: "technical" | "soft";
  onChange: (score: number) => void;
  onRemove: () => void;
}

export default function ScorecardInput({
  skillName,
  score,
  type,
  onChange,
  onRemove,
}: ScorecardInputProps) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-gray-700 last:border-0">
      <div className="flex-1">
        <p className="text-white text-sm">{skillName}</p>
        <span className={`text-xs ${
          type === "technical" ? "text-blue-400" : "text-purple-400"
        }`}>
          {type === "technical" ? "Técnica" : "Soft skill"}
        </span>
      </div>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-xl transition-colors ${
              star <= score ? "text-amber-400" : "text-gray-600 hover:text-amber-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="text-gray-500 hover:text-red-400 transition-colors ml-2 text-lg"
      >
        ×
      </button>
    </div>
  );
}