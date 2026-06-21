"use client";

import { useState, useEffect } from "react";
import { updateFeedback, getScorecardsByFeedback } from "@/lib/recruiter";

interface Feedback {
  id: number;
  stage?: { id: number; name: string };
  createdAt: string;
  internalNotes?: string;
  comment?: string;
  publicFeedback?: string;
}

interface Scorecard {
  id: number;
  skillName: string;
  score: number;
  type: "technical" | "soft";
}

interface FeedbackCardProps {
  feedback: Feedback;
  token: string;
  onUpdated: (updated: Feedback) => void;
}

export default function FeedbackCard({ feedback, token, onUpdated }: FeedbackCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [internalNotes, setInternalNotes] = useState(feedback.internalNotes ?? "");
  const [comment, setComment] = useState(feedback.comment ?? "");
  const [publicFeedback, setPublicFeedback] = useState(feedback.publicFeedback ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    getScorecardsByFeedback(feedback.id, token)
      .then(setScorecards)
      .catch(() => setScorecards([]));
  }, [feedback.id, token]);

  async function handleSave() {
    setIsSaving(true);
    setError(null);

    try {
      const updated = await updateFeedback(
        feedback.id,
        { internalNotes, comment, publicFeedback },
        token
      );
      onUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setInternalNotes(feedback.internalNotes ?? "");
    setComment(feedback.comment ?? "");
    setPublicFeedback(feedback.publicFeedback ?? "");
    setIsEditing(false);
    setError(null);
  }

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/feedback/${feedback.id}/generate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al generar el feedback");
      }

      const updated = await res.json();
      setPublicFeedback(updated.publicFeedback ?? "");
      onUpdated(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-amber-500 text-sm font-semibold">
          {feedback.stage?.name}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-xs">
            {new Date(feedback.createdAt).toLocaleDateString()}
          </span>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-300 text-xs underline cursor-pointer"
            >
              Editar
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-900/30 border border-red-700 rounded text-red-400 text-xs">
          {error}
        </div>
      )}

      {!isEditing ? (
        <div className="flex flex-col gap-3">
          {feedback.internalNotes && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Notas internas <span className="text-gray-600">(solo equipo)</span></p>
              <p className="text-gray-300 text-sm">{feedback.internalNotes}</p>
            </div>
          )}

          {feedback.comment && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Comentario <span className="text-gray-600">(base para IA)</span></p>
              <p className="text-gray-300 text-sm">{feedback.comment}</p>
            </div>
          )}

          {scorecards.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Scorecards</p>
              <div className="bg-gray-700/50 rounded-lg px-3">
                {scorecards.map((sc) => (
                  <div key={sc.id} className="flex items-center gap-3 py-2 border-b border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="text-white text-sm">{sc.skillName}</p>
                      <span className={`text-xs ${sc.type === "technical" ? "text-blue-400" : "text-purple-400"}`}>
                        {sc.type === "technical" ? "Técnica" : "Soft skill"}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${star <= sc.score ? "text-amber-400" : "text-gray-600"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!feedback.comment && (
            <p className="text-gray-500 text-sm italic">Sin feedback cargado todavía</p>
          )}

          <div className="bg-purple-900/10 border border-purple-800/40 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-purple-400">Feedback público <span className="text-gray-500">(esto verá el candidato)</span></p>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !feedback.comment}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {isGenerating ? "Generando..." : "✨ Generar con IA"}
              </button>
            </div>
            {publicFeedback ? (
              <p className="text-gray-200 text-sm whitespace-pre-line mt-2">{publicFeedback}</p>
            ) : (
              <p className="text-gray-500 text-sm italic mt-2">Todavía no se generó el feedback público para esta etapa.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Notas internas (solo equipo)</label>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={2}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Comentario (base para IA)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Feedback público (lo ve el candidato)</label>
            <textarea
              value={publicFeedback}
              onChange={(e) => setPublicFeedback(e.target.value)}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 mt-1">
            <button onClick={handleCancel} className="text-gray-400 text-sm cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}