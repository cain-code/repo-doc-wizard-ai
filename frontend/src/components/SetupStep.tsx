
import React from 'react';
import { Button } from '@/components/ui/button';

interface SetupStepProps {
  repoUrl: string;
  activeTab: "documentation" | "tutorial";
  setActiveTab: (tab: "documentation" | "tutorial") => void;
  onBack: () => void;
  onGenerate: () => void;
}

const SetupStep = ({ repoUrl, activeTab, setActiveTab, onBack, onGenerate }: SetupStepProps) => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Configure Your Documentation
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2">Repository:</label>
            <p className="text-slate-400">{repoUrl}</p>
          </div>
          
          <div>
            <label className="block text-white mb-2">Type:</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("documentation")}
                className={`px-4 py-2 rounded ${activeTab === "documentation" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
              >
                Documentation
              </button>
              <button
                onClick={() => setActiveTab("tutorial")}
                className={`px-4 py-2 rounded ${activeTab === "tutorial" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300"}`}
              >
                Tutorial
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onGenerate}>
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupStep;
