const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(token: string | undefined) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('Error al obtener los usuarios');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}

export async function getUserById(token: string, userId: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/users/my-info`, {
      cache: 'no-store',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Error al obtener el usuario');
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function updateUser(token: string, userId: string, body: object) {
  try {
    const res = await fetch(`${process.env.API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body)
    });
    return { ok: res.ok, status: res.status, data: await res.json() };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function toggleUserActive(userId: number | string, isActive: boolean, token: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ isActive }),
    });
    if (!res.ok) throw new Error('Error al actualizar el estado del usuario');
    return res.json();
  } catch (error) {
    console.error('Hubo un error:', error);
    throw error instanceof Error ? error : new Error('Error de conexión');
  }
}