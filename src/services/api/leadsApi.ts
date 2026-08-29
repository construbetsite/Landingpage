// ============================================================
// LEADS API — Newsletter (POST /api/leads)
// ============================================================
const API_BASE = (
  import.meta.env.VITE_API_BASE || "http://localhost:10000/api"
).replace(/\/+$/, "");

export class LeadApiError extends Error {
  public readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "LeadApiError";
    this.status = status;
  }
}

export async function createLead(payload: {
  nome: string;
  email: string;
  whatsapp?: string;
}) {
  const response = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "Erro ao salvar lead";
    try {
      const data = await response.json();
      if (data.message) errorMessage = data.message;
      if (data.errors) errorMessage = data.errors.join(", ");
    } catch {
      // fallback
    }
    throw new LeadApiError(errorMessage, response.status);
  }

  return response.json();
}