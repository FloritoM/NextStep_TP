"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { JobOffer } from '@/lib/definitions';
import { createJobApplication } from '@/lib/services/jobApplications.service';

interface JobCardProps {
    job: JobOffer;
    userRole: string;
    token: string | undefined; 
}

export default function JobCard({ job, userRole, token }: JobCardProps) {

    const [isExpanded, setIsExpanded] = useState(false);
    
    const [isApplying, setIsApplying] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleExpand = () => {
        if (job.isActive) {
            setIsExpanded(!isExpanded);
        }
    };

    const handleApply = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!token) return;

        setIsApplying(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            await createJobApplication(job.id, token);
            setStatus('success');
        } catch (error: unknown) {
            console.error(error);
            setStatus('error');
            setErrorMessage((error as Error).message);
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-sm ${
            job.isActive 
                ? 'bg-gray-800 border-gray-700 hover:border-amber-600' 
                : 'bg-gray-900 border-gray-800 opacity-50 grayscale'
        }`}>
    
            <div
                className={`px-8 py-6 flex justify-between items-center ${job.isActive ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={toggleExpand}
            >
                <div>
                    <h2 className={`text-2xl font-bold ${job.isActive ? 'text-white' : 'text-gray-500'}`}>
                        {job.title}
                    </h2>
                    <span className={`text-sm font-semibold px-4 py-1.5 rounded-full inline-block mt-3 ${
                        job.isActive ? 'bg-gray-700 text-amber-500 border border-gray-600' : 'bg-gray-800 text-gray-500 border border-gray-700'
                    }`}>
                        {job.seniority?.name || 'N/A'} 
                    </span>
                </div>
                
                {job.isActive ? (
                    <FontAwesomeIcon
                        icon={isExpanded ? faChevronUp : faChevronDown}
                        className="text-gray-400 text-xl transition-transform"
                    />
                ) : (
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded">
                        Inactiva
                    </span>
                )}
            </div>

            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-750 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-8 border-t border-gray-600 bg-gray-700/50">
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </p>
                    
                    {userRole === 'applicant' && job.isActive && (
                        <div className="flex flex-col items-start gap-2">
                            
                            <button 
                                onClick={handleApply}
                                disabled={isApplying || status === 'success'}
                                className={`font-bold py-3 px-8 rounded-xl transition-colors shadow-lg ${
                                    status === 'success' 
                                        ? 'bg-green-600 text-white cursor-not-allowed' 
                                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                                }`}
                            >
                                {isApplying ? 'Enviando...' : status === 'success' ? '¡Postulado!' : 'Aplicar a esta vacante'}
                            </button>
                            
                            {status === 'error' && (
                                <span className="text-red-400 text-sm font-medium ml-2">
                                    {errorMessage}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}