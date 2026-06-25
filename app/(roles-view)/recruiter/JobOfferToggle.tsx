"use client";

import { useState } from "react";
import ActionIcon from "@/app/ui/ActionIcon";
import { toggleJobOfferActive } from "@/lib/services/jobOffers.service";

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


  async function handleToggle() {
    setIsLoading(true);
    const newValue = !isActive;

    try {
     await toggleJobOfferActive(jobId, newValue, token);
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