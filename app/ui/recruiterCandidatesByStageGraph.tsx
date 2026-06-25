"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

const COLORS = ["#f16363", "#f6ae5c", "#2029b1", "#f0c687", "#ddd6fe"]

export function RecruiterCandidatesByStageGraph({ candidates }: { candidates: { stage: string, count: number }[] }) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={candidates} layout="vertical" margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis dataKey="stage" type="category" tick={{ fill: "#9ca3af", fontSize: 11 }} width={110} />
                <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#a78bfa" }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {candidates.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}