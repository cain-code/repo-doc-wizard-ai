
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, ArrowRight } from 'lucide-react';

interface UrlInputStepProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  onContinue: () => void;
}

const UrlInputStep: React.FC<UrlInputStepProps> = ({ repoUrl, setRepoUrl, onContinue }) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Enter Your GitHub Repository URL</h2>
          <p className="text-slate-400 text-lg">
            https://github.com/username/repository
          </p>
        </div>
        
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Continue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="pl-12 h-14 bg-slate-900/70 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 text-base"
              />
            </div>
            
            <Button 
              onClick={onContinue} 
              disabled={!repoUrl.trim()}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UrlInputStep;
