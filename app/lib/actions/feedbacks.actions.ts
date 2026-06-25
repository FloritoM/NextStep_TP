const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getMySentFeedbacks(token: string | undefined) {
  const res = await fetch(`${API_URL}/feedback/my-sent-feedbacks`, {
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