
import { DocumentationRequest, DocumentationResponse } from '@/types/api';
import { MockApiService } from './mockApiService';

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
      console.log('Backend not available, using mock service');
      // Fallback to mock service when backend is not available
      return MockApiService.generateDocumentation(request);
    }
  }

  static async healthCheck(): Promise<{ status: string; service: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.log('Backend not available, using mock health check');
      return MockApiService.healthCheck();
    }
  }
}
