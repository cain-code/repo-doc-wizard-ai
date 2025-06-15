
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    { number: "1", title: "Enter Repository", description: "Provide your GitHub repository URL" },
    { number: "2", title: "Configure Options", description: "Set your preferences and target audience" },
    { number: "3", title: "Generate & Export", description: "AI creates your documentation instantly" }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Simple 3-Step Process
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block mt-8">
                    <div className="flex justify-center">
                      <ArrowRight className="h-6 w-6 text-slate-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
