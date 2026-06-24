const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function toggleJobOfferActive(
  jobId: number,
  isActive: boolean,
  token: string,
) {
  const res = await fetch(`${API_URL}/job-offers/${jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  });
  if (!res.ok) throw new Error("Error al actualizar el estado");
  return res.json();
}

interface JobOfferPayload {
  title: string;
  description: string;
  seniorityId: number;
}

export async function createJobOffer(data: JobOfferPayload, token: string) {
  const res = await fetch(`${API_URL}/job-offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(
      Array.isArray(result.message) ? result.message.join(", ") : result.message,
    );
  }
  return result;
}

export async function updateJobOffer(
  jobId: number,
  data: Partial<JobOfferPayload>,
  token: string,
) {
  const res = await fetch(`${API_URL}/job-offers/${jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(
      Array.isArray(result.message) ? result.message.join(", ") : result.message,
    );
  }
  return result;
}

export async function getMyOffers(token: string | undefined) {
  const res = await fetch(`${API_URL}/job-offers/my-offers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(
      Array.isArray(result.message) ? result.message.join(", ") : result.message,
    );
  }
  return result;
}