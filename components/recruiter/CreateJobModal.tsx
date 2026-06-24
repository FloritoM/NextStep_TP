"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Seniority } from "@/app/lib/definitions";
import { createJobOffer } from "@/app/lib/actions/jobOffers.actions";

export default function CreateJobModal({
  onClose,
  token,
  seniorities,
}: {
  onClose: () => void;
  token: string | undefined;
  seniorities: Seniority[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newJob = {
      title: formData.get("title") as string,
      seniorityId: Number(formData.get("seniorityId")),
      description: formData.get("description") as string,
    };

    try {
      await createJobOffer(newJob, token ?? "");
      onClose();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la vacante");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold text-white mb-6">Crear Nueva Vacante</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

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
              <option key={sen.id} value={sen.id}>{sen.name}</option>
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
            <button type="button" onClick={onClose} className="text-gray-400">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="bg-amber-600 text-white px-6 py-2 rounded font-bold">
              {isLoading ? "Guardando..." : "Publicar Vacante"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}