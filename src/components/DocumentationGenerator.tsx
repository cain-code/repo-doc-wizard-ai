
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Github, FileText, CheckCircle, Clock, AlertCircle, Bot, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ApiService } from '@/services/api';
import { DocumentationRequest } from '@/types/api';

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
    'Validating repository URL...',
    'Cloning repository...',
    'Analyzing codebase structure...',
    'Detecting technologies...',
    'Extracting git history...',
    'Building AI prompt...',
    'Generating documentation with AI...',
    'Formatting output...',
    'Finalizing documentation...'
  ];

  const handleGenerate = async () => {
    if (!repoUrl) {
      toast.error('Please enter a GitHub repository URL');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate progress through steps
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(generationSteps[i]);
        setProgress(((i + 1) / generationSteps.length) * 90); // 90% for visual feedback
        
        // Add realistic delays for better UX
        if (i < 4) {
          await new Promise(resolve => setTimeout(resolve, 800));
        } else if (i === generationSteps.length - 3) {
          // AI generation step - longer delay
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Prepare API request
      const request: DocumentationRequest = {
        repo_url: repoUrl,
        project_description: projectDescription || undefined,
        target_audience: targetAudience as any,
        tone: tone as any,
        output_format: outputFormat as any,
        primary_language: primaryLanguage || undefined,
        selected_components: selectedComponents
      };

      // Call API
      setCurrentStep('Calling AI service...');
      const response = await ApiService.generateDocumentation(request);

      if (response.success && response.documentation) {
        setProgress(100);
        setCurrentStep('Documentation generated successfully!');
        onGenerate(response.documentation, response.metadata);
        toast.success('Documentation generated successfully!');
      } else {
        throw new Error(response.error || 'Failed to generate documentation');
      }

    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate documentation');
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        setProgress(0);
        setCurrentStep('');
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Generation Configuration Summary */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-purple-600" />
            AI Documentation Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Repository</h4>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-500" />
                <span className="text-sm truncate">{repoUrl || 'Not specified'}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Target Audience</h4>
              <Badge variant="secondary" className="capitalize">{targetAudience || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Tone</h4>
              <Badge variant="outline" className="capitalize">{tone || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Output Format</h4>
              <Badge variant="default" className="capitalize">{outputFormat || 'Not specified'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Primary Language</h4>
              <Badge variant="secondary" className="capitalize">{primaryLanguage || 'Auto-detect'}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Components</h4>
              <Badge variant="outline">{selectedComponents.length} selected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Selected Documentation Components
          </CardTitle>
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
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse text-blue-600" />
              AI is analyzing your repository and generating documentation...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-800">{currentStep}</span>
                <span className="text-sm text-blue-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Clock className="h-4 w-4" />
              This may take 30-60 seconds depending on repository size and complexity
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
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-5 w-5 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Zap className="h-5 w-5" />
              Generate Documentation with AI
            </>
          )}
        </Button>
      </div>

      {/* Tips */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Tips for Better AI-Generated Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <ul className="space-y-2 text-sm">
            <li>• Ensure your repository has a clear project structure and meaningful file names</li>
            <li>• Include package.json, requirements.txt, or similar dependency files for better technology detection</li>
            <li>• Add meaningful commit messages for better changelog generation</li>
            <li>• Make sure your repository is public (private repo support requires GitHub token)</li>
            <li>• Include existing documentation that can be enhanced by AI</li>
            <li>• The more detailed your project description, the better the AI-generated content</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationGenerator;
