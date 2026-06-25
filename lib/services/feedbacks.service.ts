const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFeedbackByApplication(applicationId: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/feedback?applicationId=${applicationId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener el feedback");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function getMyFeedbacks(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/feedback/my-feedbacks`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Error al obtener los feedbacks");
    return await res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function createFeedback(data: object, token: string) {
  try {
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
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function updateFeedback(id: number, data: object, token: string) {
  try {
    const res = await fetch(`${API_URL}/feedback/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar el feedback");
    }
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function generatePublicFeedback(applicationId: number, token: string) {
    try {
        const res = await fetch(`${API_URL}/feedback/generate/${applicationId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al generar el feedback");
        }
        return res.json();
    } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function generateFeedbackForOne(feedbackId: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/feedback/${feedbackId}/generate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al generar el feedback");
    }
    return data;
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}
