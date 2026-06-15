"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import JobCard from './JobCard';
import CreateJobModal from './CreateJobModal';
import { JobOffer, Seniority, User } from '../lib/definitions';
import { canCreateJobOffer } from '../lib/permissions';

export default function HomeContent({ 
    user, 
    token, 
    initialJobs, 
    seniorities 
}: { 
    user: User, 
    token: string | undefined, 
    initialJobs: JobOffer[], 
    seniorities: Seniority[] 
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSeniorities, setSelectedSeniorities] = useState<number[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSeniority = (id: number) => {
        setSelectedSeniorities(prev => 
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        );
    };

    const filteredJobs = initialJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeniority = selectedSeniorities.length === 0 || (job.seniority && selectedSeniorities.includes(job.seniority.id));
        
        return matchesSearch && matchesSeniority;
    });

    return (
        <div className="min-h-screen bg-main text-white">
            <Navbar /> 

            <div className="max-w-4xl mx-auto mt-12 px-6">
                
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100">
                    Encontrá el trabajo de tus sueños
                </h1>

                <div className="flex flex-col gap-4 mb-8">
                    
                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Buscar vacantes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700 text-white rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        
                        {canCreateJobOffer(user) && (
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="bg-amber-600 hover:bg-amber-500 transition-colors font-bold py-4 px-8 rounded-full shrink-0 text-center"
                            >
                                Agregar Oferta
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {seniorities.map((sen) => (
                            <button
                                key={sen.id}
                                onClick={() => toggleSeniority(sen.id)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    selectedSeniorities.includes(sen.id)
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {sen.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-5">
                    {filteredJobs.length === 0 ? (
                        <div className="text-center py-10 bg-gray-800 rounded-xl border border-gray-700">
                            <p className="text-gray-400 text-lg">No se encontraron vacantes con esos filtros.</p>
                        </div>
                    ) : (
                        filteredJobs.map(job => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                userRole={user.role.name} 
                                token={token} 
                            />
                        ))
                    )}
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