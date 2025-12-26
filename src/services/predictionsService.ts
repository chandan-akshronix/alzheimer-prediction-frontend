const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface PredictionRecord {
  prediction_id: string;
  filename?: string;
  predicted_class?: string;
  confidence?: number | null; // percentage 0-100
  class_probabilities?: Record<string, number>;
  processing_ms?: number | null;
  created_at?: string;
  image_data?: string | null; // data URL
}

export async function fetchPredictions(limit = 200): Promise<PredictionRecord[]> {
  const res = await fetch(`${API_BASE_URL}/predictions?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch predictions');
  const data = await res.json();
  return data as PredictionRecord[];
}
