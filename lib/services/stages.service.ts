const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStages(token: string) {
  try {
    const res = await fetch(`${API_URL}/stages`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error al obtener las etapas");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}