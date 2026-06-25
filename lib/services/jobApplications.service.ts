const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getJobApplicationsByJobOffer(jobOfferId: number, token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/job-applications?jobOfferId=${jobOfferId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener las postulaciones");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function getMyApplications(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/job-applications/my-applications`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Error al obtener las postulaciones");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}

export async function updateJobApplicationStage(
  applicationId: number,
  stageId: number,
  token: string,
) {
  try {
    const res = await fetch(`${API_URL}/job-applications/${applicationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stageId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al cambiar la etapa");
    return data;
    } catch (error) {
        console.error("Hubo un error:", error);
        throw error;
    }
}