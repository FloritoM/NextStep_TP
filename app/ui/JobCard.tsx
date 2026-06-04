"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Definimos qué forma tiene la vacante para que TypeScript nos ayude
interface JobOffer {
    id: number;
    title: string;
    seniority: string;
    description: string;
    isActive: boolean;
}

interface JobCardProps {
    job: JobOffer;
    userRole: string;
}

export default function JobCard({ job, userRole }: JobCardProps) {
    // Estado para controlar el acordeón (abierto/cerrado)
    const [isExpanded, setIsExpanded] = useState(false);

    // Función para manejar el clic en la tarjeta
    const toggleExpand = () => {
        if (job.isActive) {
            setIsExpanded(!isExpanded);
        }
    };

    // Función que se ejecutará cuando el candidato aplique
    const handleApply = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que al hacer clic en el botón se cierre la tarjeta
        alert(`¡Aplicaste a ${job.title}! (Próximamente conectaremos esto al backend)`);
    };

    return (
        <div className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-sm ${
            job.isActive 
                ? 'bg-gray-800 border-gray-700 hover:border-amber-600' 
                : 'bg-gray-900 border-gray-800 opacity-50 grayscale'
        }`}>
            {/* Cabecera de la Tarjeta (La parte que siempre se ve) */}
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
                        {job.seniority}
                    </span>
                </div>
                
                {/* Icono de flecha o etiqueta de Inactiva */}
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

            {/* Acordeón: Detalles y Botón de Aplicar (La parte que se despliega) */}
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-750 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-8 border-t border-gray-600 bg-gray-700/50">
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </p>
                    
                    {/* Renderizado condicional: Solo los 'applicant' ven el botón en vacantes activas */}
                    {userRole === 'applicant' && job.isActive && (
                        <button 
                            onClick={handleApply}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg"
                        >
                            Aplicar a esta vacante
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}