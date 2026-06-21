"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { JobOffer } from '@/app/lib/definitions'

export default function JobOffersBySeniorityChart({ jobOffers }: { jobOffers: JobOffer[] }) {
    // Agrupamos las ofertas por nombre de seniority y contamos
    const counts = jobOffers.reduce((acc, offer) => {
        const name = offer.seniority.name
        acc[name] = (acc[name] ?? 0) + 1
        return acc
    }, {} as Record<string, number>)

    const data = Object.entries(counts).map(([name, total]) => ({
        name,
        total,
    }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" allowDecimals={false} />
                <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }}
                />
                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}