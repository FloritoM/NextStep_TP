const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStages(token: string) {
  try {
    const res = await fetch(`${API_URL}/stages`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error al obtener las etapas');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}