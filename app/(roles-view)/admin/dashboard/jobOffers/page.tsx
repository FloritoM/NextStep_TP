import { getJobOffers } from '@/app/lib/data'
import JobOffersLogs from '@/app/ui/jobOffersLogs'
import { auth } from '@/auth'

export default async function JobOffersLogPage() {
    const session = await auth()
    const data = await getJobOffers(session?.accessToken)
    return (
        <>
            <h1 className="text-amber-600 text-5xl font-bold text-center mt-20 mb-8">Vacantes Laborales</h1>
            <JobOffersLogs jobOffers={data} token={session?.accessToken as string} />
        </>
    )
}