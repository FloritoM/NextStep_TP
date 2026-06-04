"use client";

import {UserRole} from "@/types/auth";

interface RoleSelectorProps{
    onSelect:(role:UserRole)=>void;
}

const roles=[
    {
        value:"candidate" as UserRole,
        label: "Candidato",
        description: "Buscas nuevas oportunidades y te gustaría recibir feedbacks reales de tus procesos",
        icon:(
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 24c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "recruiter" as UserRole,
    label: "Reclutador",
    description:"Publicas búsquedas laborales, evaluas candidatos y cargas feedback estructurado",
    icon: (
        <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 11h20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 17h6M9 20h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="21" cy="20" r="3.5" fill="#0a0f1a" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20l.8.8 1.6-1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

    ),
  },
  
];

export default function RoleSelector({ onSelect }: RoleSelectorProps) {
  return (
    <div >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          ¿Cómo vas a usar NextStep?
        </h1>
        <p className="text-[#8899aa] text-sm">
          Elegí el rol que mejor describe tu perfil
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => onSelect(role.value)}
                className="group relative text-left w-full rounded-2xl border border-[#1e2d3d] bg-[#0d1824] hover:border-[#3b9ede]/60 hover:bg-[#0f1f30] transition-colors duration-200 p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9ede] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]"
          >
            <div className="absolute inset-0 rounded-2xl bg-[#3b9ede]/0 group-hover:bg-[#3b9ede]/[0.04] transition-colors duration-200 pointer-events-none" />

            <div className="flex items-start gap-4 relative">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0a1a28] border border-[#1e2d3d] group-hover:border-[#3b9ede]/40 flex items-center justify-center text-[#3b9ede] transition-colors duration-200">
                {role.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-white font-semibold text-base group-hover:text-[#5db8f5] transition-colors duration-200">
                    {role.label}
                  </h2>
                  <svg
                    className="w-4 h-4 text-[#4a5a6a] group-hover:text-[#3b9ede] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 ml-2"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[#6a7f94] text-sm leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}