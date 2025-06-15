
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, Zap, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-400" />,
      title: "Smart Documentation",
      description: "Automatically generate README files, API docs, and code documentation with AI analysis."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-400" />,
      title: "Interactive Tutorials",
      description: "Create step-by-step tutorials and guides that help users understand your project."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      title: "Lightning Fast",
      description: "Generate comprehensive documentation in minutes, not hours or days."
    },
    {
      icon: <Globe className="h-8 w-8 text-green-400" />,
      title: "Multiple Formats",
      description: "Export to Markdown, HTML, PDF, or integrate directly with your repository."
    }
  ];

  return (
    <div className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to create professional documentation that developers love to read.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
