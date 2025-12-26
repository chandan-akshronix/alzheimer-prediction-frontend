const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export type PredictionProbs = Record<string, number>;

/**
 * Upload an image file for Alzheimer's disease prediction
 * Returns a mapping of class name -> probability (e.g. { "NonDemented": 0.92, ... })
 */
export async function uploadImageForPrediction(file: File): Promise<PredictionProbs> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error && (error.detail || error.error)) || "Failed to process prediction");
  }

  // backend returns an object with class probabilities
  return response.json();
}
