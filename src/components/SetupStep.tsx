
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ArrowRight, ArrowLeft, FileText, Sparkles } from 'lucide-react';

interface SetupStepProps {
  repoUrl: string;
  activeTab: "documentation" | "tutorial";
  setActiveTab: (tab: "documentation" | "tutorial") => void;
  onBack: () => void;
  onGenerate: () => void;
}

const SetupStep: React.FC<SetupStepProps> = ({
  repoUrl,
  activeTab,
  setActiveTab,
  onBack,
  onGenerate
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <div className="flex">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to URL Input
        </Button>
      </div>

      {/* Tab Selection */}
      <div className="flex justify-center">
        <div className="bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 backdrop-blur-xl">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("documentation")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "documentation"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <FileText className="h-4 w-4 mr-2 inline" />
              Documentation
            </button>
            <button
              onClick={() => setActiveTab("tutorial")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "tutorial"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2 inline" />
              Tutorial
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Cards */}
      <div className="grid gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Github className="h-5 w-5 mr-2 text-blue-400" />
              Repository Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-slate-300 font-mono text-sm break-all">{repoUrl}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={onGenerate}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Generate {activeTab === "documentation" ? "Documentation" : "Tutorial"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupStep;
