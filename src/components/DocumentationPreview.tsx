
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Copy, Eye, Code, FileText, Share } from 'lucide-react';
import { toast } from 'sonner';

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

  const handleDownload = () => {
    const blob = new Blob([generatedDocs], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `README.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Documentation downloaded!');
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
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('URL copied to clipboard!');
    }
  };

  const renderMarkdownAsHTML = (markdown: string) => {
    // Simple markdown to HTML converter for demo purposes
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 text-gray-800">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-3 text-gray-700 border-b pb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-2 text-gray-600">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-4"><code>$1</code></pre>');

    return `<div class="prose max-w-none"><p class="mb-4">${html}</p></div>`;
  };

  if (!generatedDocs) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Documentation Generated</h3>
          <p className="text-gray-500">Generate documentation to see the preview here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Documentation Preview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{outputFormat || 'Markdown'}</Badge>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode('rendered')}
                  className={previewMode === 'rendered' ? 'bg-blue-50 border-blue-200' : ''}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Rendered
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode('markdown')}
                  className={previewMode === 'markdown' ? 'bg-blue-50 border-blue-200' : ''}
                >
                  <Code className="h-4 w-4 mr-1" />
                  Markdown
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={handleCopyToClipboard} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Content */}
      <Card>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-y-auto">
            {previewMode === 'rendered' ? (
              <div 
                className="p-6 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdownAsHTML(generatedDocs) }}
              />
            ) : (
              <pre className="p-6 text-sm font-mono bg-gray-50 whitespace-pre-wrap">
                {generatedDocs}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export as README.md
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export as HTML
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Export as Docs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{generatedDocs.split(' ').length}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{generatedDocs.split('\n').length}</div>
              <div className="text-sm text-gray-600">Lines</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{generatedDocs.length}</div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{(generatedDocs.split('```').length - 1) / 2}</div>
              <div className="text-sm text-gray-600">Code Blocks</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationPreview;
