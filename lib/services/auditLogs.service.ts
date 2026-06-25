const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAuditLogs(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/audit-logs`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('Error al obtener los audit logs');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}