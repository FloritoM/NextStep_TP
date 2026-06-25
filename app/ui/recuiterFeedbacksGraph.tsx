"use client"

import { Feedback } from "../lib/definitions"

export function RecruiterFeedbacksGraph({ feedbacks }: { feedbacks: Feedback[] }) {
    return (
        <div className="flex flex-col items-center justify-center h-[200px]">
            <span className="text-6xl font-bold text-white">{feedbacks.length}</span>
            <span className="text-gray-400 mt-2 text-sm">feedbacks enviados</span>
        </div>
    )
}