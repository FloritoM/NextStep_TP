"use client";

import { useState } from "react";
import ActionIcon from "@/app/ui/ActionIcon";

interface JobOfferToggleProps {
  jobId: number;
  initialIsActive: boolean;
  token: string;
}

export default function JobOfferToggle({
  jobId,
  initialIsActive,
  token,
}: JobOfferToggleProps) {
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  async function handleToggle() {
    setIsLoading(true);
    const newValue = !isActive;

    try {
      const res = await fetch(`${API_URL}/job-offers/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: newValue }),
      });

      if (!res.ok) throw new Error("Error al actualizar el estado");

      setIsActive(newValue);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
        isActive ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"
      }`}>
        {isActive ? "Activa" : "Pausada"}
      </span>
      <ActionIcon
        isActive={isActive}
        entityId={jobId}
        onToggle={isLoading ? () => {} : handleToggle}
      />
    </div>
  );
}