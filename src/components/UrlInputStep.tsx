
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
    <div className="max-w-2xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-white">Get Started</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your GitHub repository URL to begin generating documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="pl-12 h-12 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <Button 
            onClick={onContinue} 
            disabled={!repoUrl.trim()}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue to Setup
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlInputStep;
