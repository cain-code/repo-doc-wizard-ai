
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your codebase structure and generates intelligent documentation"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-400" />,
      title: "Enterprise Ready",
      description: "Professional-grade documentation suitable for enterprise development teams"
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-400" />,
      title: "Multiple Formats",
      description: "Export in various formats including Markdown, PDF, and interactive HTML"
    }
  ];

  return (
    <div className="py-20 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Choose GitDocAI?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
