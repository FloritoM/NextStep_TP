"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import JobCard from './JobCard';
import CreateJobModal from './CreateJobModal';
import { JobOffer, Seniority, User } from '../lib/definitions';
import { canCreateJobOffer } from '../lib/permissions';

export default function HomeContent({ user, token, initialJobs, seniorities }: { user: User, token: string | undefined, initialJobs: JobOffer[], seniorities: Seniority[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredJobs = initialJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-main text-white">
            <Navbar /> 

            <div className="max-w-4xl mx-auto mt-12 px-6">
                <div className="flex justify-between items-center mb-8 gap-4">
                    <input
                        type="text"
                        placeholder="Buscar vacantes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-full py-4 px-6"
                    />
                    
                    {canCreateJobOffer(user) && (
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="bg-amber-600 font-bold py-4 px-8 rounded-full"
                        >
                            Agregar Oferta
                        </button>
                    )}
                </div>

                <div className="space-y-5">
                    {filteredJobs.map(job => (
                        <JobCard 
                            key={job.id} 
                            job={job} 
                            userRole={user.role.name}
                            token={token} 
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <CreateJobModal 
                    onClose={() => setIsModalOpen(false)}
                    token={token}
                    seniorities={seniorities}
                />
            )}
        </div>
    );
}