const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface ModelInfo {
  filename: string;
  path?: string;
  size_bytes?: number;
  modified_at?: string;
  active?: boolean;
}

export async function fetchModels(): Promise<ModelInfo[]> {
  const res = await fetch(`${API_BASE_URL}/models`);
  if (!res.ok) throw new Error('Failed to fetch models');
  return res.json();
}
