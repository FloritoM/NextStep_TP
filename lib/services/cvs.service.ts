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
    throw new Error('Error de conexión');
  }
}