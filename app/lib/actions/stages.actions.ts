const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getCandidatesByStage(token: string | undefined) {
  const res = await fetch(`${API_URL}/job-applications/my-candidates-by-stage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(
      Array.isArray(result.message) ? result.message.join(", ") : result.message,
    );
  }
  return result;
}