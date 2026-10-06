export interface FruitPredictionResponse {
  class_id: number;
  predicted_class: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export type LeafPredictionResponse = FruitPredictionResponse;

export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  fruit_model_loaded?: boolean;
  leaf_model_loaded?: boolean;
}

export interface ModelInfo {
  model_name: string;
  architecture: string;
  num_classes: number;
  total_parameters: number;
}

export interface ClassesResponse {
  classes: Record<string, string>;
}

export type DiseaseSeverity = 'healthy' | 'low' | 'moderate' | 'high' | 'critical';

export interface DiseaseDetail {
  id: string;
  name: string;
  scientificName: string;
  category: 'fruit' | 'leaf' | 'both';
  severity: DiseaseSeverity;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  prevention: string[];
  badgeColor: string;
}

export interface ScanRecord {
  id: string;
  timestamp: string;
  type: 'fruit' | 'leaf';
  predictedClass: string;
  confidence: number;
  probabilities: Record<string, number>;
  imagePreviewUrl?: string;
  filename: string;
  notes?: string;
}
