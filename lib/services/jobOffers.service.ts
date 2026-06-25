const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { JobOfferPayload } from '@/lib/definitions';

export async function getJobOffers(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/job-offers`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!res.ok) throw new Error("Error al obtener las vacantes");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function getJobOffer(id: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/job-offers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener la vacante");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

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

export async function createJobOffer(data: JobOfferPayload, token: string) {
  try {
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
    } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function updateJobOffer(
  jobId: number,
  data: Partial<JobOfferPayload>,
  token: string,
) {
  try {
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
    } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}