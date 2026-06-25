const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getScorecardsByFeedback(feedbackId: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/scorecards/feedback/${feedbackId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error al obtener las scorecards');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}

export async function createScorecard(data: object, token: string) {
  try {
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
  } catch (error) {
    console.error("Hubo un error:", error);
    throw new Error('Error de conexión');
  }
}

export async function updateScorecard(id: number, data: object, token: string) {
  try {
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
  } catch (error) {
    console.error("Hubo un error:", error);
    throw new Error('Error de conexión');
  }
}
