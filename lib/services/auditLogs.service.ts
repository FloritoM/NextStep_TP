const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAuditLogs(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/audit-logs`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error("Error al obtener los audit logs");
    return res.json();
  } catch (error) {
    console.error("Hubo un error:", error);
    throw new Error('Error de conexión');
  }
}