
import google.generativeai as genai
from typing import Dict, List
from app.core.config import settings
from app.models.schemas import DocumentationRequest

class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        # Updated to use the correct model name
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    def generate_documentation(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Generate documentation using Google Gemini"""
        
        # Check if this is a tutorial request
        is_tutorial = any(component in ['tutorial', 'code-examples', 'step-by-step'] 
                         for component in request.selected_components)
        
        if is_tutorial:
            prompt = self._build_enhanced_tutorial_prompt(request, repo_analysis)
        else:
            prompt = self._build_enhanced_documentation_prompt(request, repo_analysis)
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate documentation: {str(e)}")
    
    def _build_enhanced_tutorial_prompt(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Build enhanced AI prompt for superior tutorial generation"""
        
        repo_name = repo_analysis.get("name", "Unknown Project")
        description = repo_analysis.get("description") or request.project_description or "No description provided"
        language = repo_analysis.get("language", "Unknown")
        technologies = repo_analysis.get("technologies", [])
        structure = repo_analysis.get("structure", {})
        
        audience_level = request.target_audience
        
        prompt = f"""You are a senior developer, technical educator, and expert programmer with 15+ years of experience. Your expertise spans multiple programming languages and you're known for creating crystal-clear, comprehensive tutorials that beginners love and experts respect.

## 🎯 MISSION: Create a world-class programming tutorial

**Repository URL**: {request.repo_url}
**Project**: {repo_name}
**Description**: {description}
**Primary Language**: {language}
**Technologies**: {', '.join(technologies) if technologies else 'Auto-detecting'}
**Target Audience**: {audience_level.title()} developers
**Writing Tone**: {request.tone.title()}

## 📂 Repository Structure Analysis:
```
{self._format_structure_detailed(structure)}
```

## 🎓 TUTORIAL QUALITY STANDARDS:

### ✅ ACCURACY REQUIREMENTS:
- **ZERO HALLUCINATION**: Only reference files, functions, and features that actually exist in the repository
- **VERIFIED CODE**: Every code snippet must be based on actual repository content
- **TESTED EXAMPLES**: All examples must be executable and functional
- **CORRECT SYNTAX**: Perfect language-specific syntax and conventions
- **ACCURATE PATHS**: All file paths and imports must match repository structure

### 📚 EDUCATIONAL EXCELLENCE:
- **Progressive Learning**: Each concept builds logically on the previous
- **Multiple Learning Styles**: Visual diagrams, code examples, and explanations
- **Real-World Context**: Explain WHY things work this way, not just HOW
- **Best Practices**: Include industry-standard approaches and conventions
- **Error Prevention**: Highlight common mistakes before they happen

## 🏗️ MANDATORY TUTORIAL STRUCTURE:

```markdown
# 🚀 Complete {repo_name} Tutorial

> **What you'll build**: [Specific outcome with real-world application]
> **Time needed**: [Realistic estimate] | **Difficulty**: {audience_level.title()}

## 📋 Table of Contents
[Auto-generated clickable TOC]

## 🎯 Learning Objectives
By completing this tutorial, you will:
- [ ] [Specific, measurable skill 1]
- [ ] [Specific, measurable skill 2]
- [ ] [Specific, measurable skill 3]
- [ ] [Continue with concrete outcomes...]

## 🛠️ Prerequisites
### Required Knowledge:
- [Specific prerequisite 1 with link to resource]
- [Specific prerequisite 2 with link to resource]

### Required Tools:
- [Tool 1] version X.X+ ([installation link])
- [Tool 2] version Y.Y+ ([installation link])

### Environment Setup Verification:
```bash
# Commands to verify setup
[Actual verification commands]
```

## 🏁 Quick Start (2-minute version)
[Minimal commands to get something working immediately]

## 📖 Deep Dive Tutorial

### Step 1: [Specific Action Title] 
**🎯 Goal**: [What this step accomplishes]
**⏱️ Time**: [Realistic estimate]

#### Understanding the Context
[Explain WHY this step is necessary]

#### Implementation
```{language.lower()}
// Actual code from repository with detailed comments
[Real, working code with line-by-line explanations]
```

#### What's Happening Here?
[Detailed explanation of the code mechanics]

#### ✅ Verification
```bash
# How to test this step works
[Actual verification commands]
```

#### 🐛 Troubleshooting
| Problem | Cause | Solution |
|---------|-------|----------|
| [Common error 1] | [Root cause] | [Specific fix] |
| [Common error 2] | [Root cause] | [Specific fix] |

---

### Step 2: [Next Specific Action]
[Follow same detailed pattern...]

[Continue for all major steps...]

## 🧪 Testing Your Implementation

### Unit Testing
```{language.lower()}
// Complete test examples
[Actual test code]
```

### Integration Testing
```bash
# Full testing commands
[Real testing procedures]
```

### Manual Verification Checklist
- [ ] [Specific verification point 1]
- [ ] [Specific verification point 2]
- [ ] [Continue with concrete checkpoints...]

## 🎨 Customization & Extensions

### Common Modifications
1. **[Modification 1]**: [Code example]
2. **[Modification 2]**: [Code example]

### Advanced Features
[Optional enhancements with code]

## 🚨 Common Pitfalls & Solutions

### Anti-Pattern #1: [Specific Bad Practice]
❌ **Don't do this:**
```{language.lower()}
[Bad code example]
```

✅ **Do this instead:**
```{language.lower()}
[Good code example with explanation]
```

## 🔧 Production Deployment

### Environment Configuration
[Real deployment steps]

### Performance Optimization
[Actual optimization techniques]

### Security Considerations
[Security best practices with examples]

## 📊 Performance Benchmarks
[If applicable, include actual performance data]

## 🎉 Congratulations!

### What You've Accomplished:
- ✅ [Specific achievement 1]
- ✅ [Specific achievement 2]
- ✅ [Continue with concrete accomplishments...]

### Your Next Steps:
1. **Beginner**: Try [specific next challenge]
2. **Intermediate**: Explore [advanced topic]
3. **Advanced**: Contribute to [contribution opportunity]

## 📚 Additional Resources

### Official Documentation
- [Link 1]: [Description]
- [Link 2]: [Description]

### Community Resources
- [Community link 1]: [Description]
- [Community link 2]: [Description]

### Related Tutorials
- [Tutorial 1]: [Description]
- [Tutorial 2]: [Description]

## 🛠️ Complete Troubleshooting Guide

### Error Reference
[Comprehensive error solutions]

### FAQ
[Frequently asked questions with detailed answers]

## 📝 Glossary
[Technical terms explained in simple language]

## 🤝 Contributing
[How readers can contribute back to the project]
```

## 🔒 CRITICAL QUALITY CONTROLS:

1. **REPOSITORY VERIFICATION**: Before writing any code example, verify it exists in the provided structure
2. **SYNTAX VALIDATION**: Every code block must use correct {language} syntax
3. **EXECUTABLE EXAMPLES**: All commands and code must be runnable
4. **LOGICAL FLOW**: Each step must logically follow from the previous
5. **BEGINNER-FRIENDLY**: Assume {audience_level} knowledge level throughout
6. **PROFESSIONAL TONE**: Maintain {request.tone} tone while being encouraging
7. **VISUAL FORMATTING**: Use emojis, tables, and formatting for scanability
8. **ACTIONABLE CONTENT**: Every section should have concrete takeaways

## 🚀 EXECUTION INSTRUCTIONS:

1. **ANALYZE FIRST**: Study the repository structure before writing anything
2. **VERIFY ACCURACY**: Cross-reference all code examples with actual files
3. **TEST MENTALLY**: Walk through each step as if you're following it
4. **OPTIMIZE FOR LEARNING**: Prioritize understanding over brevity
5. **INCLUDE CONTEXT**: Explain not just what to do, but why it matters

Generate a tutorial that transforms a {audience_level} developer into someone who can confidently use, modify, and extend this {repo_name} project. Make it so good that it becomes the definitive learning resource for this technology.
"""
        
        return prompt
    
    def _build_enhanced_documentation_prompt(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Build enhanced AI prompt for superior documentation generation"""
        
        repo_name = repo_analysis.get("name", "Unknown Project")
        description = repo_analysis.get("description") or request.project_description or "No description provided"
        language = repo_analysis.get("language", "Unknown")
        technologies = repo_analysis.get("technologies", [])
        structure = repo_analysis.get("structure", {})
        git_history = repo_analysis.get("git_history", [])
        license_type = repo_analysis.get("license_type", "Not specified")
        
        # Build components section
        components_text = self._get_components_instructions(request.selected_components)
        
        # Build audience and tone instructions
        audience_instruction = self._get_audience_instruction(request.target_audience)
        tone_instruction = self._get_tone_instruction(request.tone)
        
        prompt = f"""You are a world-class technical writer, senior software architect, and documentation expert with 20+ years of experience. You're known for creating documentation so clear and comprehensive that it becomes the gold standard for projects. Your documentation has helped millions of developers successfully implement complex systems.

## 🎯 MISSION: Create enterprise-grade, production-ready documentation

### 📁 Repository Intelligence:
- **Repository**: {repo_name}
- **URL**: {request.repo_url}
- **Description**: {description}
- **Language**: {language}
- **Tech Stack**: {', '.join(technologies) if technologies else 'Auto-detecting from codebase'}
- **License**: {license_type}
- **Documentation Format**: {request.output_format.upper()}

### 🏗️ Project Architecture:
```
{self._format_structure_detailed(structure)}
```

### 📈 Development History:
{self._format_git_history_detailed(git_history)}

## 🎯 DOCUMENTATION EXCELLENCE STANDARDS:

### ✅ ACCURACY REQUIREMENTS:
- **ZERO HALLUCINATION**: Only document features that actually exist in the codebase
- **CODE VERIFICATION**: Every example must be based on actual repository files
- **FUNCTIONAL EXAMPLES**: All code snippets must be executable and tested
- **PRECISE TECHNICAL DETAILS**: API signatures, parameters, and return types must be exact
- **CURRENT INFORMATION**: Based on latest repository state, not assumptions

### 📚 PROFESSIONAL QUALITY:
- **Executive Summary**: Clear value proposition for decision makers
- **Developer Experience**: Optimized for developer productivity
- **Maintenance Ready**: Documentation that stays accurate over time
- **Accessibility**: Clear for both technical and non-technical stakeholders
- **International Ready**: Clear English that translates well

## 🎯 TARGET AUDIENCE: {audience_instruction}
## 🎨 WRITING STYLE: {tone_instruction}

## 📋 REQUIRED COMPONENTS:
{components_text}

## 🏗️ MANDATORY DOCUMENTATION STRUCTURE:

```markdown
# 🚀 {repo_name}

[![License]({license_type})]() [![Language]({language})]() [![Status](Active)]()

> **{description}**
> 
> A comprehensive, production-ready solution that [specific value proposition based on actual analysis]

## 📊 Quick Stats
- **Language**: {language}
- **Dependencies**: [Exact count from analysis]
- **License**: {license_type}
- **Last Updated**: [From git history]
- **Contributors**: [From git analysis]

## 🎯 What This Project Does

### Primary Functions:
- 🎯 **[Function 1]**: [Specific capability with real example]
- 🎯 **[Function 2]**: [Specific capability with real example]
- 🎯 **[Function 3]**: [Specific capability with real example]

### Key Benefits:
- ✅ **[Benefit 1]**: [Quantified improvement]
- ✅ **[Benefit 2]**: [Quantified improvement]
- ✅ **[Benefit 3]**: [Quantified improvement]

### Use Cases:
1. **[Use Case 1]**: [Specific scenario with example]
2. **[Use Case 2]**: [Specific scenario with example]
3. **[Use Case 3]**: [Specific scenario with example]

## 🏗️ Architecture Overview

### System Design
```mermaid
[Actual architecture diagram based on code analysis]
```

### Core Components
| Component | Purpose | Key Files |
|-----------|---------|-----------|
| [Component 1] | [Specific function] | [Actual file paths] |
| [Component 2] | [Specific function] | [Actual file paths] |

### Data Flow
[Detailed explanation of how data moves through the system]

## 🚀 Quick Start

### Prerequisites
- **[Tool 1]**: Version X.X+ ([Why needed])
- **[Tool 2]**: Version Y.Y+ ([Why needed])
- **[Dependency 3]**: [Specific requirement]

### 30-Second Setup
```bash
# Clone and setup in 3 commands
git clone {request.repo_url}
cd {repo_name}
[Actual setup commands from repository]
```

### Verify Installation
```bash
# Test commands that actually work
[Real verification steps]
```

## 📦 Installation Guide

### Method 1: [Primary Installation Method]
```bash
[Step-by-step commands with explanations]
```

### Method 2: [Alternative Method]
```bash
[Alternative installation steps]
```

### Environment Configuration
```bash
# Environment variables and configuration
[Actual configuration from repository]
```

## 💡 Usage Examples

### Basic Usage
```{language.lower()}
// Simple example based on actual code
[Real, working code example]
```

### Advanced Usage
```{language.lower()}
// Complex example showcasing key features
[Advanced real code example]
```

### Integration Examples
```{language.lower()}
// How to integrate with other systems
[Integration code examples]
```

## 📡 API Reference

[Complete API documentation based on actual code analysis]

### Core Methods
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| [Method 1] | [Actual params] | [Return type] | [Function description] |

### Code Examples
[Detailed API usage examples with real code]

## 🗂️ Project Structure

### Directory Overview
```
[Detailed directory structure with explanations]
```

### Key Files Explained
| File/Directory | Purpose | Key Functions |
|----------------|---------|---------------|
[Detailed file explanations based on actual analysis]

## 🔧 Configuration

### Configuration Files
[Detailed configuration documentation]

### Environment Variables
| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
[Actual configuration options]

### Advanced Configuration
[Complex configuration scenarios]

## 🧪 Testing

### Running Tests
```bash
[Actual test commands from repository]
```

### Test Structure
[Explanation of test organization]

### Writing New Tests
[Guidelines for contributing tests]

## 📈 Performance

### Benchmarks
[Actual performance data if available]

### Optimization Tips
[Specific optimization strategies]

### Monitoring
[How to monitor the system]

## 🚀 Deployment

### Production Deployment
[Step-by-step deployment guide]

### Docker Deployment
[Docker instructions if Dockerfile exists]

### Cloud Deployment
[Cloud-specific deployment guides]

## 🔒 Security

### Security Features
[Built-in security measures]

### Best Practices
[Security recommendations]

### Vulnerability Reporting
[How to report security issues]

## 🤝 Contributing

### Development Setup
[Contributor setup instructions]

### Code Standards
[Coding guidelines and standards]

### Pull Request Process
[Step-by-step contribution guide]

## 📋 Changelog

[Detailed changelog based on git history]

## 🆘 Troubleshooting

### Common Issues
| Issue | Symptoms | Solution |
|-------|----------|----------|
[Comprehensive troubleshooting guide]

### Getting Help
[Support channels and resources]

## 📚 Additional Resources

### Related Projects
[Links to related repositories]

### Documentation
[Links to external documentation]

### Community
[Community resources and forums]

## 📄 License

[License information and compliance details]

---

**[Final compelling call-to-action based on project purpose]**
```

## 🔒 CRITICAL QUALITY CONTROLS:

1. **REPOSITORY ANALYSIS**: Deep analysis of actual codebase before writing
2. **CODE VERIFICATION**: Cross-reference every technical detail with repository
3. **FUNCTIONAL ACCURACY**: All examples must work with the actual codebase
4. **COMPREHENSIVE COVERAGE**: Address all aspects of the project
5. **USER-CENTRIC**: Focus on what users need to know to be successful
6. **MAINTENANCE-FRIENDLY**: Structure for easy updates as code evolves
7. **PROFESSIONAL POLISH**: Enterprise-grade formatting and presentation
8. **ACCESSIBLE LANGUAGE**: Clear for {request.target_audience} developers

## 🚀 EXECUTION MANDATE:

1. **ANALYZE DEEPLY**: Understand the codebase architecture and patterns
2. **DOCUMENT PRECISELY**: Every technical detail must be accurate
3. **EXPLAIN CLEARLY**: Make complex concepts understandable
4. **PROVIDE VALUE**: Focus on practical utility for developers
5. **MAINTAIN QUALITY**: Every section should meet professional standards

Create documentation so comprehensive and accurate that it becomes the definitive resource for this project. Make it the documentation you would want to find when discovering this project yourself.
"""
        
        return prompt
    
    # ... keep existing code (helper methods like _get_components_instructions, _get_audience_instruction, etc.)
    
    def _get_components_instructions(self, components: List[str]) -> str:
        """Get detailed instructions for selected components"""
        component_instructions = {
            'overview': "- **Project Overview**: Comprehensive introduction with clear value proposition and use cases",
            'installation': "- **Installation Guide**: Step-by-step setup instructions with prerequisites and verification",
            'usage': "- **Usage Examples**: Multiple practical examples from basic to advanced scenarios",
            'api': "- **API Reference**: Complete API documentation with parameters, returns, and examples",
            'architecture': "- **Architecture**: System design overview with diagrams and component explanations",
            'configuration': "- **Configuration**: Detailed configuration options and environment setup",
            'deployment': "- **Deployment**: Production deployment guides for various platforms",
            'testing': "- **Testing**: How to run tests and write new tests",
            'contributing': "- **Contributing**: Guidelines for contributors and development setup",
            'changelog': "- **Changelog**: Version history and recent changes",
            'troubleshooting': "- **Troubleshooting**: Common issues and solutions",
            'tutorial': "- **Tutorial**: Step-by-step learning guide with code examples",
            'code-examples': "- **Code Examples**: Practical, executable code snippets",
            'step-by-step': "- **Step-by-Step Guide**: Detailed procedural instructions"
        }
        
        instructions = []
        for component in components:
            if component in component_instructions:
                instructions.append(component_instructions[component])
        
        return '\n'.join(instructions) if instructions else "- **Complete Documentation**: All standard documentation components"
    
    def _get_audience_instruction(self, audience: str) -> str:
        """Get audience-specific instructions"""
        audience_map = {
            'beginner': "New developers who need detailed explanations and context for every concept",
            'intermediate': "Developers with some experience who need clear examples and best practices",
            'advanced': "Experienced developers who need comprehensive reference and advanced usage patterns"
        }
        return audience_map.get(audience, "Intermediate developers")
    
    def _get_tone_instruction(self, tone: str) -> str:
        """Get tone-specific instructions"""
        tone_map = {
            'professional': "Formal, precise, and business-appropriate language",
            'friendly': "Conversational, welcoming, and approachable language",
            'technical': "Precise, detailed, and technically accurate language",
            'fun': "Engaging, enthusiastic, and entertaining language while maintaining accuracy"
        }
        return tone_map.get(tone, "Professional and clear")
    
    def _format_structure_detailed(self, structure: Dict, indent: str = "") -> str:
        """Format directory structure with detailed explanations"""
        if not structure:
            return "Repository structure analysis in progress..."
        
        formatted = []
        for name, content in structure.items():
            if isinstance(content, dict):
                formatted.append(f"{indent}{name}")
                if content:  # Only recurse if there's content
                    formatted.append(self._format_structure_detailed(content, indent + "  "))
            else:
                formatted.append(f"{indent}{name}")
        
        return '\n'.join(filter(None, formatted))
    
    def _format_git_history_detailed(self, git_history: List[Dict]) -> str:
        """Format git history with detailed information"""
        if not git_history:
            return "Recent development activity analysis in progress..."
        
        formatted = []
        for commit in git_history[:5]:  # Show last 5 commits
            formatted.append(f"- **{commit.get('hash', 'N/A')}**: {commit.get('message', 'No message')} (by {commit.get('author', 'Unknown')})")
        
        return '\n'.join(formatted)
