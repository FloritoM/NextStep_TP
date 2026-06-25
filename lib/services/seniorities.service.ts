const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSeniorities(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/seniority`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!res.ok) throw new Error("Error al obtener los seniorities");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw error;
  }
}