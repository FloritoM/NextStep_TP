const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ── Job Offers ──
export async function getJobOffers(token: string) {
  const res = await fetch(`${API_URL}/job-offers`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  console.log("STATUS:", res.status);
  if (!res.ok) throw new Error("Error al obtener las job offers");
  return res.json();
}

export async function getJobOffer(id: number, token: string) {
  const res = await fetch(`${API_URL}/job-offers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener la job offer");
  return res.json();
}


// -Stages Applications-
export async function getStages(token: string) {
  const res = await fetch(`${API_URL}/stages`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

// ── Job Applications ──
export async function getJobApplications(jobOfferId: number, token: string) {
  const res = await fetch(`${API_URL}/job-applications?jobOfferId=${jobOfferId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener las postulaciones");
  return res.json();
}

// ── Feedback ──
export async function getFeedbackByApplication(applicationId: number, token: string) {
  const res = await fetch(`${API_URL}/feedback?applicationId=${applicationId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return []; // ← en vez de tirar error, devuelve array vacío
  return res.json();
}

export async function createFeedback(data: object, token: string) {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear el feedback");
  return res.json();
}

export async function updateFeedback(id: number, data: object, token: string) {
  const res = await fetch(`${API_URL}/feedback/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el feedback");
  return res.json();
}

// ── Scorecards ──
export async function getScorecardsByFeedback(feedbackId: number, token: string) {
  const res = await fetch(`${API_URL}/scorecards/feedback/${feedbackId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener las scorecards");
  return res.json();
}

export async function createScorecard(data: object, token: string) {
  const res = await fetch(`${API_URL}/scorecards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la scorecard");
  return res.json();
}

export async function getLatestCvByUser(userId: number, token: string) {
  const res = await fetch(`${API_URL}/cv/user/${userId}/latest`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;

  const text=await res.text();
  if(!text) return null; //body vacio, no hay cv

  return JSON.parse(text);
 
}

export async function updateScorecard(id: number, data: object, token: string) {
  const res = await fetch(`${API_URL}/scorecards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la scorecard");
  return res.json();
}