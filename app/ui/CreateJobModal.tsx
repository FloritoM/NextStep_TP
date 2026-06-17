"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Seniority } from "@/app/lib/definitions";

export default function CreateJobModal({ onClose, token, seniorities }: { onClose: () => void, token: string | undefined, seniorities: Seniority[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const newJob = {
      title: formData.get("title"),
      seniorityId: Number(formData.get("seniorityId")), 
      description: formData.get("description"),
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job-offers`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        onClose();
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Detalle del error:", errorData);
        alert(`Error del servidor: ${JSON.stringify(errorData.message)}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold text-white mb-6">Crear Nueva Vacante</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            name="title" 
            placeholder="Título (Ej. Desarrollador Frontend)" 
            required 
            className="p-3 bg-gray-700 text-white rounded"
          />
          
          <select 
            name="seniorityId" 
            required
            className="p-3 bg-gray-700 text-white rounded"
            defaultValue=""
          >
            <option value="" disabled>Seleccioná un seniority</option>
            {seniorities.map((sen) => (
              <option key={sen.id} value={sen.id}>
                {sen.name}
              </option>
            ))}
          </select>

          <textarea 
            name="description" 
            placeholder="Descripción del puesto..." 
            required 
            rows={4}
            className="p-3 bg-gray-700 text-white rounded"
          />
          
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="text-gray-400">Cancelar</button>
            <button type="submit" disabled={isLoading} className="bg-amber-600 text-white px-6 py-2 rounded font-bold">
              {isLoading ? 'Guardando...' : 'Publicar Vacante'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}