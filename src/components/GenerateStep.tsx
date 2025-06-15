
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import DocumentationGenerator from '@/components/DocumentationGenerator';
import TutorialGenerator from '@/components/TutorialGenerator';

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
