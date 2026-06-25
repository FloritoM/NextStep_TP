"use client";

import { useState, useEffect } from "react";
import { JobApplication, Feedback, Scorecard } from "@/lib/definitions";
import { getMyApplications } from "@/lib/services/jobApplications.service";
import { getMyFeedback } from "@/lib/services/feedbacks.service";
import { getScorecardsByFeedback } from "@/lib/services/scorecards.service";

export default function MyApplications({ token }: { token: string }) {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [scorecards, setScorecards] = useState<Record<number, Scorecard[]>>({});
    const [loadingFeedback, setLoadingFeedback] = useState(false);

    useEffect(() => {
        async function loadApplications() {
            try {
                const data = await getMyApplications(token);
                setApplications(data || []);
            } catch (error) {
                console.error("Error al cargar postulaciones:", error);
            } finally {
                setLoading(false);
            }
        }
        loadApplications();
    }, [token]);

    async function handleSelectApplication(app: JobApplication) {
        if (selectedApp?.id === app.id) {
            setSelectedApp(null);
            return;
        }

        setSelectedApp(app);
        setLoadingFeedback(true);

        const data = await getMyFeedback(token, app.id);
        const feedbacksConContenido: Feedback[] = Array.isArray(data)
            ? data.filter((fb: Feedback) => fb.publicFeedback)
            : [];
        setFeedbacks(feedbacksConContenido);

        const scorecardsMap: Record<number, Scorecard[]> = {};
        await Promise.all(
            feedbacksConContenido.map(async (fb) => {
                const scData = await getScorecardsByFeedback(fb.id, token);
                scorecardsMap[fb.id] = Array.isArray(scData) ? scData : [];
            })
        );
        setScorecards(scorecardsMap);
        setLoadingFeedback(false);
    }

    if (loading) {
        return <p className="text-gray-400">Cargando postulaciones...</p>;
    }

    return (
        <div className="flex flex-col gap-8 text-gray-100">
            <div>
                <h1 className="text-3xl font-bold">Mis Postulaciones</h1>
                <p className="text-gray-400 mt-2">Seguí el estado de cada postulación y revisá el feedback recibido.</p>
            </div>

            {applications.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Todavía no te postulaste a ninguna vacante.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            onClick={() => handleSelectApplication(app)}
                            className={`cursor-pointer rounded-xl border p-5 transition-colors ${selectedApp?.id === app.id
                                ? 'bg-gray-700 border-amber-600'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-white">{app.jobOffer.title}</h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Postulado el {new Date(app.createdAt).toLocaleDateString('es-AR', {
                                            day: '2-digit', month: '2-digit', year: 'numeric',
                                            timeZone: 'America/Argentina/Buenos_Aires',
                                        })}
                                    </p>
                                </div>
                                <span className="text-sm font-semibold px-4 py-1.5 rounded-full bg-gray-700 text-amber-500 border border-gray-600">
                                    {app.currentStage.name}
                                </span>
                            </div>

                            {selectedApp?.id === app.id && (
                                <div className="mt-5 pt-5 border-t border-gray-600">
                                    {loadingFeedback ? (
                                        <p className="text-gray-400">Cargando feedback...</p>
                                    ) : feedbacks.length === 0 ? (
                                        <p className="text-gray-400">Todavía no recibiste feedback para esta postulación.</p>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            {feedbacks.map((fb) => (
                                                <div key={fb.id} className="bg-gray-900 rounded-lg p-4">
                                                    <p className="text-amber-500 font-semibold mb-2">{fb.stage.name}</p>
                                                    {fb.publicFeedback && (
                                                        <p className="text-gray-200 mb-3">{fb.publicFeedback}</p>
                                                    )}
                                                    {scorecards[fb.id]?.length > 0 && (
                                                        <div className="flex flex-col gap-2 mt-2">
                                                            <p className="text-gray-400 text-sm font-semibold">Scorecards</p>
                                                            {scorecards[fb.id].map((sc) => (
                                                                <div key={sc.id} className="flex justify-between items-center bg-gray-800 rounded px-3 py-2">
                                                                    <div>
                                                                        <span className="text-white text-sm">{sc.skillName}</span>
                                                                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${sc.type === 'technical' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
                                                                            {sc.type === 'technical' ? 'Técnica' : 'Soft'}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex gap-1">
                                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                                            <span key={i} className={i < sc.score ? 'text-amber-400' : 'text-gray-600'}>★</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}