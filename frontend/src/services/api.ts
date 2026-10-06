import type { FruitPredictionResponse, HealthStatus, ModelInfo, ClassesResponse } from '../types/disease';


const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const NGROK_HEADERS: HeadersInit = {
  'ngrok-skip-browser-warning': 'true',
};

export class ApiError extends Error {
  statusCode?: number;
  details?: unknown;

  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const apiService = {
  /**
   * Health check endpoint
   */
  async getHealth(): Promise<HealthStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        headers: NGROK_HEADERS,
      });
      if (!response.ok) {
        throw new ApiError(`Health check failed: ${response.statusText}`, response.status);
      }
      return await response.json();
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Unable to connect to the prediction backend server.', 0, err);
    }
  },

  /**
   * Model information endpoint
   */
  async getModelInfo(): Promise<ModelInfo> {
    try {
      const response = await fetch(`${API_BASE_URL}/model-info`, {
        headers: NGROK_HEADERS,
      });
      if (!response.ok) {
        throw new ApiError(`Failed to fetch model info: ${response.statusText}`, response.status);
      }
      return await response.json();
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Failed to fetch model metadata.', 0, err);
    }
  },

  /**
   * Class mapping endpoint
   */
  async getClasses(): Promise<ClassesResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/classes`, {
        headers: NGROK_HEADERS,
      });
      if (!response.ok) {
        throw new ApiError(`Failed to fetch classes: ${response.statusText}`, response.status);
      }
      return await response.json();
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Failed to fetch class mappings.', 0, err);
    }
  },

  /**
   * Classify citrus fruit image via POST /predict
   * @param file File object from input or dropzone
   */
  async predictFruit(file: File): Promise<FruitPredictionResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: NGROK_HEADERS,
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Inference failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = typeof errorData.detail === 'string' 
              ? errorData.detail 
              : JSON.stringify(errorData.detail);
          }
        } catch {
          // fallback to status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new ApiError(errorMessage, response.status);
      }

      const result: FruitPredictionResponse = await response.json();
      return result;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        'Network error: Failed to reach the fruit disease detection API. Please ensure the backend is running.',
        0,
        err
      );
    }
  },

  /**
   * Classify citrus leaf foliage image via POST /predict/leaf
   * @param file File object from input or dropzone
   */
  async predictLeaf(file: File): Promise<FruitPredictionResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/predict/leaf`, {
        method: 'POST',
        headers: NGROK_HEADERS,
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Leaf inference failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = typeof errorData.detail === 'string'
              ? errorData.detail
              : JSON.stringify(errorData.detail);
          }
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new ApiError(errorMessage, response.status);
      }

      const result: FruitPredictionResponse = await response.json();
      return result;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        'Network error: Failed to reach the leaf disease detection API. Please ensure the backend is running.',
        0,
        err
      );
    }
  }
};
