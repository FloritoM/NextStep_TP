const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLatestCvByUser(userId: number, token: string) {
  try {
    const res = await fetch(`${API_URL}/cv/user/${userId}/latest`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener el CV");
    const text = await res.text();
    if(!text) return null; // body vacio, no hay cv
    return JSON.parse(text);
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}
export async function uploadCv(file: File, userId: number, token: string) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId.toString());

    const res = await fetch(`${API_URL}/cv/upload`, {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al subir el CV");
    return data;
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}