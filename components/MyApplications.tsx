"use client";

import { useState, useEffect } from "react";
import { JobApplication, Feedback } from "@/app/lib/definitions";

export default function MyApplications({ token }: { token: string }) {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loadingFeedback, setLoadingFeedback] = useState(false);

    useEffect(() => {
        async function loadApplications() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job-applications/my-applications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setApplications(data);
            setLoading(false);
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/my-feedback?applicationId=${app.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setFeedbacks(Array.isArray(data) ? data : []);
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
                                    ) : feedbacks.filter((fb) => fb.publicFeedback || fb.comment).length === 0 ? (
                                        <p className="text-gray-400">Todavía no recibiste feedback para esta postulación.</p>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            {feedbacks
                                                .filter((fb) => fb.publicFeedback || fb.comment)
                                                .map((fb) => (
                                                    <div key={fb.id} className="bg-gray-900 rounded-lg p-4">
                                                        <p className="text-amber-500 font-semibold mb-2">{fb.stage.name}</p>
                                                        {fb.publicFeedback && (
                                                            <p className="text-gray-200">{fb.publicFeedback}</p>
                                                        )}
                                                        {fb.comment && (
                                                            <p className="text-gray-300 mt-2">{fb.comment}</p>
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