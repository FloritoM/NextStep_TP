export async function getJobOffers(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-offers`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!res.ok) {
      console.error("Error trayendo vacantes:", res.status, await res.text());
      return [];
    }
    //teneer swagger para entender mejor los errores del backend

    return res.json();
  } catch (error) {
    console.error("Error de conexión con el backend:", error);
    return [];
  }
}

export async function getSeniorities(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seniority`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error trayendo seniorities:", error);
    return [];
  }
}

export async function getAuditLogs(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/audit-logs`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error trayendo audit logs:", error);
    return [];
  }
}

export async function getUsers(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error trayendo usuarios:", error);
    return [];
  }
}