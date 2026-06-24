"use client";

import { useState } from "react";
import FeedbackCard from "./FeedbackCard";

interface Feedback {
  id: number;
  stage?: { id: number; name: string };
  createdAt: string;
  internalNotes?: string;
  comment?: string;
  publicFeedback?: string;
}

interface CollapsibleFeedbackCardProps {
  feedback: Feedback;
  token: string;
  onUpdated: (updated: Feedback) => void;
  defaultOpen?: boolean;
}

export default function CollapsibleFeedbackCard({
  feedback,
  token,
  onUpdated,
  defaultOpen = false,
}: CollapsibleFeedbackCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-amber-500 text-sm font-semibold">
            {feedback.stage?.name}
          </span>
          <span className="text-gray-500 text-xs">
            {new Date(feedback.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span
          className={`text-gray-400 text-sm transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-700">
          <FeedbackCard
            feedback={feedback}
            token={token}
            onUpdated={onUpdated}
          />
        </div>
      )}
    </div>
  );
}