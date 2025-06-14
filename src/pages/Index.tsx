
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Github, Zap, Settings, Eye, Folder, User, Brain, Package, Globe } from 'lucide-react';
import { toast } from 'sonner';
import DocumentationPreview from '@/components/DocumentationPreview';
import DocumentationGenerator from '@/components/DocumentationGenerator';

const Index = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState('');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'overview',
    'readme',
    'installation',
    'usage',
    'structure',
    'technologies',
    'contributing',
    'license'
  ]);
  const [generatedDocs, setGeneratedDocs] = useState('');
  const [activeTab, setActiveTab] = useState('setup');

  const components = [
    { id: 'readme', label: 'README.md', description: 'Complete project README', checked: true },
    { id: 'installation', label: 'Installation Instructions', description: 'Setup and installation guide', checked: true },
    { id: 'usage', label: 'Usage Examples', description: 'Code examples and tutorials', checked: true },
    { id: 'api', label: 'API Documentation', description: 'Auto-generated API docs', checked: false },
    { id: 'structure', label: 'Folder Structure', description: 'Project organization', checked: true },
    { id: 'contributing', label: 'Contribution Guide', description: 'How to contribute', checked: true },
    { id: 'changelog', label: 'Auto Changelog', description: 'Git history-based changelog', checked: false },
    { id: 'diagram', label: 'Mermaid Diagram', description: 'Architecture visualization', checked: false }
  ];

  const handleComponentToggle = (componentId: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleGenerateDocumentation = () => {
    if (!repoUrl) {
      toast.error('Please enter a GitHub repository URL');
      return;
    }

    toast.success('Generating documentation...');
    
    // Simulate documentation generation
    const mockDocs = `# 📚 Generated Documentation

## 🎯 Project Overview
${projectDescription || 'Auto-detected project description based on repository analysis.'}

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
\`\`\`bash
git clone ${repoUrl}
cd repo-name
npm install
\`\`\`

### Usage
\`\`\`javascript
// Example usage
import { App } from './src/App';

const app = new App();
app.run();
\`\`\`

## 📁 Project Structure
\`\`\`
src/
├── components/
│   ├── DocumentationGenerator.tsx
│   └── DocumentationPreview.tsx
├── pages/
│   └── Index.tsx
└── lib/
    └── utils.ts
\`\`\`

## 🛠️ Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
MIT License - see LICENSE file for details.
`;

    setGeneratedDocs(mockDocs);
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GitDocAI
              </h1>
            </div>
            <Badge variant="outline" className="text-slate-400 border-slate-700">
              v1.0.0
            </Badge>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-100 mb-4">
            Generate Professional Documentation
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Transform your GitHub repositories into comprehensive, AI-powered documentation 
            with custom styling and professional formatting
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-900 border border-slate-700 p-1 rounded-2xl">
            <TabsTrigger 
              value="setup" 
              className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-xl py-3"
            >
              <Settings className="h-4 w-4" />
              Setup
            </TabsTrigger>
            <TabsTrigger 
              value="generate" 
              className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-xl py-3"
            >
              <Zap className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="flex items-center gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-white rounded-xl py-3"
            >
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Repository Info Card */}
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-slate-100">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <Folder className="h-5 w-5 text-blue-400" />
                    </div>
                    Repository Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="repo-url" className="text-slate-300 font-medium">
                      GitHub Repository URL
                    </Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repo-name"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="mt-2 bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-slate-300 font-medium">
                      Project Description (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a custom description or leave blank for auto-detection"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="mt-2 bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-blue-500 rounded-xl min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* User Preferences Card */}
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-slate-100">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    Customization Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-slate-300 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Target Audience
                    </Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-slate-100 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select audience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="beginner">Beginner Developers</SelectItem>
                        <SelectItem value="intermediate">Intermediate Developers</SelectItem>
                        <SelectItem value="advanced">Advanced Developers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 font-medium flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Documentation Tone
                    </Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-slate-100 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select documentation tone" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="fun">Fun & Engaging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 font-medium flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Output Format
                    </Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-slate-100 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select output format" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="readme">README.md</SelectItem>
                        <SelectItem value="markdown">Full Markdown Docs</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Primary Language
                    </Label>
                    <Select value={primaryLanguage} onValueChange={setPrimaryLanguage}>
                      <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-slate-100 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select primary language" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Components Selection */}
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-slate-100 text-xl">
                  Documentation Components
                </CardTitle>
                <p className="text-slate-400">
                  Choose which sections to include in your generated documentation
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {components.map((component) => (
                    <div 
                      key={component.id} 
                      className="group relative p-4 border border-slate-700 rounded-xl hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer"
                      onClick={() => handleComponentToggle(component.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={component.id}
                          checked={selectedComponents.includes(component.id)}
                          onCheckedChange={() => handleComponentToggle(component.id)}
                          className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <Label 
                            htmlFor={component.id} 
                            className="font-medium text-slate-200 cursor-pointer block leading-tight"
                          >
                            {component.label}
                          </Label>
                          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleGenerateDocumentation}
                disabled={!repoUrl}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-105"
              >
                <Zap className="h-5 w-5 mr-2" />
                Generate Documentation with AI
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="generate">
            <DocumentationGenerator
              repoUrl={repoUrl}
              projectDescription={projectDescription}
              targetAudience={targetAudience}
              tone={tone}
              outputFormat={outputFormat}
              primaryLanguage={primaryLanguage}
              selectedComponents={selectedComponents}
              onGenerate={handleGenerateDocumentation}
            />
          </TabsContent>

          <TabsContent value="preview">
            <DocumentationPreview
              generatedDocs={generatedDocs}
              outputFormat={outputFormat}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-16 text-center">
          <Separator className="mb-6 bg-slate-700" />
          <p className="text-slate-500">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
