import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, Download, Sparkles, ArrowRight, CheckCircle, Zap, Shield, Globe } from "lucide-react";
import DocumentationGenerator from "@/components/DocumentationGenerator";
import TutorialGenerator from "@/components/TutorialGenerator";

const Index = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [currentStep, setCurrentStep] = useState<"input" | "setup" | "generate">("input");
  const [activeTab, setActiveTab] = useState<"documentation" | "tutorial">("documentation");

  const handleContinue = () => {
    if (repoUrl.trim()) {
      setCurrentStep("setup");
    }
  };

  const handleGenerateStart = () => {
    setCurrentStep("generate");
  };

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

  const steps = [
    { number: 1, title: "Enter Repository", description: "Provide your GitHub repository URL" },
    { number: 2, title: "Configure Options", description: "Set your preferences and target audience" },
    { number: 3, title: "Generate & Export", description: "AI creates your documentation instantly" }
  ];

  if (currentStep === "generate") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-8">
          {activeTab === "documentation" ? (
            <DocumentationGenerator 
              repoUrl={repoUrl} 
              onBack={() => setCurrentStep("setup")} 
            />
          ) : (
            <TutorialGenerator 
              repoUrl={repoUrl} 
              onBack={() => setCurrentStep("setup")} 
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-20">
          {/* Header */}
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

          {currentStep === "input" && (
            <div className="max-w-2xl mx-auto">
              {/* URL Input Card */}
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
                    onClick={handleContinue} 
                    disabled={!repoUrl.trim()}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Continue to Setup
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === "setup" && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Tab Selection */}
              <div className="flex justify-center">
                <div className="bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 backdrop-blur-xl">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setActiveTab("documentation")}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === "documentation"
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <FileText className="h-4 w-4 mr-2 inline" />
                      Documentation
                    </button>
                    <button
                      onClick={() => setActiveTab("tutorial")}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeTab === "tutorial"
                          ? "bg-purple-600 text-white shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <Sparkles className="h-4 w-4 mr-2 inline" />
                      Tutorial
                    </button>
                  </div>
                </div>
              </div>

              {/* Configuration Cards */}
              <div className="grid gap-6">
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Github className="h-5 w-5 mr-2 text-blue-400" />
                      Repository Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                      <p className="text-slate-300 font-mono text-sm break-all">{repoUrl}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep("input")}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    Back to URL
                  </Button>
                  
                  <Button 
                    onClick={handleGenerateStart}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Generate {activeTab === "documentation" ? "Documentation" : "Tutorial"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      {currentStep === "input" && (
        <>
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

          {/* Process Section */}
          <div className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Simple 3-Step Process
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400">{step.description}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block">
                          <ArrowRight className="h-6 w-6 text-slate-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
