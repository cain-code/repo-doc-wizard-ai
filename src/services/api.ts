
import { DocumentationRequest, DocumentationResponse } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export class ApiService {
  static async generateDocumentation(request: DocumentationRequest): Promise<DocumentationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-docs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backend API Error:', error);
      throw new Error(`Failed to connect to backend. Please ensure the Python backend is running on ${API_BASE_URL}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async healthCheck(): Promise<{ status: string; service: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Backend health check failed:', error);
      throw new Error(`Backend health check failed. Please ensure the Python backend is running on ${API_BASE_URL}`);
    }
  }
}
