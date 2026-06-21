"use client"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { User } from '@/app/lib/definitions'

const COLORS = {
    activos: '#10b981',
    inactivos: '#ef4444',
}

export default function AdminUserGraph({ users }: { users: User[] }) {
    const activeCount = users.filter(u => u.isActive).length
    const inactiveCount = users.length - activeCount

    const data = [
        { name: 'Activos', value: activeCount },
        { name: 'Inactivos', value: inactiveCount },
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    <Cell fill={COLORS.activos} />
                    <Cell fill={COLORS.inactivos} />
                </Pie>
                <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}