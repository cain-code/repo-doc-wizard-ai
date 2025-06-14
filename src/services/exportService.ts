
import { toast } from 'sonner';

export class ExportService {
  static async exportToHTML(content: string, filename: string = 'documentation'): Promise<void> {
    try {
      const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
            background: #fff;
        }
        h1 { color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        h2 { color: #374151; margin-top: 2rem; }
        h3 { color: #4b5563; }
        code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #1f2937;
            color: #10b981;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }
        pre code {
            background: none;
            color: inherit;
            padding: 0;
        }
        ul, ol { padding-left: 1.5rem; }
        li { margin: 0.5rem 0; }
        blockquote {
            border-left: 4px solid #3b82f6;
            margin: 1rem 0;
            padding-left: 1rem;
            color: #6b7280;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .generated-by {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📚 Project Documentation</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    
    <div class="content">
        ${this.convertMarkdownToHTML(content)}
    </div>
    
    <div class="generated-by">
        <p>Generated with ❤️ by <strong>GitDocAI</strong></p>
    </div>
</body>
</html>`;

      const blob = new Blob([htmlTemplate], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('HTML file exported successfully!');
    } catch (error) {
      console.error('HTML export error:', error);
      toast.error('Failed to export HTML file');
    }
  }

  static async exportToPDF(content: string, filename: string = 'documentation'): Promise<void> {
    try {
      // Create a hidden iframe for PDF generation
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Documentation</title>
    <style>
        @page { margin: 2cm; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            font-size: 14px;
        }
        h1 { 
            color: #2563eb; 
            border-bottom: 2px solid #e5e7eb; 
            padding-bottom: 0.5rem;
            page-break-after: avoid;
        }
        h2 { 
            color: #374151; 
            margin-top: 2rem;
            page-break-after: avoid;
        }
        h3 { 
            color: #4b5563;
            page-break-after: avoid;
        }
        code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            font-size: 12px;
        }
        pre {
            background: #f8f9fa;
            border: 1px solid #e5e7eb;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            page-break-inside: avoid;
            font-size: 12px;
        }
        pre code {
            background: none;
            padding: 0;
        }
        ul, ol { padding-left: 1.5rem; }
        li { margin: 0.3rem 0; }
        .header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        .page-break { page-break-before: always; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📚 Project Documentation</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    ${this.convertMarkdownToHTML(content)}
</body>
</html>`;

      iframe.contentDocument?.write(htmlContent);
      iframe.contentDocument?.close();

      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Print the iframe content
      iframe.contentWindow?.print();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);

      toast.success('PDF export initiated! Please use your browser\'s print dialog to save as PDF.');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF file');
    }
  }

  private static convertMarkdownToHTML(markdown: string): string {
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h([123])><\/p>/g, '</h$1>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<p><pre>/g, '<pre>')
      .replace(/<\/pre><\/p>/g, '</pre>');
  }
}
