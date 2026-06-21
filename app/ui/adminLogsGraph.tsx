"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AuditLog } from '@/app/lib/definitions'

export default function AdminLogsGraph({ logs }: { logs: AuditLog[] }) {
    const counts = logs.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] ?? 0) + 1
        return acc
    }, {} as Record<string, number>)

    const data = Object.entries(counts).map(([action, total]) => ({
        name: action,
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
                <Bar dataKey="total" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}