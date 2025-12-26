const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface AnalyticsResponse {
  total_predictions: number;
  avg_confidence: number | null; // percentage 0-100
  active_users: number | null;
  avg_processing_ms: number | null;
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const res = await fetch(`${API_BASE_URL}/analytics`);
  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }
  return res.json();
}
