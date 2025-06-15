
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Shield, Github } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-blue-400" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your codebase structure and generates intelligent documentation"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "Enterprise Ready", 
      description: "Professional-grade documentation suitable for enterprise development teams"
    },
    {
      icon: <Github className="h-8 w-8 text-purple-400" />,
      title: "Multiple Formats",
      description: "Export in various formats including Markdown, PDF, and interactive HTML"
    }
  ];

  return (
    <div className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Why Choose GitDocAI?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/40 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/60 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-slate-700/50 rounded-2xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
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
