import { auth } from '@/auth'

import { RecruiterCandidatesByStageGraph } from '@/components/recruiter/recruiterCandidatesByStageGraph'
import { RecruiterFeedbacksGraph } from '@/components/recruiter/recuiterFeedbacksGraph'
import { RecruiterOffersGraph } from '@/components/recruiter/recruiterOffersGraph'
import { getMySentFeedbacks } from '@/lib/services/feedbacks.service'
import { getCandidatesByStage } from '@/lib/services/jobApplications.service'
import { getMyOffers } from '@/lib/services/jobOffers.service'

export default async function RecruiterDashboard() {
    const session = await auth()

    const [feedbacks, candidatesByStage, myOffers] = await Promise.all([
        getMySentFeedbacks(session?.accessToken),
        getCandidatesByStage(session?.accessToken),
        getMyOffers(session?.accessToken),
    ])

    const totalCandidatos = candidatesByStage.reduce((acc: number, item: { stage: string; count: number }) => acc + item.count, 0);
    return (
        <div className="bg-main">

            <div className='mt-10'>
                <h1 className="text-3xl font-bold text-gray-100">Resumen de Actividad</h1>
                <p className="text-gray-400 mt-2">Visualizá datos e índices de la actividad de los candidatos.</p>
            </div>

            <section id="counters" className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Feedbacks enviados</span>
                        <span className="text-5xl font-bold text-amber-500">{feedbacks.length}</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Candidatos</span>
                        <span className="text-5xl font-bold text-blue-500">{totalCandidatos}</span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
                        <span className="text-gray-400 font-medium mb-1">Mis vacantes publicadas</span>
                        <span className="text-5xl font-bold text-yellow-500">{myOffers.length}</span>
                    </div>
                </div>
            </section>
            <section id="charts" className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[100%] mx-auto">
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="text-center text-white font-bold text-xl mb-4">Feedbacks enviados</h2>
                        <RecruiterFeedbacksGraph feedbacks={feedbacks} />
                    </div>
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="text-center text-white font-bold text-xl mb-4">Candidatos por etapa</h2>
                        <RecruiterCandidatesByStageGraph candidates={candidatesByStage} />
                    </div>
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="text-center text-white font-bold text-xl mb-4">Mis ofertas activas vs inactivas</h2>
                        <RecruiterOffersGraph offers={myOffers} />
                    </div>
                </div>
            </section>
        </div>
    );
}