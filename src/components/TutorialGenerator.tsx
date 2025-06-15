
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Download, Code, FileText, Zap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ExportService } from '@/services/exportService';
import { ApiService } from '@/services/api';
import { DocumentationRequest } from '@/types/api';

interface TutorialGeneratorProps {
  repoUrl: string;
  projectDescription?: string;
  targetAudience: string;
  tone: string;
  primaryLanguage?: string;
  onGenerate?: (tutorial: string, metadata?: any) => void;
}

const TutorialGenerator: React.FC<TutorialGeneratorProps> = ({
  repoUrl,
  projectDescription,
  targetAudience,
  tone,
  primaryLanguage,
  onGenerate
}) => {
  const [tutorialType, setTutorialType] = useState('getting-started');
  const [complexity, setComplexity] = useState('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTutorial, setGeneratedTutorial] = useState('');

  const tutorialTypes = [
    { value: 'getting-started', label: 'Getting Started Guide', description: 'Step-by-step setup and basic usage' },
    { value: 'advanced-features', label: 'Advanced Features', description: 'In-depth exploration of advanced functionality' },
    { value: 'integration', label: 'Integration Tutorial', description: 'How to integrate with other tools/services' },
    { value: 'deployment', label: 'Deployment Guide', description: 'Complete deployment walkthrough' },
    { value: 'best-practices', label: 'Best Practices', description: 'Code patterns and recommended approaches' },
    { value: 'troubleshooting', label: 'Troubleshooting Guide', description: 'Common issues and solutions' }
  ];

  const complexityLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Step-by-step with detailed explanations' },
    { value: 'intermediate', label: 'Intermediate', description: 'Assumes basic knowledge' },
    { value: 'advanced', label: 'Advanced', description: 'For experienced developers' }
  ];

  const handleGenerateTutorial = async () => {
    if (!repoUrl) {
      toast.error('Please provide a repository URL');
      return;
    }

    setIsGenerating(true);
    try {
      const selectedType = tutorialTypes.find(t => t.value === tutorialType);
      
      const request: DocumentationRequest = {
        repo_url: repoUrl,
        project_description: projectDescription || `Generate a ${selectedType?.label} tutorial for this project`,
        target_audience: complexity as 'beginner' | 'intermediate' | 'advanced',
        tone: tone as 'professional' | 'friendly' | 'technical' | 'fun',
        output_format: 'markdown',
        primary_language: primaryLanguage,
        selected_components: ['tutorial', 'code-examples', 'step-by-step']
      };

      const response = await ApiService.generateDocumentation(request);
      
      if (response.success && response.documentation) {
        const tutorialContent = `# ${selectedType?.label}\n\n${response.documentation}`;
        setGeneratedTutorial(tutorialContent);
        onGenerate?.(tutorialContent, response.metadata);
        toast.success('Tutorial generated successfully!');
      } else {
        throw new Error(response.error || 'Failed to generate tutorial');
      }
    } catch (error) {
      console.error('Tutorial generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate tutorial');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedTutorial) {
      toast.error('No tutorial generated yet');
      return;
    }
    ExportService.exportToPDF(generatedTutorial, `tutorial-${tutorialType}`);
  };

  const handleDownloadMarkdown = () => {
    if (!generatedTutorial) {
      toast.error('No tutorial generated yet');
      return;
    }
    const blob = new Blob([generatedTutorial], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tutorial-${tutorialType}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Tutorial markdown downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* Tutorial Configuration */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-100">
            <div className="p-2 bg-slate-800 rounded-lg">
              <BookOpen className="h-5 w-5 text-purple-400" />
            </div>
            Tutorial Generator
          </CardTitle>
          <p className="text-slate-400">
            Generate interactive tutorials with code snippets and step-by-step instructions
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-300 font-medium block mb-2">Tutorial Type</label>
              <Select value={tutorialType} onValueChange={setTutorialType}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100 focus:border-purple-500">
                  <SelectValue placeholder="Select tutorial type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {tutorialTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-slate-400">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-2">Complexity Level</label>
              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100 focus:border-purple-500">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {complexityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div>
                        <div className="font-medium">{level.label}</div>
                        <div className="text-xs text-slate-400">{level.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleGenerateTutorial}
              disabled={isGenerating || !repoUrl}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Tutorial...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Tutorial
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tutorial Preview & Download */}
      {generatedTutorial && (
        <>
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-100">Generated Tutorial</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-slate-400 border-slate-600 capitalize">
                    {tutorialType.replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline" className="text-slate-400 border-slate-600 capitalize">
                    {complexity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-4">
                <Button 
                  onClick={handleDownloadMarkdown} 
                  variant="outline" 
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Markdown
                </Button>
                <Button 
                  onClick={handleDownloadPDF} 
                  variant="outline" 
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              <Separator className="mb-4 bg-slate-700" />
              <div className="max-h-[500px] overflow-y-auto bg-slate-900 p-6 rounded-xl border border-slate-700">
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedTutorial}
                </pre>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TutorialGenerator;
