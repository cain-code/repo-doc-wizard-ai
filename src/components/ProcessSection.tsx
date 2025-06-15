
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Settings, FileText, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: <Github className="h-8 w-8 text-blue-400" />,
      title: "Connect Repository",
      description: "Paste your GitHub repository URL and let our AI analyze your codebase."
    },
    {
      icon: <Settings className="h-8 w-8 text-purple-400" />,
      title: "Configure Settings",
      description: "Choose documentation type, target audience, and customize the output format."
    },
    {
      icon: <FileText className="h-8 w-8 text-green-400" />,
      title: "Generate & Export",
      description: "AI creates comprehensive documentation that you can download or integrate."
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get professional documentation for your project in three simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl text-center h-full">
                <CardContent className="p-8">
                  <div className="mx-auto mb-6 w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
