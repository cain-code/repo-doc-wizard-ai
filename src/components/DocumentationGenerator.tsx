
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Github, FileText, CheckCircle, Clock, AlertCircle, Bot, Sparkles, Rocket, Target, MessageCircle, Package, Globe } from 'lucide-react';
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
      for (let i = 0; i < generationSteps.length - 1; i++) {
        setCurrentStep(generationSteps[i]);
        setProgress(((i + 1) / generationSteps.length) * 80);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Build the actual API request
      const request: DocumentationRequest = {
        repo_url: repoUrl,
        project_description: projectDescription || undefined,
        target_audience: (targetAudience || 'intermediate') as any,
        tone: (tone || 'professional') as any,
        output_format: (outputFormat || 'readme') as any,
        primary_language: primaryLanguage || undefined,
        selected_components: selectedComponents
      };

      setCurrentStep('Calling AI service...');
      setProgress(90);

      console.log('Making API request with:', request);
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
      setCurrentStep('Error occurred during generation');
      toast.error(error instanceof Error ? error.message : 'Failed to generate documentation. Please check that the backend is running and the repository URL is valid.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        setProgress(0);
        setCurrentStep('');
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Generation Configuration Summary */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-100">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Bot className="h-6 w-6 text-white" />
            </div>
            AI Documentation Generation Configuration
          </CardTitle>
          <p className="text-slate-400">Review your settings before generating documentation</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <Github className="h-5 w-5 text-slate-400" />
                <h4 className="font-semibold text-slate-200">Repository</h4>
              </div>
              <span className="text-sm text-slate-300 break-all">{repoUrl || 'Not specified'}</span>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-5 w-5 text-slate-400" />
                <h4 className="font-semibold text-slate-200">Audience</h4>
              </div>
              <Badge variant="secondary" className="bg-slate-700 text-slate-300 capitalize">
                {targetAudience || 'intermediate'}
              </Badge>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="h-5 w-5 text-slate-400" />
                <h4 className="font-semibold text-slate-200">Tone</h4>
              </div>
              <Badge variant="outline" className="border-slate-600 text-slate-300 capitalize">
                {tone || 'professional'}
              </Badge>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-5 w-5 text-slate-400" />
                <h4 className="font-semibold text-slate-200">Format</h4>
              </div>
              <Badge variant="default" className="bg-blue-600 text-white capitalize">
                {outputFormat || 'readme'}
              </Badge>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-5 w-5 text-slate-400" />
                <h4 className="font-semibold text-slate-200">Language</h4>
              </div>
              <Badge variant="secondary" className="bg-slate-700 text-slate-300 capitalize">
                {primaryLanguage || 'Auto-detect'}
              </Badge>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-slate-400" />
                <h4 className="font-semibold text-slate-200">Components</h4>
              </div>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {selectedComponents.length} selected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Components */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-100">
            <div className="p-2 bg-slate-800 rounded-lg">
              <FileText className="h-5 w-5 text-purple-400" />
            </div>
            Selected Documentation Components
          </CardTitle>
          <p className="text-slate-400">Components that will be included in your documentation</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {selectedComponents.map((component) => (
              <Badge 
                key={component} 
                variant="secondary" 
                className="bg-slate-800 text-slate-300 border border-slate-600 capitalize px-3 py-1"
              >
                {component.replace(/([A-Z])/g, ' $1').trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-100">
              <Sparkles className="h-6 w-6 animate-pulse text-blue-400" />
              AI is analyzing your repository and generating documentation...
            </CardTitle>
            <p className="text-slate-400">This process may take 30-60 seconds depending on repository complexity</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-200">{currentStep}</span>
                <span className="text-sm text-blue-400 font-mono">{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="w-full h-2 bg-slate-800" 
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>Processing repository files and generating intelligent documentation with AI</span>
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
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-6 w-6 animate-spin mr-3" />
              Generating with AI...
            </>
          ) : (
            <>
              <Rocket className="h-6 w-6 mr-3" />
              Generate Documentation with AI
            </>
          )}
        </Button>
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-3">
            <div className="p-2 bg-green-800 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-300" />
            </div>
            Tips for Better AI-Generated Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Ensure your repository has a clear project structure and meaningful file names</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Include package.json, requirements.txt, or similar dependency files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Add meaningful commit messages for better changelog generation</span>
              </li>
            </ul>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Make sure your repository is public or provide access tokens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>The more detailed your project description, the better the AI output</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Include existing documentation that can be enhanced by AI</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationGenerator;
