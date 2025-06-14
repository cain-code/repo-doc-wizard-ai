
export interface DocumentationRequest {
  repo_url: string;
  project_description?: string;
  target_audience: 'beginner' | 'intermediate' | 'advanced';
  tone: 'professional' | 'friendly' | 'technical' | 'fun';
  output_format: 'readme' | 'markdown' | 'html' | 'pdf';
  primary_language?: string;
  selected_components: string[];
}

export interface DocumentationResponse {
  success: boolean;
  documentation?: string;
  error?: string;
  metadata?: {
    repo_analysis: RepoAnalysis;
    request_params: DocumentationRequest;
  };
}

export interface RepoAnalysis {
  name: string;
  description?: string;
  language?: string;
  technologies: string[];
  structure: Record<string, any>;
  readme_exists: boolean;
  license_type?: string;
  git_history: GitCommit[];
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
}
