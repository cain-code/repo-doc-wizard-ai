
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentationGeneratorProps {
  repoUrl: string;
  projectDescription: string;
  targetAudience: string;
  tone: string;
  outputFormat: string;
  primaryLanguage: string;
  selectedComponents: string[];
  onGenerate: (docs: string, metadata?: any) => void;
}

const DocumentationGenerator: React.FC<DocumentationGeneratorProps> = ({
  repoUrl,
  onGenerate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    console.log('Starting documentation generation for:', repoUrl);
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setCurrentStep('Initializing...');

    try {
      // Check if backend is reachable
      setCurrentStep('Connecting to backend...');
      setProgress(10);
      
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
      console.log('Using API URL:', API_BASE_URL);
      
      const healthResponse = await fetch(`${API_BASE_URL}/health`);
      if (!healthResponse.ok) {
        throw new Error(`Backend health check failed with status: ${healthResponse.status}`);
      }
      
      console.log('Backend health check passed');
      setCurrentStep('Backend connected, preparing request...');
      setProgress(20);

      // Prepare the actual generation request
      const request = {
        repo_url: repoUrl,
        project_description: '',
        target_audience: 'intermediate',
        tone: 'professional',
        output_format: 'readme',
        primary_language: '',
        selected_components: ['overview', 'installation', 'usage', 'api']
      };

      console.log('Sending documentation request:', request);
      setCurrentStep('Sending generation request...');
      setProgress(30);

      const response = await fetch(`${API_BASE_URL}/generate-docs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      console.log('Response status:', response.status);
      setCurrentStep('Processing response...');
      setProgress(70);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      setProgress(90);
      setCurrentStep('Finalizing...');

      if (data.success && data.documentation) {
        setProgress(100);
        setCurrentStep('Documentation generated successfully!');
        onGenerate(data.documentation, data.metadata);
        toast.success('Documentation generated successfully!');
      } else {
        throw new Error(data.error || 'Documentation generation failed');
      }

    } catch (error) {
      console.error('Documentation generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      setCurrentStep('Error occurred');
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        if (!error) {
          setProgress(0);
          setCurrentStep('');
        }
      }, 3000);
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-400" />
          Documentation Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <p className="text-slate-300 font-mono text-sm break-all">{repoUrl}</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-700/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Generation Failed</span>
            </div>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {isGenerating && (
          <div className="space-y-4">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-center">{currentStep} ({progress}%)</p>
          </div>
        )}

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isGenerating ? 'Generating...' : 'Generate Documentation'}
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentationGenerator;
