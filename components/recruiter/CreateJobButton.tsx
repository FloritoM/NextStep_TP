"use client";

import { useState } from 'react';
import CreateJobModal from '@/components/recruiter/CreateJobModal';
import { Seniority } from '@/lib/definitions';

export default function CreateJobButton({ 
    token, 
    seniorities 
}: { 
    token: string; 
    seniorities: Seniority[] 
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
                + Nueva vacante
            </button>
            
            {isModalOpen && (
                <CreateJobModal 
                    onClose={() => setIsModalOpen(false)}
                    token={token}
                    seniorities={seniorities}
                />
            )}
        </>
    );
}