
import React from 'react';
import { Button } from '@/components/ui/button';

interface GenerateStepProps {
  repoUrl: string;
  activeTab: "documentation" | "tutorial";
  onBack: () => void;
  onDocumentationGenerate: (docs: string, metadata?: any) => void;
  onTutorialGenerate: (tutorial: string, metadata?: any) => void;
}

const GenerateStep = ({ repoUrl, activeTab, onBack, onDocumentationGenerate, onTutorialGenerate }: GenerateStepProps) => {
  const handleGenerate = () => {
    if (activeTab === "documentation") {
      onDocumentationGenerate("Sample documentation content");
    } else {
      onTutorialGenerate("Sample tutorial content");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Generating {activeTab === "documentation" ? "Documentation" : "Tutorial"}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-6 mb-6">
            <p className="text-slate-300 mb-4">Repository: {repoUrl}</p>
            <p className="text-slate-300 mb-4">Type: {activeTab}</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-slate-400">Generating content...</p>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleGenerate}>
              Complete Generation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStep;
