"use client";

import { useState } from "react";
import ScorecardInput from "./ScorecardInput";

interface Scorecard {
  skillName: string;
  score: number;
  type: "technical" | "soft";
}

interface FeedbackFormProps {
  applicationId: number;
  stageId: number;
  token: string;
  onSuccess: () => void;
}

export default function FeedbackForm({
  applicationId,
  stageId,
  token,
  onSuccess,
}: FeedbackFormProps) {
  const [comment, setComment] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newType, setNewType] = useState<"technical" | "soft">("technical");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  function addSkill() {
    if (!newSkill.trim()) return;
    setScorecards((prev) => [
      ...prev,
      { skillName: newSkill.trim(), score: 0, type: newType },
    ]);
    setNewSkill("");
  }

  function updateScore(index: number, score: number) {
    setScorecards((prev) =>
      prev.map((s, i) => (i === index ? { ...s, score } : s))
    );
  }

  function removeSkill(index: number) {
    setScorecards((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const feedbackRes = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          application_id: applicationId,
          stage_id: stageId,
          comment,
          internalNotes,
        }),
      });

      if (!feedbackRes.ok) throw new Error("Error al guardar el feedback");

      const feedback = await feedbackRes.json();

      await Promise.all(
        scorecards.map((sc) =>
          fetch(`${API_URL}/scorecards`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              feedbackId: feedback.id,
              skillName: sc.skillName,
              score: sc.score,
              type: sc.type,
            }),
          })
        )
      );

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Notas internas */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-1 block">
          Notas internas <span className="text-gray-500">(solo recruiters)</span>
        </label>
        <textarea
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          rows={3}
          placeholder="Notas privadas del proceso..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {/* Comentario público */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-1 block">
          Comentario <span className="text-gray-500">(base para feedback al candidato)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Observaciones generales..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {/* Agregar skills */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Scorecards
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Nombre del skill..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-blue-500"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as "technical" | "soft")}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none"
          >
            <option value="technical">Técnica</option>
            <option value="soft">Soft</option>
          </select>
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Agregar
          </button>
        </div>

        {scorecards.length > 0 && (
          <div className="bg-gray-700 rounded-lg px-3">
            {scorecards.map((sc, i) => (
              <ScorecardInput
                key={i}
                skillName={sc.skillName}
                score={sc.score}
                type={sc.type}
                onChange={(score) => updateScore(i, score)}
                onRemove={() => removeSkill(i)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Guardando...
          </>
        ) : (
          "Guardar feedback"
        )}
      </button>
    </form>
  );
}