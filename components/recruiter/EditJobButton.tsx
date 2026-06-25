"use client";

import { useState } from 'react';
import EditJobModal from '@/components/recruiter/EditJobModal';
import { Seniority } from '@/lib/definitions';

interface EditJobButtonProps {
  token: string;
  seniorities: Seniority[];
  jobId: number;
  initialTitle: string;
  initialDescription: string;
  initialSeniorityId?: number;
}

export default function EditJobButton({
  token,
  seniorities,
  jobId,
  initialTitle,
  initialDescription,
  initialSeniorityId,
}: EditJobButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Editar vacante
      </button>

      {isModalOpen && (
        <EditJobModal
          onClose={() => setIsModalOpen(false)}
          token={token}
          seniorities={seniorities}
          jobId={jobId}
          initialTitle={initialTitle}
          initialDescription={initialDescription}
          initialSeniorityId={initialSeniorityId}
        />
      )}
    </>
  );
}