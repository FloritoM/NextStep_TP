const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSeniorities(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/seniority`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    if (!res.ok) {
      throw new Error('Error al obtener los seniorities');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}