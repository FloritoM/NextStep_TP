const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getJobApplicationsByJobOffer(jobOfferId: number, token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/job-applications?jobOfferId=${jobOfferId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error al obtener las postulaciones');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}

export async function getMyApplications(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/job-applications/my-applications`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error al obtener las postulaciones');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}

export async function getCandidatesByStage(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/job-applications/my-candidates-by-stage`, {
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
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}

export async function createJobApplication(jobOfferId: number, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ jobOfferId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al postularse");
    return data;
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error instanceof Error ? error : new Error('Error de conexión');
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
        throw error instanceof Error ? error : new Error('Error de conexión');
    }
}