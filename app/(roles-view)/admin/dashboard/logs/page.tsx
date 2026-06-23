import TableLogs from "@/app/ui/tableLogs"
import { auth } from '@/auth'
import { getAuditLogs } from '@/app/lib/data'

export default async function LogsPage() {
    const session = await auth()
    const data = await getAuditLogs(session?.accessToken)

    return (
        <>
            <h1 className="text-amber-600 text-5xl font-bold text-center mt-20 mb-8">Logs</h1>
            <TableLogs logs={data} />
        </>
    )
}