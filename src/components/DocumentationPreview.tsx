import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Copy, Eye, Code, FileText, Share, TrendingUp, Hash, Type, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { ExportService } from '@/services/exportService';

interface DocumentationPreviewProps {
  generatedDocs: string;
  outputFormat: string;
}

const DocumentationPreview: React.FC<DocumentationPreviewProps> = ({
  generatedDocs,
  outputFormat
}) => {
  const [previewMode, setPreviewMode] = useState<'rendered' | 'markdown'>('rendered');

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedDocs);
    toast.success('Documentation copied to clipboard!');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generatedDocs], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `README.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Markdown file downloaded!');
  };

  const handleExportHTML = () => {
    ExportService.exportToHTML(generatedDocs, 'documentation');
  };

  const handleExportPDF = () => {
    ExportService.exportToPDF(generatedDocs, 'documentation');
  };

  const handleShare = () => {
    const shareData = {
      title: 'Generated Documentation',
      text: 'Check out this auto-generated documentation!',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('URL copied to clipboard!');
    }
  };

  const renderMarkdownAsHTML = (markdown: string) => {
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 text-slate-100 border-b border-slate-700 pb-3">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 text-slate-200 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-3 text-slate-300 mt-6">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-300">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-800 text-blue-300 px-2 py-1 rounded-md text-sm font-mono">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-2 text-slate-300">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-2 text-slate-300">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-slate-300 leading-relaxed">')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 border border-slate-700 text-green-400 p-4 rounded-xl overflow-x-auto mb-6 font-mono text-sm"><code>$1</code></pre>');

    return `<div class="prose prose-slate max-w-none"><p class="mb-4 text-slate-300 leading-relaxed">${html}</p></div>`;
  };

  if (!generatedDocs) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-slate-800 rounded-2xl w-fit mx-auto mb-6">
              <FileText className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-3">No Documentation Generated</h3>
            <p className="text-slate-400 leading-relaxed">
              Generate documentation from the Setup tab to see your professional documentation preview here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Preview Controls */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-3 text-slate-100">
              <div className="p-2 bg-slate-800 rounded-lg">
                <Eye className="h-5 w-5 text-green-400" />
              </div>
              Documentation Preview
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-slate-400 border-slate-600 capitalize">
                {outputFormat || 'Markdown'}
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode('rendered')}
                  className={`border-slate-600 ${previewMode === 'rendered' 
                    ? 'bg-slate-700 text-slate-100 border-slate-500' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Rendered
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode('markdown')}
                  className={`border-slate-600 ${previewMode === 'markdown' 
                    ? 'bg-slate-700 text-slate-100 border-slate-500' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Code className="h-4 w-4 mr-1" />
                  Source
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleCopyToClipboard} 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button 
              onClick={handleDownloadMarkdown} 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Markdown
            </Button>
            <Button 
              onClick={handleShare} 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
            >
              <Share className="h-4 w-4 mr-2" />
              Share URL
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Content */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="max-h-[700px] overflow-y-auto">
            {previewMode === 'rendered' ? (
              <div 
                className="p-8 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdownAsHTML(generatedDocs) }}
              />
            ) : (
              <pre className="p-8 text-sm font-mono bg-slate-900 text-slate-300 whitespace-pre-wrap leading-relaxed">
                {generatedDocs}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100">Export & Download Options</CardTitle>
          <p className="text-slate-400">Choose your preferred format for exporting the documentation</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-3 p-4 h-auto border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-500"
            >
              <FileText className="h-5 w-5 text-blue-400" />
              <div className="text-left">
                <div className="font-medium">README.md</div>
                <div className="text-xs text-slate-500">Markdown format</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportHTML}
              className="flex items-center gap-3 p-4 h-auto border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-500"
            >
              <FileCode className="h-5 w-5 text-orange-400" />
              <div className="text-left">
                <div className="font-medium">HTML</div>
                <div className="text-xs text-slate-500">Web format</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              className="flex items-center gap-3 p-4 h-auto border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-500"
            >
              <FileText className="h-5 w-5 text-red-400" />
              <div className="text-left">
                <div className="font-medium">PDF</div>
                <div className="text-xs text-slate-500">Print format</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-3 p-4 h-auto border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-500 opacity-50 cursor-not-allowed"
              disabled
            >
              <FileText className="h-5 w-5 text-purple-400" />
              <div className="text-left">
                <div className="font-medium">Docs Site</div>
                <div className="text-xs text-slate-500">Coming soon</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100">Documentation Analytics</CardTitle>
          <p className="text-slate-400">Overview of your generated documentation</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center mb-2">
                <Type className="h-5 w-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-slate-100">{generatedDocs.split(' ').length}</div>
              <div className="text-sm text-slate-400">Words</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center mb-2">
                <Hash className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-slate-100">{generatedDocs.split('\n').length}</div>
              <div className="text-sm text-slate-400">Lines</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-slate-100">{generatedDocs.length}</div>
              <div className="text-sm text-slate-400">Characters</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center mb-2">
                <Code className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-slate-100">{Math.floor((generatedDocs.split('```').length - 1) / 2)}</div>
              <div className="text-sm text-slate-400">Code Blocks</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationPreview;
