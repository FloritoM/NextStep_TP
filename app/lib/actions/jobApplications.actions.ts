const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function updateJobApplicationStage(
  applicationId: number,
  stageId: number,
  token: string,
) {
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
}