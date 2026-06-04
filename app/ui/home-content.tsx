"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import JobCard from './JobCard';
import CreateJobModal from './CreateJobModal';

export default function HomeContent({ user, initialJobs }: { user: any, initialJobs: any[] }) {
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
                    
                    {user.role === 'recruiter' && (
                       
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="bg-amber-600 font-bold py-4 px-8 rounded-full"
                        >
                            Agregar Oferta
                        </button>
                    )}
                </div>

                {/* Renderizamos componentes separados por cada trabajo */}
                <div className="space-y-5">
                    {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} userRole={user.role} />
                    ))}
                </div>
            </div>

            {/* Si el estado es true, mostramos el componente del formulario */}
            {isModalOpen && (
                <CreateJobModal 
                    onClose={() => setIsModalOpen(false)}
                    token={user.accessToken}
                />
            )}
        </div>
    );
}