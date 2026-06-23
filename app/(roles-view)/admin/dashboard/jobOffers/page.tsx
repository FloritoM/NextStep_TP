import JobOffersLogs from '@/app/ui/jobOffersLogs'
import { auth } from '@/auth'

export default async function JobOffersLogPage() {
    const session = await auth()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-offers`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })

    const data = await res.json()
    console.log(data);

    return (
        <>
            <h1 className="text-amber-600 text-5xl font-bold text-center mt-20 mb-8">Vacantes Laborales</h1>
            <JobOffersLogs jobOffers={data} token={session?.accessToken as string} />
        </>
    )
}