
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import UrlInputStep from "@/components/UrlInputStep";
import SetupStep from "@/components/SetupStep";
import GenerateStep from "@/components/GenerateStep";
import FeaturesSection from "@/components/FeaturesSection";
import ProcessSection from "@/components/ProcessSection";

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

  const handleBackToInput = () => {
    setCurrentStep("input");
  };

  const handleBackToSetup = () => {
    setCurrentStep("setup");
  };

  const handleDocumentationGenerate = (docs: string, metadata?: any) => {
    console.log('Documentation generated:', docs, metadata);
  };

  const handleTutorialGenerate = (tutorial: string, metadata?: any) => {
    console.log('Tutorial generated:', tutorial, metadata);
  };

  if (currentStep === "generate") {
    return (
      <GenerateStep
        repoUrl={repoUrl}
        activeTab={activeTab}
        onBack={handleBackToSetup}
        onDocumentationGenerate={handleDocumentationGenerate}
        onTutorialGenerate={handleTutorialGenerate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <HeroSection />
      
      {currentStep === "input" && (
        <div className="container mx-auto px-4 py-12">
          <UrlInputStep
            repoUrl={repoUrl}
            setRepoUrl={setRepoUrl}
            onContinue={handleContinue}
          />
        </div>
      )}

      {currentStep === "setup" && (
        <div className="container mx-auto px-4 py-12">
          <SetupStep
            repoUrl={repoUrl}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onBack={handleBackToInput}
            onGenerate={handleGenerateStart}
          />
        </div>
      )}

      {currentStep === "input" && (
        <>
          <FeaturesSection />
          <ProcessSection />
        </>
      )}
    </div>
  );
};

export default Index;
