import JobOffersLogs from '@/app/ui/jobOffersLogs'
import { auth } from '@/auth'

export default async function JobOffersLogPage() {
    const session = await auth()

    const res = await fetch(`${process.env.BACKEND_URL}/job-offers`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })

    const data = await res.json()

    return (
        <>
            <h1 className="text-amber-600 text-5xl font-bold text-center mt-20 mb-8">Job Offers</h1>
            <JobOffersLogs jobOffers={data} token={session?.accessToken as string} />
        </>
    )
}