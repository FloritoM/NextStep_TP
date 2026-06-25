"use client"

import { JobOffer } from "@/lib/definitions"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#dd8b0f", "#acacac"]

export function RecruiterOffersGraph({ offers }: { offers: JobOffer[] }) {
    const activas = offers.filter(o => o.isActive).length
    const inactivas = offers.filter(o => !o.isActive).length

    const data = [
        { name: "Activas", value: activas },
        { name: "Inactivas", value: inactivas },
    ]

    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#eb6309" }}
                />
                <Legend formatter={(value) => <span style={{ color: "#9ca3af" }}>{value}</span>} />
            </PieChart>
        </ResponsiveContainer>
    )
}