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
import { FileText, Download, Github, Zap, Settings, Eye } from 'lucide-react';
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
    { id: 'overview', label: 'Project Overview', icon: '📌' },
    { id: 'readme', label: 'Clean README.md', icon: '📄' },
    { id: 'installation', label: 'Installation Guide', icon: '🔧' },
    { id: 'usage', label: 'Usage Examples', icon: '💡' },
    { id: 'structure', label: 'File Structure', icon: '📁' },
    { id: 'api', label: 'API Documentation', icon: '🔗' },
    { id: 'comments', label: 'Code Comments', icon: '💬' },
    { id: 'technologies', label: 'Technologies Used', icon: '⚡' },
    { id: 'contributing', label: 'Contributing Guidelines', icon: '🤝' },
    { id: 'license', label: 'License Information', icon: '📜' },
    { id: 'changelog', label: 'Auto Changelog', icon: '📋' },
    { id: 'architecture', label: 'Architecture Diagram', icon: '🏗️' }
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
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GitDocAI
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Analyze GitHub repositories and generate comprehensive, professional documentation automatically using AI
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800 border-gray-700">
            <TabsTrigger value="setup" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
              <Settings className="h-4 w-4" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
              <Zap className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-gray-700">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Repository Info */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Github className="h-5 w-5" />
                    📁 Repository Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="repo-url" className="text-gray-300">GitHub Repository URL</Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repo-name"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-300">Project Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Auto-detect from repo OR provide custom description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* User Preferences */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">✍️ User Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>🎯 Target Audience</Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select audience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner Developers</SelectItem>
                        <SelectItem value="intermediate">Intermediate Developers</SelectItem>
                        <SelectItem value="advanced">Advanced Developers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>🗣️ Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select documentation tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="fun">Fun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>📦 Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select output format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="readme">README.md</SelectItem>
                        <SelectItem value="markdown">Full Markdown Docs</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>🌐 Primary Language</Label>
                    <Select value={primaryLanguage} onValueChange={setPrimaryLanguage}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select primary language" />
                      </SelectTrigger>
                      <SelectContent>
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">🧩 Components to Include</CardTitle>
                <p className="text-sm text-gray-400">Select which documentation components to generate</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {components.map((component) => (
                    <div key={component.id} className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      <Checkbox
                        id={component.id}
                        checked={selectedComponents.includes(component.id)}
                        onCheckedChange={() => handleComponentToggle(component.id)}
                        className="border-gray-500 data-[state=checked]:bg-blue-600"
                      />
                      <Label htmlFor={component.id} className="flex items-center gap-2 cursor-pointer text-gray-300">
                        <span>{component.icon}</span>
                        {component.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
        <div className="mt-12 text-center text-gray-500">
          <Separator className="mb-4 bg-gray-700" />
          <p>Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
