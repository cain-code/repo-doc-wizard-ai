
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import DocumentationGenerator from '@/components/DocumentationGenerator';
import TutorialGenerator from '@/components/TutorialGenerator';
import { ApiService } from '@/services/api';

interface GenerateStepProps {
  repoUrl: string;
  activeTab: "documentation" | "tutorial";
  onBack: () => void;
  onDocumentationGenerate: (docs: string, metadata?: any) => void;
  onTutorialGenerate: (tutorial: string, metadata?: any) => void;
}

const GenerateStep: React.FC<GenerateStepProps> = ({
  repoUrl,
  activeTab,
  onBack,
  onDocumentationGenerate,
  onTutorialGenerate
}) => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkBackendStatus = async () => {
      console.log('Checking backend status...');
      try {
        await ApiService.healthCheck();
        console.log('Backend is online');
        setBackendStatus('online');
      } catch (error) {
        console.error('Backend health check failed:', error);
        setBackendStatus('offline');
      }
    };

    checkBackendStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Setup
          </Button>
        </div>

        {/* Backend Status Alert */}
        {backendStatus === 'offline' && (
          <Alert className="mb-6 bg-red-950/50 border-red-700/50 backdrop-blur-sm">
            <WifiOff className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">
              <strong>Backend Offline:</strong> The GitDocAI backend service is not responding. 
              Please ensure the Python backend is running on the configured API endpoint. 
              Check the console for more details.
            </AlertDescription>
          </Alert>
        )}

        {backendStatus === 'online' && (
          <Alert className="mb-6 bg-green-950/50 border-green-700/50 backdrop-blur-sm">
            <Wifi className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              <strong>Backend Online:</strong> Successfully connected to GitDocAI backend service.
            </AlertDescription>
          </Alert>
        )}

        {backendStatus === 'checking' && (
          <Alert className="mb-6 bg-blue-950/50 border-blue-700/50 backdrop-blur-sm">
            <Wifi className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-200">
              <strong>Checking Backend:</strong> Verifying connection to GitDocAI backend service...
            </AlertDescription>
          </Alert>
        )}

        {/* Caution Message */}
        <Alert className="mb-6 bg-amber-950/50 border-amber-700/50 backdrop-blur-sm">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            <strong>Important:</strong> GitDocAI uses artificial intelligence to generate documentation and tutorials. 
            While our AI strives for accuracy, the generated content may contain errors, omissions, or inaccuracies. 
            Please carefully review, verify, and test all generated code and instructions before using them in production environments.
          </AlertDescription>
        </Alert>

        {activeTab === "documentation" ? (
          <DocumentationGenerator 
            repoUrl={repoUrl}
            projectDescription=""
            targetAudience="intermediate"
            tone="professional"
            outputFormat="readme"
            primaryLanguage=""
            selectedComponents={['overview', 'installation', 'usage', 'api']}
            onGenerate={onDocumentationGenerate}
          />
        ) : (
          <TutorialGenerator 
            repoUrl={repoUrl}
            projectDescription=""
            targetAudience="intermediate"
            tone="professional"
            onGenerate={onTutorialGenerate}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateStep;
