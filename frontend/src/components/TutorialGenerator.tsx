
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Download } from 'lucide-react';

interface TutorialGeneratorProps {
  repoUrl: string;
  projectDescription: string;
  targetAudience: string;
  tone: string;
  onGenerate: (tutorial: string, metadata?: any) => void;
}

const TutorialGenerator: React.FC<TutorialGeneratorProps> = ({
  repoUrl,
  onGenerate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate API call delay
    setTimeout(() => {
      setProgress(100);
      setIsGenerating(false);
      onGenerate("# Tutorial Generated\n\nThis is sample tutorial content for your repository.", { format: "markdown" });
    }, 5000);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
          Tutorial Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
          <p className="text-slate-300 font-mono text-sm break-all">{repoUrl}</p>
        </div>

        {isGenerating && (
          <div className="space-y-4">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-center">Generating tutorial... {progress}%</p>
          </div>
        )}

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isGenerating ? 'Generating...' : 'Generate Tutorial'}
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TutorialGenerator;
