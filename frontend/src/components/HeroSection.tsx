
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles, Github, Download } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6 leading-tight">
            GitDoc<span className="text-blue-400">AI</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your GitHub repositories into comprehensive, professional documentation with the power of AI. 
            Generate beautiful docs and tutorials in minutes, not hours.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="secondary" className="px-4 py-2 bg-blue-900/30 text-blue-300 border-blue-700/50">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-purple-900/30 text-purple-300 border-purple-700/50">
              <Github className="h-4 w-4 mr-2" />
              GitHub Integration
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 bg-green-900/30 text-green-300 border-green-700/50">
              <Download className="h-4 w-4 mr-2" />
              Multiple Formats
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
