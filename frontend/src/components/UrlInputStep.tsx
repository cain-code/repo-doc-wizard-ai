
import React from 'react';
import { Button } from '@/components/ui/button';

interface UrlInputStepProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  onContinue: () => void;
}

const UrlInputStep = ({ repoUrl, setRepoUrl, onContinue }: UrlInputStepProps) => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">
          Enter Your GitHub Repository URL
        </h2>
        <div className="space-y-6">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={onContinue} disabled={!repoUrl.trim()}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UrlInputStep;
