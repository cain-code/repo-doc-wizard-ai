
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Github, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentationGeneratorProps {
  repoUrl: string;
  projectDescription: string;
  targetAudience: string;
  tone: string;
  outputFormat: string;
  primaryLanguage: string;
  selectedComponents: string[];
  onGenerate: () => void;
}

const DocumentationGenerator: React.FC<DocumentationGeneratorProps> = ({
  repoUrl,
  projectDescription,
  targetAudience,
  tone,
  outputFormat,
  primaryLanguage,
  selectedComponents,
  onGenerate
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const generationSteps = [
    'Cloning repository...',
    'Analyzing codebase...',
    'Detecting technologies...',
    'Generating documentation...',
    'Formatting output...',
    'Finalizing...'
  ];

  const handleGenerate = async () => {
    if (!repoUrl) {
      toast.error('Please enter a GitHub repository URL');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(generationSteps[i]);
      setProgress(((i + 1) / generationSteps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsGenerating(false);
    onGenerate();
    toast.success('Documentation generated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Generation Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generation Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Repository</h4>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-500" />
                <span className="text-sm truncate">{repoUrl || 'Not specified'}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Target Audience</h4>
              <Badge variant="secondary">{targetAudience || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tone</h4>
              <Badge variant="outline">{tone || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Output Format</h4>
              <Badge variant="default">{outputFormat || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Primary Language</h4>
              <Badge variant="secondary">{primaryLanguage || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Components</h4>
              <Badge variant="outline">{selectedComponents.length} selected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Components */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Documentation Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {selectedComponents.map((component) => (
              <Badge key={component} variant="secondary" className="capitalize">
                {component.replace(/([A-Z])/g, ' $1').trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-spin" />
              Generating Documentation...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{currentStep}</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4" />
              This may take a few moments depending on repository size
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !repoUrl}
          size="lg"
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Clock className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Generate Documentation
            </>
          )}
        </Button>
      </div>

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Tips for Better Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Ensure your repository has a clear project structure</li>
            <li>• Include package.json, requirements.txt, or similar dependency files</li>
            <li>• Add meaningful commit messages for better changelog generation</li>
            <li>• Include existing documentation that can be enhanced</li>
            <li>• Make sure your repository is public or provide access tokens for private repos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationGenerator;
