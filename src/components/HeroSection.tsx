
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles, Github, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-6 text-center">
        {/* Logo Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
            <FileText className="h-12 w-12 text-white" />
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          GitDoc<span className="text-blue-400">AI</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          Transform your GitHub repositories into comprehensive, professional documentation with the power of AI. Generate beautiful docs and tutorials in minutes, not hours.
        </p>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Badge variant="secondary" className="px-6 py-3 bg-blue-900/40 text-blue-300 border-blue-700/50 text-base">
            <Sparkles className="h-5 w-5 mr-2" />
            AI-Powered
          </Badge>
          <Badge variant="secondary" className="px-6 py-3 bg-slate-800/40 text-slate-300 border-slate-700/50 text-base">
            <Github className="h-5 w-5 mr-2" />
            GitHub Integration
          </Badge>
          <Badge variant="secondary" className="px-6 py-3 bg-green-900/40 text-green-300 border-green-700/50 text-base">
            <ArrowDown className="h-5 w-5 mr-2" />
            Multiple Formats
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
