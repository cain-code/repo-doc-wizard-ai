
import React from 'react';
import { Sparkles, Github } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-slate-300">AI-Powered Documentation</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> GitHub </span>
            Repository into
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Documentation</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Generate comprehensive documentation and tutorials for your GitHub repositories using advanced AI. 
            Save hours of manual work and keep your docs always up-to-date.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-12">
            <Github className="h-5 w-5" />
            <span className="text-sm">Works with any GitHub repository</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
